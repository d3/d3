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
      event = d3_dispatchers("start", "end"),
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

  // TODO register custom easing functions?
  transition.ease = function(value) {
    ease = d3.ease(value);
    return transition;
  };

  transition.attr = function(name, value) {
    var interpolators = [],
        k = -1;

    function attrConstant() {
      interpolators[++k] = d3.interpolate(
          this.getAttribute(name),
          value);
    }

    function attrConstantNS() {
      interpolators[++k] = d3.interpolate(
          this.getAttributeNS(name.space, name.local),
          value);
    }

    function attrFunction() {
      interpolators[++k] = d3.interpolate(
          this.getAttribute(name),
          value.apply(this, arguments));
    }

    function attrFunctionNS() {
      interpolators[++k] = d3.interpolate(
          this.getAttributeNS(name.space, name.local),
          value.apply(this, arguments));
    }

    function attrTween(t, k) {
      this.setAttribute(name, interpolators[k](t));
    }

    function attrTweenNS(t, k) {
      this.setAttributeNS(name.space, name.local, interpolators[k](t));
    }

    name = d3.ns.qualify(name);
    groups.each(typeof value == "function"
        ? (name.local ? attrFunctionNS : attrFunction)
        : (name.local ? attrConstantNS : attrConstant));
    tweens["attr." + name] = name.local ? attrTweenNS : attrTween;
    return transition;
  };

  transition.style = function(name, value, priority) {
    var interpolators = [],
        k = -1;

    function styleConstant(d, i) {
      interpolators[++k] = styleTween(
          window.getComputedStyle(this, null).getPropertyValue(name),
          value);
    }

    function styleFunction(d, i) {
      interpolators[++k] = styleTween(
          window.getComputedStyle(this, null).getPropertyValue(name),
          value.apply(this, arguments));
    }

    function styleTween(t, k) {
      this.style.setProperty(name, interpolators[k](t), priority);
    }

    groups.each(typeof value == "function" ? styleFunction : styleConstant);
    tweens["style." + name] = styleTween;
    return transition;
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

  transition.on = function(type, listener) {
    event[type].add(listener);
    return transition;
  };

  return transition.delay(0).duration(250);
}
