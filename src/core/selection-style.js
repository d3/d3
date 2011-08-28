d3_selectionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) {

    // map:object, priority:string
    // map:object
    if ((priority = typeof name) === "object") {
      if (arguments.length < 2) value = "";
      for (priority in name) this.style(priority, name[priority], value);
      return this;
    }

    // map:function, priority:string
    // map:function
    if (priority === "function") {
      if (arguments.length < 2) value = "";
      return this.each(function() {
        var x = name.apply(this, arguments);
        for (priority in x) d3_selection_style(priority, x[priority], value).apply(this, arguments);
      });
    }

    // name:string
    if (arguments.length < 2) return window
        .getComputedStyle(this.node(), null)
        .getPropertyValue(name);

    // name:string, value:constant
    // name:string, value:null
    // name:string, value:function
    priority = "";
  }

  // name:string, value:constant, priority:string
  // name:string, value:null, priority:string
  // name:string, value:function, priority:string
  return this.each(d3_selection_style(name, value, priority));
};

function d3_selection_style(name, value, priority) {

  function styleNull() {
    this.style.removeProperty(name);
  }

  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant);
}
