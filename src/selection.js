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
        } else {
          subgroup.push(null);
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

    if (typeof join == "string") join = d3_selection_join(join);

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

      function enterAppend(e) {
        return group.parentNode.appendChild(e);
      }

      if (join) {
        var nodeByKey = {},
            exitData = [],
            keys = [],
            key,
            j = groupData.length;

        for (i = 0; i < n; i++) {
          key = join.nodeKey(node = group[i]);
          if (key in nodeByKey) {
            exitNodes[j++] = group[i];
          } else {
            nodeByKey[key] = node;
            keys.push(key);
          }
        }

        for (i = 0; i < m; i++) {
          node = nodeByKey[key = join.dataKey(nodeData = groupData[i])];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = {appendChild: enterAppend, __data__: nodeData},
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
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = {appendChild: enterAppend, __data__: nodeData};
            updateNodes[i] = exitNodes[i] = null;
          }
        }
        for (; i < m; i++) {
          enterNodes[i] = {appendChild: enterAppend, __data__: groupData[i]};
          updateNodes[i] = exitNodes[i] = null;
        }
        for (; i < n1; i++) {
          exitNodes[i] = group[i];
          enterNodes[i] = updateNodes[i] = null;
        }
      }

      enterNodes.parentNode
          = updateNodes.parentNode
          = exitNodes.parentNode
          = group.parentNode;

      enterNodes.parentData
          = updateNodes.parentData
          = exitNodes.parentData
          = group.parentData;

      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }

    if (typeof data == "function") {
      while (++i < n) {
        bind(group = groups[i], data.call(group, group.parentData, i));
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

  function first(callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      var group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return callback.call(node, node.__data__, i);
      }
    }
    return null;
  }

  groups.attr = function(name, value) {
    name = d3.ns.qualify(name);

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(name.local
          ? function() { return this.getAttributeNS(name.space, name.local); }
          : function() { return this.getAttribute(name); });
    }

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

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        return window.getComputedStyle(this, null).getPropertyValue(name);
      });
    }

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

  groups.property = function(name, value) {
    name = d3.ns.qualify(name);

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        return this[name];
      });
    }

    function propertyNull() {
      delete this[name];
    }

    function propertyConstant() {
      this[name] = value;
    }

    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name];
      else this[name] = x;
    }

    return groups.each(value == null
        ? propertyNull : (typeof value == "function"
        ? propertyFunction : propertyConstant));
  };

  groups.text = function(value) {

    // If no value is specified, return the first value.
    if (arguments.length < 1) {
      return first(function() {
        return this.textContent;
      });
    }

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

    // If no value is specified, return the first value.
    if (arguments.length < 1) {
      return first(function() {
        return this.innerHTML;
      });
    }

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

  // TODO namespaced event listeners to allow multiples
  groups.on = function(type, listener) {
    type = "on" + type;
    return groups.each(function(d, i) {
      this[type] = function(e) {
        d3.event = e;
        try {
          listener.call(this, d, i);
        } finally {
          d3.event = null;
        }
      };
    });
  };

  // TODO filter, slice?

  groups.transition = function(name) {
    return d3_transition(groups, name);
  };

  groups.call = d3_call;

  return groups;
}

// TODO support namespaces for key?
function d3_selection_join(key) {
  return {
    nodeKey: function(node) { return node.getAttribute(key); },
    dataKey: function(data) { return data[key]; }
  };
}
