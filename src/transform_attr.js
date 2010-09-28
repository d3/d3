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

function d3_transform_attr_tween(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      i, // current index
      o; // current node
  if (n.local) {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).node.setAttributeNS(n.space, n.local, o.tween[k]());
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).node.setAttribute(n, o.tween[k]());
    }
  }
}

function d3_transform_attr_tween_bind(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      v = this.value,
      T = this.tween,
      i, // current index
      o; // current node
  if (n.local) {
    if (typeof v === "function") {
      for (i = 0; i < m; ++i) {
        d3_transform_stack[0] = (o = nodes[i]).data;
        o.tween[k] = T(o.node.getAttributeNS(n.local, n.space), v.apply(o, d3_transform_stack));
      }
    } else {
      for (i = 0; i < m; ++i) {
        (o = nodes[i]).tween[k] = T(o.node.getAttributeNS(n.local, n.space), v);
      }
    }
  } else if (typeof v === "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      o.tween[k] = T(o.node.getAttribute(n), v.apply(o, d3_transform_stack));
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween[k] = T(o.node.getAttribute(n), v);
    }
  }
}
