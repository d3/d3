function d3_transform_filter(nodes, pass) {
  var filteredNodes = [],
      m = nodes.length,
      f = this.filter,
      i, // the node index
      o; // current item
  for (i = 0; i < m; ++i) {
    d3_transform_stack[0] = (o = nodes[i]).data;
    if (f.apply(o, d3_transform_stack)) filteredNodes.push(o);
  }
  pass(this.actions, filteredNodes);
}
