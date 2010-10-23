(function(_) {

  var d3 = _.d3 = d3_selection([document]);

  d3.ns = {
    prefix: {
      svg: "http://www.w3.org/2000/svg",
      xhtml: "http://www.w3.org/1999/xhtml",
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    },

    resolve: function(prefix) {
      return d3.ns.prefix[prefix] || null;
    },

    qualify: function(name) {
      var i = name.indexOf(":");
      return i < 0 ? name : {
        space: d3.ns.prefix[name.substring(0, i)],
        local: name.substring(i + 1)
      };
    }
  };

  function d3_selection(nodes, denodes) {
    var i,
        n = nodes.length;

    // TODO attr(name, function)
    // TODO style(name, function, priority)
    // TODO text(function)
    // TODO html(function)

    // TODO select(node)
    // TODO select(function)
    // TODO selectAll(node[])
    // TODO selectAll(function)

    // TODO append(node)
    // TODO append(function)?
    // TODO remove(node)?
    // TODO remove(function)?

    // TODO event
    // TODO on?

    // TODO data
    // TODO enter
    // TODO exit

    // TODO transition
    // TODO delay
    // TODO duration
    // TODO easing

    nodes.select = function(query) {
      var select = [];
      i = -1; while (++i < n) select.push(nodes[i].querySelector(query));
      return d3_selection(select, nodes);
    };

    nodes.selectAll = function(query) {
      var all = [],
          select;
      i = -1; while (++i < n) {
        select = nodes[i].querySelectorAll(query);
        j = -1; m = select.length; while (++j < m) all.push(select[j]);
      }
      return d3_selection(all, nodes);
    };

    nodes.deselect = function() {
      return denodes;
    };

    nodes.attr = function(name, value) {
      name = d3.ns.qualify(name);
      if (arguments.length < 2) {
        return nodes.map(name.local
            ? function(e) { return e.getAttributeNS(name.space, name.local); }
            : function(e) { return e.getAttribute(name); });
      }
      i = -1;
      if (name.local) {
        if (value == null) {
          while (++i < n) nodes[i].removeAttributeNS(name.space, name.local);
        } else {
          while (++i < n) nodes[i].setAttributeNS(name.space, name.local, value);
        }
      } else {
        if (value == null) {
          while (++i < n) nodes[i].removeAttribute(name);
        } else {
          while (++i < n) nodes[i].setAttribute(name, value);
        }
      }
      return nodes;
    };

    nodes.style = function(name, value, priority) {
      if (arguments.length < 2) {
        return nodes.map(function(e) {
          return window.getComputedStyle(e, null).getPropertyValue(name);
        });
      }
      i = -1; while (++i < n) nodes[i].style.setProperty(name, value, priority);
      return nodes;
    };

    nodes.text = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.textContent;
        });
      }
      i = -1; while (++i < n) {
        var node = nodes[i];
        while (node.lastChild) node.removeChild(node.lastChild);
        node.appendChild(document.createTextNode(value));
      }
    };

    nodes.html = function(value) {
      if (arguments.length < 1) {
        return nodes.map(function(e) {
          return e.innerHTML;
        });
      }
      i = -1; while (++i < n) nodes[i].innerHTML = value;
    };

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

    nodes.remove = function() {
      i = -1; while (++i < n) {
        var node = nodes[i];
        node.parentNode.removeChild(node);
      }
      return nodes.deselect();
    };

    return nodes;
  }

})(this);
