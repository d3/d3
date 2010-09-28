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

function d3_transform_style_tween(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      p = this.priority,
      i, // current index
      o; // current node
  for (i = 0; i < m; ++i) {
    (o = nodes[i]).node.style.setProperty(n, o.tween[k](), p);
  }
}

function d3_transform_style_tween_bind(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      v = this.value,
      T = this.tween,
      i, // current index
      o; // current node
  if (typeof v === "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      o.tween[k] = T(o.node.style.getPropertyValue(n), v.apply(o, d3_transform_stack));
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween[k] = T(o.node.style.getPropertyValue(n), v);
    }
  }
}
