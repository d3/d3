d3_selectionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {

    // For attr(function), the function must return an object for each element,
    // specifying the names and values of the attributes to set or remove. The
    // values must be constants, not function.
    if ((value = typeof name) === "function") {
      return this.each(function() {
        var x = name.apply(this, arguments);
        for (value in x) d3_selection_attr(value, x[value]).apply(this, arguments);
      });
    }

    // For attr(string), return the attribute value for the first node.
    if (value === "string") {
      value = this.node();
      return (name = d3.ns.qualify(name)).local
          ? value.getAttributeNS(name.space, name.local)
          : value.getAttribute(name);
    }

    // Otherwise, for attr(object), the object specifies the names and values of
    // the attributes to set or remove. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.each(d3_selection_attr(value, name[value]));
    return this;
  }

  // Otherwise, both a name and a value are specified, and are handled as below.
  return this.each(d3_selection_attr(name, value));
};

function d3_selection_attr(name, value) {
  name = d3.ns.qualify(name);

  // For attr(name, null), remove the attribute with the specified name.
  function attrNull() {
    this.removeAttribute(name);
  }
  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  // For attr(name, string), set the attribute with the specified name.
  function attrConstant() {
    this.setAttribute(name, value);
  }
  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

  // For attr(name, function), evaluate the function for each element, and set
  // or remove the attribute as appropriate.
  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttribute(name);
    else this.setAttribute(name, x);
  }
  function attrFunctionNS() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttributeNS(name.space, name.local);
    else this.setAttributeNS(name.space, name.local, x);
  }

  return value == null
      ? (name.local ? attrNullNS : attrNull) : (typeof value === "function"
      ? (name.local ? attrFunctionNS : attrFunction)
      : (name.local ? attrConstantNS : attrConstant));
}
