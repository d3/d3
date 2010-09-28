function d3_transform_text(nodes) {
  var m = nodes.length,
      v = this.value,
      i, // current node index
      o, // current node
      x; // current value (for value functions)
  if (typeof v == "function") {
    for (i = 0; i < m; ++i) {
      o = nodes[i];
      d3_transform_stack[0] = o.data;
      x = v.apply(o, d3_transform_stack);
      o = o.node;
      while (o.lastChild) o.removeChild(o.lastChild);
      o.appendChild(document.createTextNode(x));
    }
  } else {
    for (i = 0; i < m; ++i) {
      o = nodes[i].node;
      while (o.lastChild) o.removeChild(o.lastChild);
      o.appendChild(document.createTextNode(v));
    }
  }
}
