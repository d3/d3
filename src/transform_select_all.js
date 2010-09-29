d3.selectAll = function(s) {
  return d3_transform().selectAll(s);
};

function d3_transform_select_all(nodes, pass) {
  var m = nodes.length,
      s = this.selector,
      i, // the node index
      o; // the current node
  d3_transform_stack.unshift(null);
  for (i = 0; i < m; ++i) {
    d3_transform_stack[1] = (o = nodes[i]).data;
    pass(this.actions, d3_transform_nodes(o.node.querySelectorAll(s), o));
  }
  d3_transform_stack.shift();
}

function d3_transform_select_all_bind(nodes, pass) {
  var m = nodes.length,
      i, // the node index
      o; // the current node
  d3_transform_select_all.call(this, nodes, function(actions, nodes) {
    pass(actions, nodes.parent.selectAll = nodes);
  });
  this.impl = function(nodes, pass) {
    d3_transform_stack.unshift(null);
    for (i = 0, m = nodes.length; i < m; ++i) {
      d3_transform_stack[1] = (o = nodes[i]).data;
      pass(this.actions, o.selectAll);
    }
    d3_transform_stack.shift();
  };
}

function d3_transform_nodes(x, o) {
  var nodes = [],
      i = 0,
      n = x.length;
  nodes.parent = o;
  for (; i < n; i++) nodes.push({node: x[i], index: i});
  return nodes;
}
