function d3_transform_on(nodes) {
  var actions = this.actions,
      n = actions.length,
      m = nodes.length,
      t = "on" + this.type,
      i = 0, // current index
      o, // curent node
      stack = d3_transform_stack.slice(); // stack snapshot

  if (n) {
    for (; i < m; ++i) {
      o = nodes[i];
      o.node[t] = bind([o]);
    }
  } else {
    for (; i < m; ++i) {
      nodes[i].node[t] = null;
    }
  }

  function bind(o) {
    return function(e) {
      var s = d3_transform_stack;
      try {
        d3_transform_stack = stack;
        d3.event = e;
        for (i = 0; i < n; ++i) actions[i].impl(o, d3_transform_impl);
      } finally {
        delete d3.event;
        d3_transform_stack = s;
      }
    };
  }
}
