import "../arrays/map";
import "../core/array";
import "../event/dispatch";
import "../event/timer";
import "../interpolate/ease";
import "../selection/selection";

function d3_transition(groups, id) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  groups.id = id; // Note: read-only!

  return groups;
}

var d3_transitionPrototype = [],
    d3_transitionId = 0,
    d3_transitionInheritId,
    d3_transitionInherit = {ease: d3_ease_cubicInOut, delay: 0, duration: 250};

d3_transitionPrototype.call = d3_selectionPrototype.call;
d3_transitionPrototype.empty = d3_selectionPrototype.empty;
d3_transitionPrototype.node = d3_selectionPrototype.node;

d3.transition = function(selection) {
  return arguments.length
      ? (d3_transitionInheritId ? selection.transition() : selection)
      : d3_selectionRoot.transition();
};

d3.transition.prototype = d3_transitionPrototype;

import "select";
import "selectAll";
import "filter";
import "attr";
import "style";
import "text";
import "remove";
import "ease";
import "delay";
import "duration";
import "each";
import "subtransition";
import "tween";

function d3_transitionNode(node, i, id, inherit) {
  var lock = node.__transition__ || (node.__transition__ = {active: 0, count: 0}),
      transition = lock[id];

  if (!transition) {
    var time = inherit.time;

    transition = lock[id] = {
      tween: new d3_Map,
      event: d3.dispatch("start", "end"), // TODO construct lazily?
      time: time,
      ease: inherit.ease,
      delay: inherit.delay,
      duration: inherit.duration
    };

    ++lock.count;

    d3.timer(function(elapsed) {
      var d = node.__data__,
          ease = transition.ease,
          event = transition.event,
          delay = transition.delay,
          duration = transition.duration,
          tweened = [];

      return delay <= elapsed
          ? start(elapsed)
          : d3.timer(start, delay, time), 1;

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;
        event.start.call(node, d, i);

        transition.tween.forEach(function(key, value) {
          if (value = value.call(node, d, i)) {
            tweened.push(value);
          }
        });

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
          event.end.call(node, d, i);
          return 1;
        }
      }

      function stop() {
        if (--lock.count) delete lock[id];
        else delete node.__transition__;
        return 1;
      }
    }, 0, time);

    return transition;
  }
}
