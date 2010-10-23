(function(_) {

  var d3 = _.d3 = {},
      d3_document = [document],
      d3_root = d3_selection([d3_document]);

  d3_document.data = [];

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

  function d3_selection(groups, deselect) {
    var nodes = d3_blend(groups);

    /**
     * Visits each of the nodes in the current selection, evaluating the
     * specified value (if it is a function), and then invoking the specified
     * callback function.
     */
    function visit(value, callback) {
      if (typeof value == "function") {
        for (var i = 0, n = groups.length; i < n; i++) {
          var group = groups[i], data = group.data;
          data.unshift(null);
          for (var j = 0, m = group.length; j < m; j++) {
            var node = group[j];
            data[0] = node.__data__;
            callback(node, value.apply(node, data));
          }
          data.shift();
        }
      } else {
        for (var i = 0, n = nodes.length; i < n; i++) {
          callback(nodes[i], value);
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
      }), nodes);
    };

    // TODO selectAll(function)?
    nodes.selectAll = function(query) {
      return d3_selection(d3_blend(groups.map(function(group) {
        return group.map(function(node) {
          var subgroup = d3_array(node.querySelectorAll(query));
          subgroup.data = [node.__data__].concat(group.data);
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

    // TODO filter, slice? or d3.selectAll(node[])?

    // TODO transition
    // TODO delay
    // TODO duration
    // TODO easing

    return nodes;
  }

})(this);
