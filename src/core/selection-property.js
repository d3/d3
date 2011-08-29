d3_selectionPrototype.property = function(name, value) {
  if (arguments.length < 2) {

    // map:object
    if ((value = typeof name) === "object") {
      for (value in name) this.property(value, name[value]);
      return this;
    }

    // map:function
    if (value === "function") {
      return this.each(function() {
        var x = name.apply(this, arguments);
        for (value in x) d3_selection_property(value, x[value]).apply(this, arguments);
      });
    }

    // name:string
    return this.node()[name];
  }

  // name:string, value:constant
  // name:string, value:null
  // name:string, value:function
  return this.each(d3_selection_property(name, value));
};

function d3_selection_property(name, value) {

  function propertyNull() {
    delete this[name];
  }

  function propertyConstant() {
    this[name] = value;
  }

  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) delete this[name];
    else this[name] = x;
  }

  return value == null
      ? propertyNull : (typeof value === "function"
      ? propertyFunction : propertyConstant);
}
