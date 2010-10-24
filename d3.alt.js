(function(_) {

  var d3 = _.d3 = {},
      d3_root = d3_selection([[document]]);

  d3.version = "0.1.0";

  d3.ns = {
    prefix: {
      svg: "http://www.w3.org/2000/svg",
      xhtml: "http://www.w3.org/1999/xhtml",
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    },
    qualify: function(name) {
      var i = name.indexOf(":");
      return i < 0 ? name : {
        space: d3.ns.prefix[name.substring(0, i)],
        local: name.substring(i + 1)
      };
    }
  };

  function d3_array(psuedoarray) {
    return Array.prototype.slice.call(psuedoarray);
  }

  function d3_blend(arrays) {
    return Array.prototype.concat.apply([], arrays);
  }

  function d3_dispatchers() {
    var dispatchers = {},
        type;
    for (var i = 0, n = arguments.length; i < n; i++) {
      type = arguments[i];
      dispatchers[type] = d3_dispatcher(type);
    }
    return dispatchers;
  }

  function d3_dispatcher(type) {
    var dispatcher = {},
        listeners = [];

    dispatcher.add = function(listener) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener == listener) return dispatcher; // already registered
      }
      listeners.push({listener: listener, on: true});
      return dispatcher;
    };

    dispatcher.remove = function(listener) {
      for (var i = 0; i < listeners.length; i++) {
        var l = listeners[i];
        if (l.listener == listener) {
          l.on = false;
          listeners = listeners.slice(0, i).concat(listeners.slice(i + 1));
          break;
        }
      }
      return dispatcher;
    };

    dispatcher.dispatch = function() {
      var ls = listeners; // defensive reference
      for (var i = 0, n = ls.length; i < n; i++) {
        var l = ls[i];
        if (l.on) l.listener.apply(this, arguments);
      }
    };

    return dispatcher;
  };

  d3.select = function(query) {
    return typeof query == "string"
        ? d3_root.select(query)
        : d3_selection([[query]]); // assume node
  };

  d3.selectAll = function(query) {
    return typeof query == "string"
        ? d3_root.selectAll(query)
        : d3_selection([d3_array(query)]); // assume node[]
  };

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

  d3.transition = function() {
    return d3_root.transition();
  };

  // TODO namespace transitions; cancel collisions
  // TODO easing
  function d3_transition(groups) {
    var transition = {},
        tweens = {},
        timeout = setTimeout(start, 1),
        interval,
        then = Date.now(),
        event = d3_dispatchers("start", "end"),
        stage = [],
        delay = [],
        duration = [],
        durationMax;

    function start() {
      interval = setInterval(step, 24);
    }

    function step() {
      var elapsed = Date.now() - then,
          clear = true,
          k = -1;
      groups.each(function(d, i) {
        if (stage[++k] == 2) return; // ended
        var t = (elapsed - delay[k]) / duration[k]; // TODO easing
        if (t >= 1) {
          t = 1;
        } else {
          clear = false;
          if (t < 0) return;
          if (!stage[k]) {
            stage[k] = 1;
            event.start.dispatch.apply(this, arguments);
          }
        }
        for (var key in tweens) tweens[key].call(this, t);
        if (t == 1) {
          stage[k] = 2;
          event.end.dispatch.apply(this, arguments);
        }
      });
      if (clear) clearInterval(interval);
    }

    transition.delay = function(value) {
      var delayMin = Infinity,
          k = -1;
      if (typeof value == "function") {
        groups.each(function(d, i) {
          var x = delay[++k] = +value.apply(this, arguments);
          if (x < delayMin) delayMin = x;
        });
      } else {
        delayMin = +value;
        groups.each(function(d, i) {
          delay[++k] = delayMin;
        });
      }
      clearTimeout(timeout);
      timeout = setTimeout(start, delayMin);
      return transition;
    };

    transition.duration = function(value) {
      var k = -1;
      if (typeof value == "function") {
        durationMax = 0;
        groups.each(function(d, i) {
          var x = duration[++k] = +value.apply(this, arguments);
          if (x > durationMax) durationMax = x;
        });
      } else {
        durationMax = +value;
        groups.each(function(d, i) {
          duration[++k] = durationMax;
        });
      }
      return transition;
    };

    // TODO register custom easing functions?
    // transition.easing = function(value) {
    //   easing = value;
    //   return transition;
    // };

    transition.attr = function(name, value) {
      var key = "attr." + name + ".",
          k = -1;

      function attrConstant(d, i) {
        tweens[key + ++k] = attrTween(
            this.getAttribute(name),
            value);
      }

      function attrConstantNS(d, i) {
        tweens[key + ++k] = attrTweenNS(
            this.getAttributeNS(name.space, name.local),
            value);
      }

      function attrFunction(d, i) {
        tweens[key + ++k] = attrTween(
            this.getAttribute(name),
            value.apply(this, arguments));
      }

      function attrFunctionNS(d, i) {
        tweens[key + ++k] = attrTweenNS(
            this.getAttributeNS(name.space, name.local),
            value.apply(this, arguments));
      }

      function attrTween(a, b) {
        var interpolate = d3_interpolate(a, b);
        return function(t) {
          this.setAttribute(name, interpolate(t));
        };
      }

      function attrTweenNS(a, b) {
        var interpolate = d3_interpolate(a, b);
        return function(t) {
          this.setAttributeNS(name.space, name.local, interpolate(t));
        };
      }

      name = d3.ns.qualify(name);
      groups.each(typeof value == "function"
          ? (name.local ? attrFunctionNS : attrFunction)
          : (name.local ? attrConstantNS : attrConstant));

      return transition;
    };

    transition.style = function(name, value, priority) {
      var key = "style." + name + ".",
          k = -1;

      function styleConstant(d, i) {
        tweens[key + ++k] = styleTween(
            window.getComputedStyle(this, null).getPropertyValue(name),
            value);
      }

      function styleFunction(d, i) {
        tweens[key + ++k] = styleTween(
            window.getComputedStyle(this, null).getPropertyValue(name),
            value.apply(this, arguments));
      }

      function styleTween(a, b) {
        var interpolate = d3_interpolate(a, b);
        return function(t) {
          this.style.setProperty(name, interpolate(t), priority);
        };
      }

      groups.each(typeof value == "function" ? styleFunction : styleConstant);
      return transition;
    };

    // TODO inherit easing
    transition.select = function(query) {
      var k, t = d3_transition(groups.select(query));
      k = -1; t.delay(function(d, i) { return delay[++k]; });
      k = -1; t.duration(function(d, i) { return duration[++k]; });
      return t;
    };

    // TODO inherit easing
    transition.selectAll = function(query) {
      var k, t = d3_transition(groups.selectAll(query));
      k = -1; t.delay(function(d, i) { return delay[i ? k : ++k]; })
      k = -1; t.duration(function(d, i) { return duration[i ? k : ++k]; });
      return t;
    };

    transition.on = function(type, listener) {
      event[type].add(listener);
      return transition;
    };

    return transition.delay(0).duration(250);
  }

  function d3_interpolate(a, b) {
    return function(t) {
      return a * (1 - t) + b * t;
    };
  }

  function d3_join(key) {
    return {
      node: function(node) {
        return node.getAttribute(key);
      },
      data: function(data) {
        return data[key];
      }
    };
  }

})(this);
