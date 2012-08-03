var util = require("util");
var console = require("console");

d3_selection_enterPrototype.insertInOrder = function(name) {
  var subgroups = [],
      name = d3.ns.qualify(name),
      existingNodes,
      subgroup,
      subnode,
      group,
      node,
      insert;

  if (name.local) {
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

  // Very similar behavior to select, except we need prior knowledge about our
  // data join that wouldn't normally be passed up to the individual callbacks.
  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    existingNodes = group.update;

    function findNextNode(i) {
      while (++i < n) {
        if (existingNodes[i]) return existingNodes[i];
      }
      return null;
    }

    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = insert.call(group.parentNode, findNextNode(i)));
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
}
