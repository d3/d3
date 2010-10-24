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

  d3.transition = function() {
    return d3_root.transition();
  };

  function d3_selection(groups) {
    var i = -1,
        n = groups.length,
        group;

    // Initialize the data, if needed.
    while (++i < n) if (!(group = groups[i]).data) group.data = [];

    function select(select) {
      var subgroups = [],
          subgroup,
          group,
          node;
      for (var j = 0, m = groups.length; j < m; j++) {
        group = groups[j];
        subgroups.push(subgroup = []);
        subgroup.parentNode = group.parentNode;
        subgroup.parentData = group.parentData;
        subgroup.data = group.data;
        for (var i = 0, n = group.length; i < n; i++) {
          if (node = group[i]) subgroup.push(select(node));
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
            subgroup.parentData = group.data[i];
            subgroup.data = [];
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

    // TODO key
    groups.data = function(data) {
      var i = -1,
          n = groups.length,
          group,
          enter = [],
          update = [],
          exit = [];

      function bind(group) {
        var i = 0,
            n = group.length,
            m = group.data.length,
            n0 = Math.min(n, m),
            n1 = Math.max(n, m),
            updateNodes = [],
            enterNodes = [],
            exitNodes = [],
            node;

        function append(e) {
          return group.parentNode.appendChild(e);
        }

        for (; i < n0; i++) {
          node = updateNodes[i] = group[i];
          enterNodes[i] = exitNodes[i] = null;
        }
        for (; i < m; i++) {
          enterNodes[i] = {appendChild: append};
          updateNodes[i] = exitNodes[i] = null;
        }
        for (; i < n1; i++) {
          exitNodes[i] = group[i];
          enterNodes[i] = updateNodes[i] = null;
        }

        updateNodes.data = enterNodes.data = exitNodes.data = group.data;
        enter.push(enterNodes);
        update.push(updateNodes);
        exit.push(exitNodes);
      }

      if (typeof data == "function") {
        while (++i < n) {
          group = groups[i];
          group.data = data.call(group.parentNode, group.parentData, i);
          bind(group);
        }
      } else {
        while (++i < n) {
          group = groups[i];
          group.data = data;
          bind(group);
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
          if (node) callback.call(node, group.data[i], i);
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

    // TODO text(function)
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

    // TODO html(function)
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

  // TODO namespace transitions; cancel collisions
  // TODO easing
  function d3_transition(groups) {
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
      groups.each(function(d, i) {
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

    return transition.delay(0).duration(250);
  }

  function d3_interpolate(a, b) {
    return function(t) {
      return a * (1 - t) + b * t;
    };
  }

})(this);
