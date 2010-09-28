d3.selectAll = function(s) {
  return d3_transform().selectAll(s);
};

function d3_transform_select_all(nodes, pass) {
  var m = nodes.length,
      s = this.selector,
      i, // the node index
      o, // the current node
      p; // the current node
  d3_transform_stack.unshift(null);
  for (i = 0; i < m; ++i) {
    d3_transform_stack[1] = (o = nodes[i]).data;
    pass(this.actions, d3_transform_nodes((p = o.node).querySelectorAll(s), p));
  }
  d3_transform_stack.shift();
}

function d3_transform_nodes(x, p) {
  var nodes = [],
      i = 0,
      n = x.length;
  nodes.parentNode = p;
  for (; i < n; i++) nodes.push({node: x[i], index: i});
  return nodes;
}
