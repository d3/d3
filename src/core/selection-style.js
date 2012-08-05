d3_selectionPrototype.style = function(name, value, priority) {
  var n = arguments.length;
  if (n < 3) {

    // For style(function) or style(function, priority), the function must
    // return an object for each element, specifying the names and values of the
    // styles to set or remove. The values must be constants, not function.
    if ((priority = typeof name) === "function") {
      if (n < 2) value = "";
      return this.each(function() {
        var x = name.apply(this, arguments);
        for (priority in x) d3_selection_style(priority, x[priority], value).apply(this, arguments);
      });
    }

    // For style(object) or style(object, priority), the object specifies the
    // names and values of the attributes to set or remove. The values may be
    // functions that are evaluated for each element.
    if (priority !== "string") {
      if (n < 2) value = "";
      for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
      return this;
    }

    // For style(string), return the computed style value for the first node.
    if (n < 2) return window
        .getComputedStyle(this.node(), null)
        .getPropertyValue(name);

    // For style(name, value), use the default priority.
    priority = "";
  }

  // Otherwise, a name, value and priority are specified, and handled as below.
  return this.each(d3_selection_style(name, value, priority));
};

function d3_selection_style(name, value, priority) {

  // For style(name, null) or style(name, null, priority), remove the style
  // property with the specified name. The priority is ignored.
  function styleNull() {
    this.style.removeProperty(name);
  }

  // For style(name, string) or style(name, string, priority), set the style
  // property with the specified name, using the specified priority.
  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  // For style(name, function) or style(name, function, priority), evaluate the
  // function for each element, and set or remove the style property as
  // appropriate. When setting, use the specified priority.
  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant);
}
