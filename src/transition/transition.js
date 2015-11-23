import "../arrays/map";
import "../core/subclass";
import "../core/true";
import "../event/dispatch";
import "../event/timer";
import "../selection/selection";
import "../selection/transition";
import "../selection/interrupt";

function d3_transition(groups, ns, id) {
  d3_subclass(groups, d3_transitionPrototype);

  // Note: read-only!
  groups.namespace = ns;
  groups.id = id;

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

d3.transition = function(selection, name) {
  return selection && selection.transition
      ? (d3_transitionInheritId ? selection.transition(name) : selection)
      : d3.selection().transition(selection);
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

function d3_transitionNamespace(name) {
  return name == null ? "__transition__" : "__transition_" + name + "__";
}

function d3_transitionNode(node, i, ns, id, inherit) {
  var lock = node[ns] || (node[ns] = {active: 0, count: 0}),
      transition = lock[id],
      time,
      timer,
      duration,
      ease,
      tweens;

  function schedule(elapsed) {
    var delay = transition.delay;
    timer.t = delay + time;
    if (delay <= elapsed) return start(elapsed - delay);
    timer.c = start;
  }

  function start(elapsed) {

    // Interrupt the active transition, if any.
    var activeId = lock.active,
        active = lock[activeId];
    if (active) {
      active.timer.c = null;
      active.timer.t = NaN;
      --lock.count;
      delete lock[activeId];
      active.event && active.event.interrupt.call(node, node.__data__, active.index);
    }

    // Cancel any pre-empted transitions. No interrupt event is dispatched
    // because the cancelled transitions never started.
    for (var cancelId in lock) {
      if (+cancelId < id) {
        var cancel = lock[cancelId];
        cancel.timer.c = null;
        cancel.timer.t = NaN;
        --lock.count;
        delete lock[cancelId];
      }
    }

    // Defer tween invocation to end of current frame; see mbostock/d3#1576.
    // Note that this transition may be canceled before then!
    // This must be scheduled before the start event; see d3/d3-transition#16!
    timer.c = tick;
    d3_timer(function() {
      if (timer.c && tick(elapsed || 1)) {
        timer.c = null;
        timer.t = NaN;
      }
      return 1;
    }, 0, time);

    // Start the transition.
    lock.active = id;
    transition.event && transition.event.start.call(node, node.__data__, i);

    // Initialize the tweens.
    tweens = [];
    transition.tween.forEach(function(key, value) {
      if (value = value.call(node, node.__data__, i)) {
        tweens.push(value);
      }
    });

    // Defer capture to allow tween initialization to set ease & duration.
    ease = transition.ease;
    duration = transition.duration;
  }

  function tick(elapsed) {
    var t = elapsed / duration,
        e = ease(t),
        n = tweens.length;

    while (n > 0) {
      tweens[--n].call(node, e);
    }

    if (t >= 1) {
      transition.event && transition.event.end.call(node, node.__data__, i);
      if (--lock.count) delete lock[id];
      else delete node[ns];
      return 1;
    }
  }

  if (!transition) {
    time = inherit.time;
    timer = d3_timer(schedule, 0, time);

    transition = lock[id] = {
      tween: new d3_Map,
      time: time,
      timer: timer,
      delay: inherit.delay,
      duration: inherit.duration,
      ease: inherit.ease,
      index: i
    };

    inherit = null; // allow gc

    ++lock.count;
  }
}
