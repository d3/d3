function d3_selection(groups) {
  var i = -1,
      n = groups.length,
      group;

  function select(select) {
    var subgroups = [],
        subgroup,
        subnode,
        group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      subgroup.parentData = group.parentData;
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroup.push(subnode = select(node));
          if (subnode) subnode.__data__ = node.__data__;
        }
      }
    }
    return d3_selection(subgroups);
  }

  function selectAll(selectAll) {
    var subgroups = [],
        subgroup,
        group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroups.push(subgroup = selectAll(node));
          subgroup.parentNode = node;
          subgroup.parentData = node.__data__;
        }
      }
    }
    return d3_selection(subgroups);
  }

  // TODO select(function)?
  groups.select = function(query) {
    return select(function(node) {
      return node.querySelector(query);
    });
  };

  // TODO selectAll(function)?
  groups.selectAll = function(query) {
    return selectAll(function(node) {
      return d3_array(node.querySelectorAll(query));
    });
  };

  // TODO data(null) for clearing data?
  groups.data = function(data, join) {
    var i = -1,
        n = groups.length,
        group,
        enter = [],
        update = [],
        exit = [];

    if (typeof join == "string") join = d3_join(join);

    function bind(group, groupData) {
      var i = 0,
          n = group.length,
          m = groupData.length,
          n0 = Math.min(n, m),
          n1 = Math.max(n, m),
          updateNodes = [],
          enterNodes = [],
          exitNodes = [],
          node,
          nodeData;

      function append(e) {
        return group.parentNode.appendChild(e);
      }

      if (join) {
        var nodeByKey = {},
            exitData = [],
            keys = [],
            key;

        for (i = 0; i < n; i++) {
          nodeByKey[key = join.node(node = group[i])] = node;
          keys.push(key);
        }

        for (i = 0; i < m; i++) {
          node = nodeByKey[key = join.data(nodeData = groupData[i])];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = {appendChild: append, __data__: nodeData};
            updateNodes[i] = exitNodes[i] = null;
          }
          delete nodeByKey[key];
        }

        for (i = 0; i < n; i++) {
          if (keys[i] in nodeByKey) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (; i < n0; i++) {
          node = updateNodes[i] = group[i];
          node.__data__ = groupData[i];
          enterNodes[i] = exitNodes[i] = null;
        }
        for (; i < m; i++) {
          enterNodes[i] = {appendChild: append, __data__: groupData[i]};
          updateNodes[i] = exitNodes[i] = null;
        }
        for (; i < n1; i++) {
          exitNodes[i] = group[i];
          enterNodes[i] = updateNodes[i] = null;
        }
      }

      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }

    if (typeof data == "function") {
      while (++i < n) {
        bind(group = groups[i], data.call(group.parentNode, group.parentData, i));
      }
    } else {
      while (++i < n) {
        bind(group = groups[i], data);
      }
    }

    var selection = d3_selection(update);
    selection.enter = function(name) {
      return d3_selection(enter).append(name);
    };
    selection.exit = function() {
      return d3_selection(exit);
    };
    return selection;
  };

  // TODO mask forEach? or rename for eachData?
  // TODO offer the same semantics for map, reduce, etc.?
  groups.each = function(callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      var group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) callback.call(node, node.__data__, i);
      }
    }
    return groups;
  };

  groups.attr = function(name, value) {
    name = d3.ns.qualify(name);

    function attrNull() {
      this.removeAttribute(name);
    }

    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }

    function attrConstant() {
      this.setAttribute(name, value);
    }

    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }

    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name);
      else this.setAttribute(name, x);
    }

    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local);
      else this.setAttributeNS(name.space, name.local, x);
    }

    return groups.each(value == null
        ? (name.local ? attrNullNS : attrNull) : (typeof value == "function"
        ? (name.local ? attrFunctionNS : attrFunction)
        : (name.local ? attrConstantNS : attrConstant)));
  };

  groups.style = function(name, value, priority) {
    if (arguments.length < 3) priority = null;

    function styleNull() {
      this.style.removeProperty(name);
    }

    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }

    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name);
      else this.style.setProperty(name, x, priority);
    }

    return groups.each(value == null
        ? styleNull : (typeof value == "function"
        ? styleFunction : styleConstant));
  };

  groups.text = function(value) {

    function textNull() {
      while (this.lastChild) this.removeChild(this.lastChild);
    }

    function textConstant() {
      this.appendChild(document.createTextNode(value));
    }

    function textFunction() {
      var x = value.apply(this, arguments);
      if (x != null) this.appendChild(document.createTextNode(x));
    }

    groups.each(textNull);
    return value == null ? groups
        : groups.each(typeof value == "function"
        ? textFunction : textConstant);
  };

  groups.html = function(value) {

    function htmlConstant() {
      this.innerHTML = value;
    }

    function htmlFunction() {
      this.innerHTML = value.apply(this, arguments);
    }

    return groups.each(typeof value == "function"
        ? htmlFunction : htmlConstant);
  };

  // TODO append(node)?
  // TODO append(function)?
  groups.append = function(name) {
    name = d3.ns.qualify(name);

    function append(node) {
      return node.appendChild(document.createElement(name));
    }

    function appendNS(node) {
      return node.appendChild(document.createElementNS(name.space, name.local));
    }

    return select(name.local ? appendNS : append);
  };

  // TODO remove(query)?
  // TODO remove(node)?
  // TODO remove(function)?
  groups.remove = function() {
    return select(function(node) {
      var parent = node.parentNode;
      parent.removeChild(node);
      return parent;
    });
  };

  // TODO event
  // TODO on?

  // TODO filter, slice?

  groups.transition = function() {
    return d3_transition(groups);
  };

  return groups;
}
