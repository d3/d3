import "../core/document";

var d3_timer_id = 0,
    d3_timer_byId = {},
    d3_timer_queueHead,
    d3_timer_queueTail,
    d3_timer_interval, // is an interval (or frame) active?
    d3_timer_timeout; // is a timeout active?

// The timer will continue to fire until callback returns true.
d3.timer = function(callback, delay, then) {
  if (arguments.length < 3) {
    if (arguments.length < 2) delay = 0;
    else if (!isFinite(delay)) return;
    then = Date.now();
  }

  // If the callback's already in the queue, update it.
  var time = then + delay, timer = d3_timer_byId[callback.id];
  if (timer && timer.callback === callback) timer.time = time;

  // Otherwise, add the callback to the tail of the queue.
  else {
    d3_timer_byId[callback.id = ++d3_timer_id] = timer = {
      callback: callback,
      time: time,
      next: null
    };
    if (d3_timer_queueTail) d3_timer_queueTail.next = timer;
    else d3_timer_queueHead = timer;
    d3_timer_queueTail = timer;
  }

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
};

function d3_timer_step() {
  var now = d3_timer_mark(),
      delay = d3_timer_sweep() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

d3.timer.flush = function() {
  d3_timer_mark();
  d3_timer_sweep();
};

function d3_timer_mark() {
  var now = Date.now();
      t1 = d3_timer_queueHead;
  while (t1) {
    if (now >= t1.time) t1.flush = t1.callback(now - t1.time);
    t1 = t1.next;
  }
  return now;
}

// Flush after callbacks to avoid concurrent queue modification.
// Returns the time of the earliest active timer, post-sweep.
function d3_timer_sweep() {
  var t0,
      t1 = d3_timer_queueHead,
      time = Infinity;
  while (t1) {
    if (t1.flush) {
      delete d3_timer_byId[t1.callback.id];
      t1 = t0 ? t0.next = t1.next : d3_timer_queueHead = t1.next;
    } else {
      time = Math.min(time, t1.time);
      t1 = (t0 = t1).next;
    }
  }
  d3_timer_queueTail = t0;
  return time;
}

var d3_timer_frame = d3_window.requestAnimationFrame
    || d3_window.webkitRequestAnimationFrame
    || d3_window.mozRequestAnimationFrame
    || d3_window.oRequestAnimationFrame
    || d3_window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };
