function d3_transform_attr(nodes) {
  var m = nodes.length,
      n = this.name,
      v = this.value,
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (n.local) {
    if (v == null) {
      for (i = 0; i < m; ++i) {
        nodes[i].node.removeAttributeNS(n.space, n.local);
      }
    } else if (typeof v == "function") {
      for (i = 0; i < m; ++i) {
        d3_transform_stack[0] = (o = nodes[i]).data;
        x = v.apply(o, d3_transform_stack);
        x == null
            ? o.node.removeAttributeNS(n.space, n.local)
            : o.node.setAttributeNS(n.space, n.local, x);
      }
    } else {
      for (i = 0; i < m; ++i) {
        nodes[i].node.setAttributeNS(n.space, n.local, v);
      }
    }
  } else if (v == null) {
    for (i = 0; i < m; ++i) {
      nodes[i].node.removeAttribute(n);
    }
  } else if (typeof v == "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      x = v.apply(o, d3_transform_stack);
      x == null
          ? o.node.removeAttribute(n)
          : o.node.setAttribute(n, x);
    }
  } else {
    for (i = 0; i < m; ++i) {
      nodes[i].node.setAttribute(n, v);
    }
  }
}

function d3_transform_attr_bind(nodes) {
  var m = nodes.length,
      n = this.name,
      v = this.bound || (this.bound = this.value),
      b = "attr." + (n.local ? n.space + ":" + n.local : n),
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (v && v.bind) {
    if (n.local) {
      for (i = 0; i < m; ++i) {
        (o = nodes[i]).value = o.node.getAttributeNS(n.space, n.local);
        o.name = n.space + ":" + n.local;
        d3_transform_stack[0] = o.data;
        o[b] = v.bind.apply(o, d3_transform_stack);
        delete o.value;
        delete o.name;
      }
    } else {
      for (i = 0; i < m; ++i) {
        (o = nodes[i]).value = o.node.getAttribute(n);
        o.name = n;
        d3_transform_stack[0] = o.data;
        o[b] = v.bind.apply(o, d3_transform_stack);
        delete o.value;
        delete o.name;
      }
    }
    this.value = function() {
      return this[b].apply(this, arguments);
    };
  }
}
