import "../arrays/map";
import "../core/subclass";
import "../core/true";
import "../event/dispatch";
import "../event/timer";
import "../selection/selection";

function d3_transition(groups, id) {
  d3_subclass(groups, d3_transitionPrototype);

  groups.id = id; // Note: read-only!

  return groups;
}

var d3_transitionPrototype = [],
    d3_transitionId = 0,
    d3_transitionInheritId,
    d3_transitionInherit;

d3_transitionPrototype.call = d3_selectionPrototype.call;
d3_transitionPrototype.empty = d3_selectionPrototype.empty;
d3_transitionPrototype.node = d3_selectionPrototype.node;
d3_transitionPrototype.size = d3_selectionPrototype.size;

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
      time: time,
      ease: inherit.ease,
      delay: inherit.delay,
      duration: inherit.duration
    };

    ++lock.count;

    d3.timer(function(elapsed) {
      var d = node.__data__,
          ease = transition.ease,
          delay = transition.delay,
          duration = transition.duration,
          timer = d3_timer_active,
          tweened = [];

      timer.t = delay + time;
      if (delay <= elapsed) return start(elapsed - delay);
      timer.c = start;

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;
        transition.event && transition.event.start.call(node, d, i);

        transition.tween.forEach(function(key, value) {
          if (value = value.call(node, d, i)) {
            tweened.push(value);
          }
        });

        d3.timer(function() { // defer to end of current frame
          timer.c = tick(elapsed || 1) ? d3_true : tick;
          return 1;
        }, 0, time);
      }

      function tick(elapsed) {
        if (lock.active !== id) return stop();

        var t = elapsed / duration,
            e = ease(t),
            n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          transition.event && transition.event.end.call(node, d, i);
          return stop();
        }
      }

      function stop() {
        if (--lock.count) delete lock[id];
        else delete node.__transition__;
        return 1;
      }
    }, 0, time);
  }
}
