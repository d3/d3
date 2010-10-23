(function(_) {

  var d3 = _.d3 = {},
      d3_document = [document],
      d3_root = d3_selection([d3_document]);

  d3_document.data = [];

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

  d3.select = function(query) {
    return typeof query == "string"
        ? d3_root.select(query)
        : d3_selection([[query]], d3_root); // assume node
  };

  d3.selectAll = function(query) {
    return typeof query == "string"
        ? d3_root.selectAll(query)
        : d3_selection([d3_array(query)], d3_root); // assume node[]
  };

  d3.transition = function() {
    return d3_root.transition();
  };

  function d3_selection(groups, deselect) {
    var nodes = d3_blend(groups);

    function select(select) {
      return d3_selection(groups.map(function(group) {
        var subgroup = group.map(select);
        subgroup.parent = group.parent;
        subgroup.data = group.data;
        return subgroup;
      }), nodes);

    }

    function selectAll(selectAll) {
      return d3_selection(nodes.map(function(node) {
        var subgroup = selectAll(node); // TODO pass index?
        subgroup.parent = node;
        subgroup.data = node.__data__;
        return subgroup;
      }), nodes);
    }

    // TODO select(function)?
    nodes.select = function(query) {
      return select(function(node) {
        return node.querySelector(query);
      });
    };

    // TODO selectAll(function)?
    nodes.selectAll = function(query) {
      return selectAll(function(node) {
        return d3_array(node.querySelectorAll(query));
      });
    };

    nodes.deselect = function() {
      return deselect;
    };

    // TODO enter
    // TODO exit
    nodes.data = function(data, key) {
      if (arguments.length < 1) {
        return nodes.map(function(node) {
          return node.__data__;
        });
      }

      // TODO support getAttributeNS, custom node key functions
      function nodeKey(node) {
        return node.getAttribute(key);
      }

      // TODO support custom data key functions
      function dataKey(data) {
        return data[key];
      }

      function bind(group, groupData) {
        var i = -1,
            n = group.length,
            m = groupData.length,
            enterNodes = [],
            exitNodes = [];
        if (groupData == null) {
          while (++i < n) delete group[i].__data__;
        } else if (key == null) {
          while (++i < n) group[i].__data__ = groupData[i];
          while (i++ < m) {
            // TODO set __data__?
            // TODO index isn't correct
            enterNodes.push(group.parent);
          }
        } else {
        //   var j = -1,
        //       m = groupData.length,
        //       dataByKey = {},
        //       nodeByKey = {},
        //       enterNodes = [],
        //       exitNodes = [],
        //       updateNodes = [],
        //       node,
        //       data,
        //       k;
        //   while (++j < m) dataByKey[dataKey(data = groupData[j])] = data;
        //   while (++i < n) nodeByKey[nodeKey(node = group[i])] = node;
        //
        //   for (k in dataByKey) {
        //     data = dataByKey[k];
        //     node = nodeByKey[k];
        //     if (node) {
        //       node.__data__ = data;
        //       updateNodes.push(node);
        //     } else {
        //       console.log(deselect);
        //       node = {__data__: data};
        //       enterNodes.push(node);
        //     }
        //   }
        //
        //   for (k in nodeByKey) {
        //     exitNodes.push(nodeByKey[k]); // XXX how do we clear exiting node data?
        //   }
        //
        }
        enter.push(enterNodes);
        exit.push(exitNodes);
      }

      var i = -1,
          n = groups.length,
          enter = [],
          exit = [];
      if (typeof data == "function") {
        while (++i < n) {
          var group = groups[i];
          bind(group, data.call(group, group.data, i));
        }
      } else {
        while (++i < n) {
          bind(groups[i], data);
        }
      }

      // console.log(enter[0]);

      nodes.enter = function() { return d3_selection(enter, nodes); };
      nodes.exit = function() { return d3_selection(exit, nodes); };
      return nodes;
    };

    // TODO mask forEach? or rename for eachData?
    // TODO offer the same semantics for map, reduce, etc.?
    nodes.each = function(callback) {
      for (var j = 0, m = groups.length; j < m; j++) {
        var group = groups[j];
        for (var i = 0, n = group.length; i < n; i++) {
          var node = group[i];
          callback.call(node, node.__data__, i);
        }
      }
      return nodes;
    };

    nodes.attr = function(name, value) {
      name = d3.ns.qualify(name);

      if (arguments.length < 2) {
        return nodes.map(name.local
            ? function(e) { return e.getAttributeNS(name.space, name.local); }
            : function(e) { return e.getAttribute(name); });
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

      return nodes.each(value == null
          ? (name.local ? attrNullNS : attrNull) : (typeof value == "function"
          ? (name.local ? attrFunctionNS : attrFunction)
          : (name.local ? attrConstantNS : attrConstant)));
    };

    nodes.style = function(name, value, priority) {
      if (arguments.length < 2) {
        return nodes.map(function(e) {
          return window.getComputedStyle(e, null).getPropertyValue(name);
        });
      }

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

      return nodes.each(value == null
          ? styleNull : (typeof value == "function"
          ? styleFunction : styleConstant));
    };

    // TODO text(function)
    nodes.text = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.textContent;
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

      nodes.each(textNull);

      return value == null ? nodes
          : nodes.each(typeof value == "function"
          ? textFunction : textConstant);
    };

    // TODO html(function)
    nodes.html = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.innerHTML;
        });
      }

      function htmlConstant() {
        this.innerHTML = value;
      }

      function htmlFunction() {
        this.innerHTML = value.apply(this, arguments);
      }

      return nodes.each(typeof value == "function"
          ? htmlFunction : htmlConstant);
    };

    // TODO append(node)?
    // TODO append(function)?
    nodes.append = function(name) {
      var children,
          apply;

      function append(node) {
        return node.appendChild(document.createElement(name));
      }

      function appendNS(node) {
        return node.appendChild(document.createElementNS(name.space, name.local));
      }

      name = d3.ns.qualify(name);
      return select(name.local ? appendNS : append);
    };

    // TODO remove(query)?
    // TODO remove(node)?
    // TODO remove(function)?
    nodes.remove = function() {
      for (var i = 0, n = nodes.length; i < n; i++) {
        var node = nodes[i];
        node.parentNode.removeChild(node);
      }
      return nodes.deselect();
    };

    // TODO event
    // TODO on?

    // TODO filter, slice?

    nodes.transition = function() {
      return d3_transition(nodes);
    };

    return nodes;
  }

  // TODO namespace transitions; cancel collisions
  // TODO easing
  function d3_transition(nodes) {
    var transition = {},
        tweens = {},
        timeout = setTimeout(start, 1),
        interval,
        then = Date.now(),
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
      nodes.each(function(d, i) {
        var t = (elapsed - delay[++k]) / duration[k]; // TODO easing
        if (t >= 1) { t = 1; delay[k] = Infinity; }
        else { clear = false; if (t < 0) return; }
        for (var key in tweens) tweens[key].call(this, t);
      });
      if (clear) clearInterval(interval);
    }

    transition.delay = function(value) {
      var delayMin = Infinity,
          k = -1;
      if (typeof value == "function") {
        nodes.each(function(d, i) {
          var x = delay[++k] = +value.apply(this, arguments);
          if (x < delayMin) delayMin = x;
        });
      } else {
        delayMin = +value;
        nodes.each(function(d, i) {
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
        nodes.each(function(d, i) {
          var x = duration[++k] = +value.apply(this, arguments);
          if (x > durationMax) durationMax = x;
        });
      } else {
        durationMax = +value;
        nodes.each(function(d, i) {
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
      nodes.each(typeof value == "function"
          ? (name.local ? attrFunctionNS : attrFunction)
          : (name.local ? attrConstantNS : attrConstant));

      return transition;
    };

    // TODO inherit easing
    transition.select = function(query) {
      var k, t = d3_transition(nodes.select(query));
      k = -1; t.delay(function(d, i) { return delay[++k]; });
      k = -1; t.duration(function(d, i) { return duration[++k]; });
      return t;
    };

    // TODO inherit easing
    transition.selectAll = function(query) {
      var k, t = d3_transition(nodes.selectAll(query));
      k = -1; t.delay(function(d, i) { return delay[i ? k : ++k]; })
      k = -1; t.duration(function(d, i) { return duration[i ? k : ++k]; });
      return t;
    };

    return transition.delay(0).duration(250);
  }

  function d3_interpolate(a, b) {
    return function(t) {
      return a * (1 - t) + b * t;
    };
  }

})(this);
