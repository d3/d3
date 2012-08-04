d3_transitionPrototype.style = function(name, value, priority, interpolate) {
  var n = arguments.length;
  if (n < 3) interpolate = d3_interpolateByName(name), priority = "";
  else if (typeof priority === "function") interpolate = priority, priority = "";
  else interpolate = d3_interpolateByName(name);
  return this.styleTween(name, d3_transitionTween(interpolate, value), priority);
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f === d3_transitionRemove
        ? (this.style.removeProperty(name), null)
        : f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
