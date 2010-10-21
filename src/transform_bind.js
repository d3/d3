function d3_transform_bind(nodes) {
  var m = nodes.length,
      t = "on" + this.type,
      l = this.listener,
      i = 0, // current node index
      o, // curent node
      stack = d3_transform_stack.slice(); // stack snapshot

  // TODO this overwrites any actions registered with .on!
  // TODO using namespaced event handlers could fix this ^ issue.
  if (l) {
    for (; i < m; ++i) {
      o = nodes[i];
      o.node[t] = bind(o, o.data);
    }
  } else {
    for (; i < m; ++i) {
      nodes[i].node[t] = null; // clear any previously-registered actions
    }
  }

  function bind(o, d) {
    return function(e) {
      var s = d3_transform_stack;
      try {
        d3.event = e;
        stack[0] = d;
        l.apply(o, d3_transform_stack = stack);
      } finally {
        delete d3.event;
        d3_transform_stack = s;
      }
    };
  }
}
