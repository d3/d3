function d3_transition_style(name, value, priority) {
  if (arguments.length < 3) priority = null;
  return this.styleTween(name, d3_transitionTween(value), priority);
}

function d3_transition_styleTween(name, tween, priority) {
  if (arguments.length < 3) priority = null;
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f && function(t) {
      this.style.setProperty(name, f(t), priority);
    };
  });
}
