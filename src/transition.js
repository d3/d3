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
      durationMax;

  function start() {
    interval = setInterval(step, 24);
  }

  function step() {
    var elapsed = Date.now() - then,
        clear = true,
        k = -1;
    groups.each(function(d, i) {
      if (stage[++k] == 2) return; // ended
      var t = (elapsed - delay[k]) / duration[k]; // TODO easing
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
      for (var key in tweens) tweens[key].call(this, t);
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
  // transition.easing = function(value) {
  //   easing = value;
  //   return transition;
  // };

  transition.attr = function(name, value) {
    var key = "attr." + name + ".",
        k = -1;

    function attrConstant(d, i) {
      tweens[key + ++k] = attrTween(
          this.getAttribute(name),
          value);
    }

    function attrConstantNS(d, i) {
      tweens[key + ++k] = attrTweenNS(
          this.getAttributeNS(name.space, name.local),
          value);
    }

    function attrFunction(d, i) {
      tweens[key + ++k] = attrTween(
          this.getAttribute(name),
          value.apply(this, arguments));
    }

    function attrFunctionNS(d, i) {
      tweens[key + ++k] = attrTweenNS(
          this.getAttributeNS(name.space, name.local),
          value.apply(this, arguments));
    }

    function attrTween(a, b) {
      var interpolate = d3.interpolate(a, b);
      return function(t) {
        this.setAttribute(name, interpolate(t));
      };
    }

    function attrTweenNS(a, b) {
      var interpolate = d3.interpolate(a, b);
      return function(t) {
        this.setAttributeNS(name.space, name.local, interpolate(t));
      };
    }

    name = d3.ns.qualify(name);
    groups.each(typeof value == "function"
        ? (name.local ? attrFunctionNS : attrFunction)
        : (name.local ? attrConstantNS : attrConstant));

    return transition;
  };

  transition.style = function(name, value, priority) {
    var key = "style." + name + ".",
        k = -1;

    function styleConstant(d, i) {
      tweens[key + ++k] = styleTween(
          window.getComputedStyle(this, null).getPropertyValue(name),
          value);
    }

    function styleFunction(d, i) {
      tweens[key + ++k] = styleTween(
          window.getComputedStyle(this, null).getPropertyValue(name),
          value.apply(this, arguments));
    }

    function styleTween(a, b) {
      var interpolate = d3.interpolate(a, b);
      return function(t) {
        this.style.setProperty(name, interpolate(t), priority);
      };
    }

    groups.each(typeof value == "function" ? styleFunction : styleConstant);
    return transition;
  };

  // TODO inherit easing
  transition.select = function(query) {
    var k, t = d3_transition(groups.select(query));
    k = -1; t.delay(function(d, i) { return delay[++k]; });
    k = -1; t.duration(function(d, i) { return duration[++k]; });
    return t;
  };

  // TODO inherit easing
  transition.selectAll = function(query) {
    var k, t = d3_transition(groups.selectAll(query));
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
