var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return d3_array(n.querySelectorAll(s)); };

// Use Sizzle, if available.
if (typeof Sizzle == "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0]; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
}

var d3_root = d3_selection([[document]]);
d3_root[0].parentNode = document.documentElement;

// TODO fast singleton implementation!
d3.select = function(selector) {
  return typeof selector == "string"
      ? d3_root.select(selector)
      : d3_selection([[selector]]); // assume node
};

d3.selectAll = function(selector) {
  return typeof selector == "string"
      ? d3_root.selectAll(selector)
      : d3_selection([d3_array(selector)]); // assume node[]
};

function d3_selection(groups) {

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
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroup.push(subnode = select(node));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
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
        }
      }
    }
    return d3_selection(subgroups);
  }

  // TODO select(function)?
  groups.select = function(selector) {
    return select(function(node) {
      return d3_select(selector, node);
    });
  };

  // TODO selectAll(function)?
  groups.selectAll = function(selector) {
    return selectAll(function(node) {
      return d3_selectAll(selector, node);
    });
  };

  // TODO preserve null elements to maintain index?
  groups.filter = function(filter) {
    var subgroups = [],
        subgroup,
        group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };

  groups.map = function(map) {
    var group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) node.__data__ = map.call(node, node.__data__, i);
      }
    }
    return groups;
  };

  // TODO data(null) for clearing data?
  groups.data = function(data, join) {
    var enter = [],
        update = [],
        exit = [];

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

      if (join) {
        var nodeByKey = {},
            keys = [],
            key,
            j = groupData.length;

        for (i = 0; i < n; i++) {
          key = join.call(node = group[i], node.__data__, i);
          if (key in nodeByKey) {
            exitNodes[j++] = group[i]; // duplicate key
          } else {
            nodeByKey[key] = node;
          }
          keys.push(key);
        }

        for (i = 0; i < m; i++) {
          node = nodeByKey[key = join.call(groupData, nodeData = groupData[i], i)];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = d3_selection_enterNode(nodeData);
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
            enterNodes[i] = d3_selection_enterNode(nodeData);
            updateNodes[i] = exitNodes[i] = null;
          }
        }
        for (; i < m; i++) {
          enterNodes[i] = d3_selection_enterNode(groupData[i]);
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

      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }

    var i = -1,
        n = groups.length,
        group;
    if (typeof data == "function") {
      while (++i < n) {
        bind(group = groups[i], data.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = groups[i], data);
      }
    }

    var selection = d3_selection(update);
    selection.enter = function() {
      return d3_selectionEnter(enter);
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

  groups.empty = function() {
    return !first(function() { return true; });
  };

  groups.node = function() {
    return first(function() { return this; });
  };

  groups.attr = function(name, value) {
    name = d3.ns.qualify(name);

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(name.local
          ? function() { return this.getAttributeNS(name.space, name.local); }
          : function() { return this.getAttribute(name); });
    }

    /** @this {Element} */
    function attrNull() {
      this.removeAttribute(name);
    }

    /** @this {Element} */
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }

    /** @this {Element} */
    function attrConstant() {
      this.setAttribute(name, value);
    }

    /** @this {Element} */
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }

    /** @this {Element} */
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name);
      else this.setAttribute(name, x);
    }

    /** @this {Element} */
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

  groups.classed = function(name, value) {
    var re = new RegExp("(^|\\s+)" + d3.requote(name) + "(\\s+|$)", "g");

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        re.lastIndex = 0;
        return re.test(this.className);
      });
    }

    /** @this {Element} */
    function classedAdd() {
      var classes = this.className;
      re.lastIndex = 0;
      if (!re.test(classes)) {
        this.className = d3_collapse(classes + " " + name);
      }
    }

    /** @this {Element} */
    function classedRemove() {
      var classes = d3_collapse(this.className.replace(re, " "));
      this.className = classes.length ? classes : null;
    }

    /** @this {Element} */
    function classedFunction() {
      (value.apply(this, arguments)
          ? classedAdd
          : classedRemove).call(this);
    }

    return groups.each(typeof value == "function"
        ? classedFunction : value
        ? classedAdd
        : classedRemove);
  };

  groups.style = function(name, value, priority) {
    if (arguments.length < 3) priority = "";

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        return window.getComputedStyle(this, null).getPropertyValue(name);
      });
    }

    /** @this {Element} */
    function styleNull() {
      this.style.removeProperty(name);
    }

    /** @this {Element} */
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }

    /** @this {Element} */
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

    /** @this {Element} */
    function propertyNull() {
      delete this[name];
    }

    /** @this {Element} */
    function propertyConstant() {
      this[name] = value;
    }

    /** @this {Element} */
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

    /** @this {Element} */
    function textConstant() {
      this.textContent = value;
    }

    /** @this {Element} */
    function textFunction() {
      this.textContent = value.apply(this, arguments);
    }

    return groups.each(typeof value == "function"
        ? textFunction : textConstant);
  };

  groups.html = function(value) {

    // If no value is specified, return the first value.
    if (arguments.length < 1) {
      return first(function() {
        return this.innerHTML;
      });
    }

    /** @this {Element} */
    function htmlConstant() {
      this.innerHTML = value;
    }

    /** @this {Element} */
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

  // TODO insert(node, function)?
  // TODO insert(function, string)?
  // TODO insert(function, function)?
  groups.insert = function(name, before) {
    name = d3.ns.qualify(name);

    function insert(node) {
      return node.insertBefore(
          document.createElement(name),
          d3_select(before, node));
    }

    function insertNS(node) {
      return node.insertBefore(
          document.createElementNS(name.space, name.local),
          d3_select(before, node));
    }

    return select(name.local ? insertNS : insert);
  };

  // TODO remove(selector)?
  // TODO remove(node)?
  // TODO remove(function)?
  groups.remove = function() {
    return groups.each(function() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    });
  };

  groups.sort = function(comparator) {
    comparator = d3_selection_comparator.apply(this, arguments);
    for (var j = 0, m = groups.length; j < m; j++) {
      var group = groups[j];
      group.sort(comparator);
      for (var i = 1, n = group.length, prev = group[0]; i < n; i++) {
        var node = group[i];
        if (node) {
          if (prev) prev.parentNode.insertBefore(node, prev.nextSibling);
          prev = node;
        }
      }
    }
    return groups;
  };

  // type can be namespaced, e.g., "click.foo"
  // listener can be null for removal
  groups.on = function(type, listener, capture) {
    if (arguments.length < 3) capture = false;

    // parse the type specifier
    var i = type.indexOf("."),
        typo = i == -1 ? type : type.substring(0, i),
        name = "__on" + type;

    // remove the old event listener, and add the new event listener
    return groups.each(function(d, i) {
      if (this[name]) this.removeEventListener(typo, this[name], capture);
      if (listener) this.addEventListener(typo, this[name] = l, capture);

      // wrapped event listener that preserves d, i
      function l(e) {
        var o = d3.event; // Events can be reentrant (e.g., focus).
        d3.event = e;
        try {
          listener.call(this, d, i);
        } finally {
          d3.event = o;
        }
      }
    });
  };

  // TODO slice?

  groups.transition = function() {
    return d3_transition(groups);
  };

  groups.call = d3_call;

  return groups;
}

function d3_selectionEnter(groups) {

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
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroup.push(subnode = select(group.parentNode));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  }

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

  // TODO insert(node, function)?
  // TODO insert(function, string)?
  // TODO insert(function, function)?
  groups.insert = function(name, before) {
    name = d3.ns.qualify(name);

    function insert(node) {
      return node.insertBefore(
          document.createElement(name),
          d3_select(before, node));
    }

    function insertNS(node) {
      return node.insertBefore(
          document.createElementNS(name.space, name.local),
          d3_select(before, node));
    }

    return select(name.local ? insertNS : insert);
  };

  return groups;
}

function d3_selection_comparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}

function d3_selection_enterNode(data) {
  return {__data__: data};
}
