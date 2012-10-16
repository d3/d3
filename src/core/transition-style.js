d3_transitionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {

    // For style(object) or style(object, string), the object specifies the
    // names and values of the attributes to set or remove. The values may be
    // functions that are evaluated for each element. The optional string
    // specifies the priority.
    if (typeof name !== "string") {
      if (n < 2) value = "";
      for (priority in name) this.style(priority, name[priority], value);
      return this;
    }

    // For style(string, string) or style(string, function), use the default
    // priority. The priority is ignored for style(string, null).
    priority = "";
  }

  // Otherwise, a name, value and priority are specified, and handled as below.
  var id = this.id;
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.__transition__[id].tween.set("style." + name, d3_transition_style(name, value.call(node, node.__data__, i, j), priority)); }
      : (value = d3_transition_style(name, value, priority), function(node) { node.__transition__[id].tween.set("style." + name, value); }));
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, getComputedStyle(this, null).getPropertyValue(name));
    return f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};

function d3_transition_style(name, b, priority) {
  var interpolate;

  // For style(name, null) or style(name, null, priority), remove the style
  // property with the specified name. The priority is ignored.
  function styleNull() {
    this.style.removeProperty(name);
  }

  // For style(name, string) or style(name, string, priority), set the style
  // property with the specified name, using the specified priority.
  function styleString() {
    var a = getComputedStyle(this, null).getPropertyValue(name), i;
    return a !== b && (i = interpolate(a, b), function(t) { this.style.setProperty(name, i(t), priority); });
  }

  return b == null ? styleNull : (b += "", interpolate = d3_interpolateByName(name), styleString);
}
