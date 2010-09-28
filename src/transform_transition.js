function d3_transform_transition(nodes) {
  var actions = this.actions,
      endActions = this.endActions,
      start = Date.now(),
      delay = this.delay,
      minDelay = Infinity,
      maxDelay = -Infinity,
      duration = this.duration,
      ease = this.ease,
      interval,
      n = actions.length,
      k = endActions.length,
      m = nodes.length,
      i, // current index
      j, // current index
      o, // curent node
      x, // current value
      stack = d3_transform_stack.slice(); // stack snapshot

  // If delay is a function, transition each node separately.
  if (typeof delay == "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      x = o.delay = delay.apply(o, d3_transform_stack);
      if (x < minDelay) minDelay = x;
      if (x > maxDelay) maxDelay = x;
    }
    setTimeout(function() {
      bind(interval = setInterval(tickOne, 24));
    }, minDelay);
  } else {
    setTimeout(function() {
      bind(interval = setInterval(tickAll, 24));
    }, delay);
  }

  // Bind the active transition to the node.
  function bind(interval) {
    var s = d3_transform_stack;
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).node.interval = interval;
    }
    try {
      d3.time = 0;
      d3_transform_stack = stack;
      d3_transform_transition_bind(actions, nodes);
    } finally {
      delete d3.time;
      d3_transform_stack = s;
    }
  }

  function tickOne() {
    var s = d3_transform_stack,
        a = nodes.filter(function(o) { return o.node.interval == interval; }),
        m = a.length,
        q = Date.now(),
        t,
        d = true;
    try {
      d3_transform_stack = stack;
      for (i = 0; i < m; ++i) {
        o = a[i];
        t = (q - start - o.delay) / duration;
        if (t < 0) continue;
        if (t > 1) t = 1;
        else d = false;
        d3.time = ease(t);
        for (j = 0; j < n; ++j) actions[j].impl([o], d3_transform_impl);
        if (t == 1) {
          for (j = 0; j < k; ++j) endActions[j].impl([o], d3_transform_impl);
          o.delay = Infinity; // stop transitioning this node
        }
      }
    } finally {
      delete d3.time;
      d3_transform_stack = s;
    }
    if (d) clearInterval(interval);
  }

  function tickAll() {
    var s = d3_transform_stack,
        t = (Date.now() - start - delay) / duration,
        a = nodes.filter(function(o) { return o.node.interval == interval; });
    try {
      d3_transform_stack = stack;
      d3.time = ease(t < 0 ? 0 : t > 1 ? 1 : t);
      for (i = 0; i < n; ++i) actions[i].impl(a, d3_transform_impl);
    } finally {
      delete d3.time;
      d3_transform_stack = s;
    }
    if (t >= 1) {
      clearInterval(interval);
      try {
        d3_transform_stack = stack;
        for (i = 0; i < k; ++i) endActions[i].impl(a, d3_transform_impl);
      } finally {
        d3_transform_stack = s;
      }
    }
  }
}

function d3_transform_transition_bind(actions, nodes) {
  var n = actions.length,
      m = nodes.length,
      a, // current action
      i; // current index
  for (i = 0; i < m; ++i) {
    nodes[i].tween = {};
  }
  for (i = 0; i < n; ++i) {
    a = actions[i];
    if (a.bind) a.bind(nodes);
    a.impl(nodes, d3_transform_transition_bind);
  }
}
