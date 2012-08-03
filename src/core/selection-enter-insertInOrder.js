var util = require("util");
var console = require("console");

d3_selection_enterPrototype.insertInOrder = function(name) {
  var subgroups = [],
      name, nextNode, nextNodes, subgroup, subnode, group, node, insert, n, m;

  if (typeof name == "function") {
    insert = function insertFromFunc(after, data, i) {
      return this.insertBefore(name.call(this, data, i), after);
    }
  } else {
    if ((name = d3.ns.qualify(name)).local) {
      insert = function insertNS(after) {
        return this.insertBefore(
          document.createElementNS(name.space, name.local), after
        );
      };
    } else {
      insert = function insert(after) {
        return this.insertBefore(
          document.createElementNS(this.namespaceURI, name), after
        );
      };
    }
  }

  // Very similar behavior to select, except we need prior knowledge about our
  // data join that wouldn't normally be passed up to the individual callbacks.
  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    n = group.length;

    // find all next nodes for more efficient lookup since it's the common case.
    nextNodes = new Array(n);
    for (var k = n; --k > 0;) {
      nextNode = group.update[k]
      nextNodes[k - 1] = nextNode ? nextNode : nextNodes[k];
    }

    for (var i = -1; ++i < n;) {
      if (node = group[i]) {
        subnode = insert.call(group.parentNode, nextNodes[i], node.__data__, i);
        subgroup.push(subnode);
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
}
