function d3_transition(groups, id, time) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  var event = d3.dispatch("start", "end"),
      ease = d3_transitionEase;

  groups.id = id;

  groups.time = time;

  groups.ease = function(value) {
    if (!arguments.length) return ease;
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return groups;
  };

  groups.each = function(type, listener) {
    if (arguments.length < 2) return d3_transition_each.call(groups, type);
    event.on(type, listener);
    return groups;
  };

  // TODO If the same node is in multiple transitions with the same id,
  // then this could trigger redundant timers and redundant tweens.
  d3.timer(function(elapsed) {
    return d3_selection_each(groups, function(node, i, j) {
      var d = node.__data__,
          lock = node.__transition__,
          transition = lock[id],
          delay = transition.delay,
          duration = transition.duration,
          tweened = [];

      delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time);

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;

        transition.tween.forEach(function(key, value) {
          if (value = value.call(node, d, i)) {
            tweened.push(value);
          }
        });

        event.start.call(node, d, i);
        if (!tick(elapsed)) d3.timer(tick, 0, time);
        return 1;
      }

      function tick(elapsed) {
        if (lock.active !== id) return stop();

        var t = (elapsed - delay) / duration,
            e = ease(t),
            n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          stop();
          d3_transitionId = id;
          event.end.call(node, d, i);
          d3_transitionId = 0;
          return 1;
        }
      }

      function stop() {
        if (--lock.count) delete lock[id];
        else delete node.__transition__;
        return 1;
      }
    });
  }, 0, time);

  return groups;
}

var d3_transitionPrototype = [],
    d3_transitionNextId = 0,
    d3_transitionId = 0,
    d3_transitionDefaultDelay = 0,
    d3_transitionDefaultDuration = 250,
    d3_transitionDelay = d3_transitionDefaultDelay,
    d3_transitionDuration = d3_transitionDefaultDuration,
    d3_transitionEase = d3_ease_cubicInOut;

d3_transitionPrototype.call = d3_selectionPrototype.call;
d3_transitionPrototype.empty = d3_selectionPrototype.empty;
d3_transitionPrototype.node = d3_selectionPrototype.node;

d3.transition = function(selection) {
  return arguments.length
      ? (d3_transitionId ? selection.transition() : selection)
      : d3_selectionRoot.transition();
};

d3.transition.prototype = d3_transitionPrototype;

function d3_transitionNode(node, id, delay, duration) {
  var lock = node.__transition__ || (node.__transition__ = {active: 0, count: 0});
  lock[id] || (lock[id] = {delay: delay, duration: duration, tween: new d3_Map});
  ++lock.count;
}
