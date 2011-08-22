function d3_transition(groups, id) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  var tweens = {},
      event = d3.dispatch("start", "end"),
      ease = d3_transitionEase;

  groups.id = id;

  groups.tween = function(name, tween) {
    if (arguments.length < 2) return tweens[name];
    if (tween == null) delete tweens[name];
    else tweens[name] = tween;
    return groups;
  };

  groups.ease = function(value) {
    if (!arguments.length) return ease;
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return groups;
  };

  groups.each = function(type, listener) {
    if (arguments.length < 2) return d3_transition_each.call(groups, type);
    event[type].add(listener);
    return groups;
  };

  d3.timer(function(elapsed) {
    groups.each(function(d, i, j) {
      var tweened = [],
          node = this,
          delay = groups[j][i].delay - elapsed,
          duration = groups[j][i].duration,
          lock = node.__transition__;

      if (!lock) lock = node.__transition__ = {active: 0, owner: id};
      else if (lock.owner < id) lock.owner = id;
      delay <= 0 ? start(0) : d3.timer(start, delay);

      function start(elapsed) {
        if (lock.active <= id) {
          lock.active = id;
          event.start.dispatch.call(node, d, i);

          for (var tween in tweens) {
            if (tween = tweens[tween].call(node, d, i)) {
              tweened.push(tween);
            }
          }

          delay -= elapsed;
          d3.timer(tick);
        }
        return true;
      }

      function tick(elapsed) {
        if (lock.active !== id) return true;

        var t = Math.min(1, (elapsed - delay) / duration),
            e = ease(t),
            n = tweened.length;

        while (--n >= 0) {
          tweened[n].call(node, e);
        }

        if (t === 1) {
          lock.active = 0;
          if (lock.owner === id) delete node.__transition__;
          d3_transitionInheritId = id;
          event.end.dispatch.call(node, d, i);
          d3_transitionInheritId = 0;
          return true;
        }
      }
    });
    return true;
  });

  return groups;
}

function d3_transitionTween(b) {
  return typeof b === "function"
      ? function(d, i, a) { var v = b.call(this, d, i) + ""; return a != v && d3.interpolate(a, v); }
      : (b = b + "", function(d, i, a) { return a != b && d3.interpolate(a, b); });
}

var d3_transitionPrototype = [],
    d3_transitionId = 0,
    d3_transitionInheritId = 0,
    d3_transitionEase = d3.ease("cubic-in-out");

// Subtransitions
d3_transitionPrototype.select = d3_transition_select;
d3_transitionPrototype.selectAll = d3_transition_selectAll;

// Content
d3_transitionPrototype.attr = d3_transition_attr;
d3_transitionPrototype.attrTween = d3_transition_attrTween;
d3_transitionPrototype.style = d3_transition_style;
d3_transitionPrototype.styleTween = d3_transition_styleTween;
d3_transitionPrototype.text = d3_transition_text;
d3_transitionPrototype.remove = d3_transition_remove;

// Animation
d3_transitionPrototype.delay = d3_transition_delay;
d3_transitionPrototype.duration = d3_transition_duration;

// Control
d3_transitionPrototype.call = d3_selection_call;

d3.transition = function() {
  return d3_selectionRoot.transition();
};
