d3.transition = function() {
  return d3_root.transition();
};

// TODO namespace transitions; cancel collisions
// TODO easing
function d3_transition(groups) {
  var transition = {},
      tweens = {},
      timeout = setTimeout(start, 1),
      interval,
      then = Date.now(),
      event = d3.dispatch("start", "end"),
      stage = [],
      delay = [],
      duration = [],
      durationMax,
      ease = d3.ease("cubic-in-out");

  function start() {
    interval = setInterval(step, 24);
  }

  function step() {
    var elapsed = Date.now() - then,
        clear = true,
        k = -1;
    groups.each(function(d, i) {
      if (stage[++k] == 2) return; // ended
      var t = (elapsed - delay[k]) / duration[k];
      if (t >= 1) {
        t = 1;
      } else {
        clear = false;
        if (t < 0) return;
        if (!stage[k]) {
          stage[k] = 1;
          event.start.dispatch.apply(this, arguments);
        }
      }
      var te = ease(t);
      for (var key in tweens) tweens[key].call(this, te, k);
      if (t == 1) {
        stage[k] = 2;
        event.end.dispatch.apply(this, arguments);
      }
    });
    if (clear) clearInterval(interval);
  }

  transition.delay = function(value) {
    var delayMin = Infinity,
        k = -1;
    if (typeof value == "function") {
      groups.each(function(d, i) {
        var x = delay[++k] = +value.apply(this, arguments);
        if (x < delayMin) delayMin = x;
      });
    } else {
      delayMin = +value;
      groups.each(function(d, i) {
        delay[++k] = delayMin;
      });
    }
    clearTimeout(timeout);
    timeout = setTimeout(start, delayMin);
    return transition;
  };

  transition.duration = function(value) {
    var k = -1;
    if (typeof value == "function") {
      durationMax = 0;
      groups.each(function(d, i) {
        var x = duration[++k] = +value.apply(this, arguments);
        if (x > durationMax) durationMax = x;
      });
    } else {
      durationMax = +value;
      groups.each(function(d, i) {
        duration[++k] = durationMax;
      });
    }
    return transition;
  };

  transition.ease = function(value) {
    ease = typeof value == "string" ? d3.ease(value) : value;
    return transition;
  };

  transition.attrTween = function(name, tween) {
    var interpolators = [],
        k = -1;

    function attrInterpolator(d, i) {
      interpolators[++k] = tween.call(this, d, i,
          this.getAttribute(name));
    }

    function attrInterpolatorNS(d, i) {
      interpolators[++k] = tween.call(this, d, i,
          this.getAttributeNS(name.space, name.local));
    }

    function attrTween(t, k) {
      this.setAttribute(name, interpolators[k](t));
    }

    function attrTweenNS(t, k) {
      this.setAttributeNS(name.space, name.local, interpolators[k](t));
    }

    name = d3.ns.qualify(name);
    groups.each(name.local ? attrInterpolatorNS : attrInterpolator);
    tweens["attr." + name] = name.local ? attrTweenNS : attrTween;
    return transition;
  };

  transition.attr = function(name, value) {
    return transition.attrTween(name, d3_tween(value));
  };

  transition.styleTween = function(name, tween, priority) {
    var interpolators = [],
        k = -1;

    function styleInterpolator(d, i) {
      interpolators[++k] = tween.call(this, d, i,
          window.getComputedStyle(this, null).getPropertyValue(name));
    }

    function styleTween(t, k) {
      this.style.setProperty(name, interpolators[k](t), priority);
    }

    groups.each(styleInterpolator);
    tweens["style." + name] = styleTween;
    return transition;
  };

  transition.style = function(name, value, priority) {
    return transition.styleTween(name, d3_tween(value), priority);
  };

  transition.select = function(query) {
    var k, t = d3_transition(groups.select(query)).ease(ease);
    k = -1; t.delay(function(d, i) { return delay[++k]; });
    k = -1; t.duration(function(d, i) { return duration[++k]; });
    return t;
  };

  transition.selectAll = function(query) {
    var k, t = d3_transition(groups.selectAll(query)).ease(ease);
    k = -1; t.delay(function(d, i) { return delay[i ? k : ++k]; })
    k = -1; t.duration(function(d, i) { return duration[i ? k : ++k]; });
    return t;
  };

  transition.each = function(type, listener) {
    event[type].add(listener);
    return transition;
  };

  return transition.delay(0).duration(250);
}
