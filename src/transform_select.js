d3.select = function(s) {
  return d3_transform().select(s);
};

function d3_transform_select(nodes, pass) {
  var selectedNodes = [],
      m = nodes.length,
      s = this.selector,
      i, // the node index
      o, // current item
      p, // current node
      c, // current selected item
      e; // current selected node
  for (i = 0; i < m; ++i) {
    e = (p = (o = nodes[i]).node).querySelector(s);
    selectedNodes.push(c = Object.create(o));
    c.parent = o;
    c.node = e;
  }
  pass(this.actions, selectedNodes);
}

function d3_transform_select_bind(nodes, pass) {
  var action = this;
  d3_transform_select.call(this, nodes, function(actions, selectedNodes) {
    pass(actions, selectedNodes);
    action.impl = function(nodes, pass) {
      pass(actions, selectedNodes);
    };
  });
}
