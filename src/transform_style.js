function d3_transform_style(nodes) {
  var m = nodes.length,
      n = this.name,
      v = this.value,
      p = this.priority,
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (v == null) {
    for (i = 0; i < m; ++i) {
      nodes[i].node.style.removeProperty(n);
    }
  } else if (typeof v == "function") {
    for (i = 0; i < m; ++i) {
      o = nodes[i];
      d3_transform_stack[0] = o.data;
      x = v.apply(o, d3_transform_stack);
      x == null
          ? o.node.style.removeProperty(n)
          : o.node.style.setProperty(n, x, p);
    }
  } else {
    for (i = 0; i < m; ++i) {
      nodes[i].node.style.setProperty(n, v, p);
    }
  }
}

function d3_transform_style_bind(nodes) {
  var m = nodes.length,
      n = this.name,
      v = this.bound || (this.bound = this.value),
      b = "style." + n,
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (v && v.bind) {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).value = o.node.style.getPropertyValue(n);
      o.name = n;
      d3_transform_stack[0] = o.data;
      o[b] = v.bind.apply(o, d3_transform_stack);
      delete o.value;
      delete o.name;
    }
    this.value = function() {
      return this[b].apply(this, arguments);
    };
  }
}
