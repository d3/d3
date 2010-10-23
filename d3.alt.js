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

  function d3_selection(groups, deselect, transition) {
    var nodes = d3_blend(groups);

    /**
     * Visits each of the nodes in the current selection, evaluating the
     * specified value (if it is a function), and then invoking the specified
     * callback function.
     */
    function visit(value, callback) {
      if (typeof value == "function") {
        for (var i = 0, k = 0, n = groups.length; i < n; i++) {
          var group = groups[i], data = group.data;
          data.unshift(null);
          for (var j = 0, m = group.length; j < m; j++) {
            var node = group[j];
            data[0] = node.__data__;
            callback(node, value.apply(node, data), k++);
          }
          data.shift();
        }
      } else {
        for (var i = 0, n = nodes.length; i < n; i++) {
          callback(nodes[i], value, i);
        }
      }
    }

    // TODO select(function)?
    nodes.select = function(query) {
      return d3_selection(groups.map(function(group) {
        var subgroup = group.map(function(node) {
          return node.querySelector(query);
        });
        subgroup.data = group.data;
        return subgroup;
      }), nodes, transition);
    };

    // TODO selectAll(function)?
    nodes.selectAll = function(query) {
      return d3_selection(d3_blend(groups.map(function(group) {
        return group.map(function(node) {
          var subgroup = d3_array(node.querySelectorAll(query));
          subgroup.data = [node.__data__].concat(group.data);
          return subgroup;
        });
      })), nodes, transition);
    };

    nodes.deselect = function() {
      return deselect;
    };

    // I think rather than having a data stack, it might make more sense to
    // pass the datum and an index (or a local index / group index) to each
    // value function. If you want to use the data stack, you can use a data
    // function that derives child data from the parent data. (The additional
    // arguments in Protovis were often a source of confusion.) Passing the
    // index as an additional argument makes the behavior consistent with the
    // built-in map and forEach methods.

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
              groupData = data.apply(group, group.data);
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

    nodes.attr = function(name, value) {
      name = d3.ns.qualify(name);
      if (arguments.length < 2) {
        return nodes.map(name.local
            ? function(e) { return e.getAttributeNS(name.space, name.local); }
            : function(e) { return e.getAttribute(name); });
      }

      function attrNS(node, value) {
        value == null
            ? node.removeAttributeNS(name.space, name.local)
            : node.setAttributeNS(name.space, name.local, value);
      }

      function attr(node, value) {
        value == null
            ? node.removeAttribute(name)
            : node.setAttribute(name, value);
      }

      visit(value, name.local ? attrNS : attr);
      return nodes;
    };

    nodes.style = function(name, value, priority) {
      if (arguments.length < 2) {
        return nodes.map(function(e) {
          return window.getComputedStyle(e, null).getPropertyValue(name);
        });
      }
      if (arguments.length < 3) priority = null;

      function style(node, value) {
        node.style.setProperty(name, value, priority);
      }

      visit(value, style);
      return nodes;
    };

    // TODO text(function)
    nodes.text = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.textContent;
        });
      }

      function text(node, value) {
        while (node.lastChild) node.removeChild(node.lastChild);
        node.appendChild(document.createTextNode(value));
      }

      visit(value, text);
      return nodes;
    };

    // TODO html(function)
    nodes.html = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.innerHTML;
        });
      }

      function html(node, value) {
        node.innerHTML = value;
      }

      visit(value, text);
      return nodes;
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
      return d3_selection(children, nodes, transition);
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
      return d3_transition(nodes, visit);
    };

    return nodes;
  }

  function d3_transition(nodes, visit) {
    var transition = {},
        tweenAttrs = {},
        timeout = setTimeout(start, 1),
        interval,
        then,
        delay = [],
        duration = [],
        durationMax = 0,
        easing = []; // TODO

    function start() {
      then = Date.now();
      interval = setInterval(tick, 24);
    }

    function tick() {
      var elapsed = Date.now() - then;
      if (elapsed > durationMax) clearInterval(interval);
      visit(null, function(node, _, i) {
        var t = (elapsed - delay[i]) / duration[i]; // TODO easing
        if (t < 0) return;
        if (t >= 1) { t = 1; delay[i] = Infinity; }
        for (var name in tweenAttrs) {
          node.setAttribute(name, tweenAttrs[name][i](t));
        }
      });
    }

    transition.delay = function(value) {
      var delayMin = Infinity;
      visit(value, function(node, value, i) {
        delay[i] = value;
        if (value < delayMin) delayMin = value;
      });
      clearTimeout(timeout);
      timeout = setTimeout(start, delayMin);
      return transition;
    };

    transition.duration = function(value) {
      durationMax = 0;
      visit(value, function(node, value, i) {
        duration[i] = value;
        if (value > durationMax) durationMax = value;
      });
      return transition;
    };

    // TODO custom easing function?
    // transition.easing = function(value) {
    //   visit(value, function(node, value, i) { easing[i] = value; });
    //   return transition;
    // };

    transition.attr = function(name, value) {
      var tweens = tweenAttrs[name] = [];
      visit(value, function(node, value, i) {
        tweens[i] = d3_tween(node.getAttribute(name), value);
      });
    };

    // transition.select = function(query) {
    //   var select = d3_transition(nodes.select(query)), i;
    //   i = 0; select.delay(function() { return delay[i++]; }); // TODO index
    //   i = 0; select.duration(function() { return duration[i++]; });
    //   return select;
    // };

    return transition.delay(0).duration(250);
  }

  function d3_tween(a, b) {
    return function(t) {
      return a * (1 - t) + b * t;
    };
  }

})(this);
