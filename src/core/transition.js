d3.transition = d3_root.transition;

var d3_transitionId = 0,
    d3_transitionInheritId = 0;

function d3_transition(groups) {
  var transition = {},
      transitionId = d3_transitionInheritId || ++d3_transitionId,
      tweens = {},
      interpolators = [],
      remove = false,
      event = d3.dispatch("start", "end"),
      stage = [],
      delay = [],
      duration = [],
      durationMax,
      ease = d3.ease("cubic-in-out");

  //
  // Be careful with concurrent transitions!
  //
  // Say transition A causes an exit. Before A finishes, a transition B is
  // created, and believes it only needs to do an update, because the elements
  // haven't been removed yet (which happens at the very end of the exit
  // transition).
  //
  // Even worse, what if either transition A or B has a staggered delay? Then,
  // some elements may be removed, while others remain. Transition B does not
  // know to enter the elements because they were still present at the time
  // the transition B was created (but not yet started).
  //
  // To prevent such confusion, we only trigger end events for transitions if
  // the transition ending is the only one scheduled for the given element.
  // Similarly, we only allow one transition to be active for any given
  // element, so that concurrent transitions do not overwrite each other's
  // properties.
  //
  // TODO Support transition namespaces, so that transitions can proceed
  // concurrently on the same element if needed. Hopefully, this is rare!
  //

  groups.each(function() {
    (this.__transition__ || (this.__transition__ = {})).owner = transitionId;
  });

  function step(elapsed) {
    var clear = true,
        k = -1;
    groups.each(function() {
      if (stage[++k] === 2) return; // ended
      var t = (elapsed - delay[k]) / duration[k],
          tx = this.__transition__,
          te, // ease(t)
          tk, // tween key
          ik = interpolators[k];

      // Check if the (un-eased) time is outside the range [0,1].
      if (t < 1) {
        clear = false;
        if (t < 0) return;
      } else {
        t = 1;
      }

      // Determine the stage of this transition.
      // 0 - Not yet started.
      // 1 - In progress.
      // 2 - Ended.
      if (stage[k]) {
        if (!tx || tx.active !== transitionId) {
          stage[k] = 2;
          return;
        }
      } else if (!tx || tx.active > transitionId) {
        stage[k] = 2;
        return;
      } else {
        stage[k] = 1;
        event.start.dispatch.apply(this, arguments);
        ik = interpolators[k] = {};
        tx.active = transitionId;
        for (tk in tweens) {
          if (te = tweens[tk].apply(this, arguments)) {
            ik[tk] = te;
          }
        }
      }

      // Apply the interpolators!
      te = ease(t);
      for (tk in ik) ik[tk].call(this, te);

      // Handle ending transitions.
      if (t === 1) {
        stage[k] = 2;
        if (tx.active === transitionId) {
          var owner = tx.owner;
          if (owner === transitionId) {
            delete this.__transition__;
            if (remove) this.parentNode.removeChild(this);
          }
          d3_transitionInheritId = transitionId;
          event.end.dispatch.apply(this, arguments);
          d3_transitionInheritId = 0;
          tx.owner = owner;
        }
      }
    });
    return clear;
  }

  transition.delay = function(value) {
    var delayMin = Infinity,
        k = -1;
    if (typeof value === "function") {
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
    d3_timer(step, delayMin);
    return transition;
  };

  transition.duration = function(value) {
    var k = -1;
    if (typeof value === "function") {
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
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return transition;
  };

  transition.attrTween = function(name, tween) {

    /** @this {Element} */
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }

    /** @this {Element} */
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }

    tweens["attr." + name] = name.local ? attrTweenNS : attrTween;
    return transition;
  };

  transition.attr = function(name, value) {
    return transition.attrTween(name, d3_transitionTween(value));
  };

  transition.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = null;

    /** @this {Element} */
    function styleTween(d, i) {
      var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    }

    tweens["style." + name] = styleTween;
    return transition;
  };

  transition.style = function(name, value, priority) {
    if (arguments.length < 3) priority = null;
    return transition.styleTween(name, d3_transitionTween(value), priority);
  };

  transition.text = function(value) {
    tweens.text = function(d, i) {
      this.textContent = typeof value === "function"
          ? value.call(this, d, i)
          : value;
    };
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

  transition.remove = function() {
    remove = true;
    return transition;
  };

  transition.each = function(type, listener) {
    event[type].add(listener);
    return transition;
  };

  transition.call = d3_call;

  return transition.delay(0).duration(250);
}

function d3_transitionTween(b) {
  return typeof b === "function"
      ? function(d, i, a) { var v = b.call(this, d, i) + ""; return a != v && d3.interpolate(a, v); }
      : (b = b + "", function(d, i, a) { return a != b && d3.interpolate(a, b); });
}
