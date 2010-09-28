function d3_transform_add(nodes, pass) {
  var m = nodes.length,
      n = this.name,
      childNodes = [],
      i, // current index
      o, // current node
      c; // current child
  if (n.local) {
    for (i = 0; i < m; ++i) {
      childNodes.push(c = Object.create(o = nodes[i]));
      c.node = (c.parentNode = o.node).appendChild(document.createElementNS(n.space, n.local));
    }
  } else {
    for (i = 0; i < m; ++i) {
      childNodes.push(c = Object.create(o = nodes[i]));
      c.node = (c.parentNode = o.node).appendChild(document.createElement(n));
    }
  }
  pass(this.actions, childNodes);
}
