(function(_) {

  var d3_root = [[document]],
      d3 = _.d3 = d3_selection(d3_root);

  d3_root[0].data = [];

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

  function d3_selection(groups, deselect) {
    var nodes = d3_blend(groups);

    // TODO select(node)?
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

    // TODO selectAll(node[])?
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

    // TODO data(function)
    // TODO data(null)
    // TODO key
    // TODO enter
    // TODO exit
    nodes.data = function(data) {
      if (arguments.length < 1) {
        return nodes.map(function(node) {
          return node.__data__;
        });
      }
      if (typeof data == "function") {
        for (var i = 0, n = groups.length; i < n; i++) {
          var group = groups[i],
              groupData = data.apply(nodes, group.data);
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

    // TODO attr(name, function)
    nodes.attr = function(name, value) {
      name = d3.ns.qualify(name);
      if (arguments.length < 2) {
        return nodes.map(name.local
            ? function(e) { return e.getAttributeNS(name.space, name.local); }
            : function(e) { return e.getAttribute(name); });
      }
      if (name.local) {
        if (value == null) {
          for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].removeAttributeNS(name.space, name.local);
          }
        } else {
          for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].setAttributeNS(name.space, name.local, value);
          }
        }
      } else {
        if (value == null) {
          for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].removeAttribute(name);
          }
        } else {
          for (var i = 0, n = nodes.length; i < n; i++) {
            nodes[i].setAttribute(name, value);
          }
        }
      }
      return nodes;
    };

    // TODO style(name, function, priority)
    nodes.style = function(name, value, priority) {
      if (arguments.length < 2) {
        return nodes.map(function(e) {
          return window.getComputedStyle(e, null).getPropertyValue(name);
        });
      }
      if (arguments.length < 3) priority = null;
      for (var i = 0, n = nodes.length; i < n; i++) {
        nodes[i].style.setProperty(name, value, priority);
      }
      return nodes;
    };

    // TODO text(function)
    nodes.text = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.textContent;
        });
      }
      if (typeof value == "function") {
        for (var i = 0, n = groups.length; i < n; i++) {
          var group = groups[i],
              data = group.data;
          data.unshift(null);
          for (var j = 0, m = group.length; j < m; j++) {
            var node = group[j];
            data[0] = node.__data__;
            while (node.lastChild) node.removeChild(node.lastChild);
            node.appendChild(document.createTextNode(value.apply(nodes, data)));
          }
          data.shift();
        }
      } else {
        for (var i = 0, n = nodes.length; i < n; i++) {
          var node = nodes[i];
          while (node.lastChild) node.removeChild(node.lastChild);
          node.appendChild(document.createTextNode(value));
        }
      }
      return nodes;
    };

    // TODO html(function)
    nodes.html = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.innerHTML;
        });
      }
      for (var i = 0, n = nodes.length; i < n; i++) {
        nodes[i].innerHTML = value;
      }
      return nodes;
    };

    // TODO append(node)
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
