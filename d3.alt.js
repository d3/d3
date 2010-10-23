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

    // TODO select(function)?
    nodes.select = function(query) {
      return d3_selection(groups.map(function(group) {
        var subgroup = group.map(function(node) {
          return node.querySelector(query);
        });
        subgroup.data = group.data;
        return subgroup;
      }), nodes);
    };

    // TODO selectAll(function)?
    nodes.selectAll = function(query) {
      return d3_selection(d3_blend(groups.map(function(group) {
        return group.map(function(node) {
          var subgroup = d3_array(node.querySelectorAll(query));
          subgroup.data = node.__data__;
          return subgroup;
        });
      })), nodes);
    };

    nodes.deselect = function() {
      return deselect;
    };

    // TODO key
    // TODO enter
    // TODO exit
    // TODO data(function)
    // TODO data(null)
    nodes.data = function(data) {
      if (arguments.length < 1) {
        return nodes.map(function(node) {
          return node.__data__;
        });
      }
      if (typeof data == "function") {
        for (var i = 0, n = groups.length; i < n; i++) {
          var group = groups[i],
              groupData = data.call(group, group.data, i);
          for (var j = 0, m = group.length; j < m; j++) {
            group[j].__data__ = groupData[j];
          }
        }
      } else {
        for (var i = 0, n = groups.length; i < n; i++) {
          var group = groups[i];
          for (var j = 0, m = group.length; j < m; j++) {
            group[j].__data__ = data[j];
          }
        }
      }
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
      var children;
      name = d3.ns.qualify(name);
      if (name.local) {
        children = nodes.map(function(e) {
          return e.appendChild(document.createElementNS(name.space, name.local));
        });
      } else {
        children = nodes.map(function(e) {
          return e.appendChild(document.createElement(name));
        });
      }
      return d3_selection(children, nodes);
    };

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
