var d3_timer_queue = null,
    d3_timer_timeout = 0,
    d3_timer_interval;

function d3_timer(callback, delay) {
  var now = Date.now(),
      found = false,
      start = now + delay,
      t0,
      t1 = d3_timer_queue;

  // Scan the queue for earliest callback.
  while (t1) {
    if (t1.callback == callback) {
      t1.then = now;
      t1.delay = delay;
      found = true;
    } else {
      var x = t1.then + t1.delay;
      if (x < start) start = x;
    }
    t0 = t1;
    t1 = t1.next;
  }

  // Otherwise, add the callback to the queue.
  if (!found) d3_timer_queue = {
    callback: callback,
    then: now,
    delay: delay,
    next: d3_timer_queue
  };

  if (!d3_timer_interval) {
    clearTimeout(d3_timer_timeout);
    d3_timer_timeout = setTimeout(d3_timer_start, Math.min(24, start - now));
  }
}

function d3_timer_start() {
  d3_timer_interval = setInterval(d3_timer_step, 24);
  d3_timer_timeout = 0;
}

function d3_timer_step() {
  var elapsed,
      now = Date.now(),
      t0 = null,
      t1 = d3_timer_queue;
  while (t1) {
    elapsed = now - t1.then;
    if ((elapsed > t1.delay) && t1.callback(elapsed)) {
      if (t0) t0.next = t1.next;
      else d3_timer_queue = t1.next;
    }
    t0 = t1;
    t1 = t1.next;
  }
  if (!t0) d3_timer_interval = clearInterval(d3_timer_interval);
}
