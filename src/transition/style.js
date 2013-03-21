import "../core/document";
import "../interpolate/interpolate";
import "transition";
import "tween";

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

  var interpolate = d3_interpolateByName(name);

  // For style(name, null) or style(name, null, priority), remove the style
  // property with the specified name. The priority is ignored.
  function styleNull() {
    this.style.removeProperty(name);
  }

  // Otherwise, a name, value and priority are specified, and handled as below.
  return d3_transition_tween(this, "style." + name, value, function(b) {

    // For style(name, string) or style(name, string, priority), set the style
    // property with the specified name, using the specified priority.
    function styleString() {
      var a = d3_window.getComputedStyle(this, null).getPropertyValue(name), i;
      return a !== b && (i = interpolate(a, b), function(t) { this.style.setProperty(name, i(t), priority); });
    }

    return b == null ? styleNull
        : (b += "", styleString);
  });
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
    return f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
