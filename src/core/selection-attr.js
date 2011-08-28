d3_selectionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {

    if ((value = typeof name) === "object") {
      for (value in name) this.attr(value, name[value]);
      return this;
    }

    if (value === "function") {
      return this.each(function() {
        var x = name.apply(this, arguments);
        for (value in x) d3_selection_attr(value, x[value]).apply(this, arguments);
      });
    }

    value = this.node();
    return (name = d3.ns.qualify(name)).local
        ? value.getAttributeNS(name.space, name.local)
        : value.getAttribute(name);
  }
  return this.each(d3_selection_attr(name, value));
};

function d3_selection_attr(name, value) {
  name = d3.ns.qualify(name);

  function attrNull() {
    this.removeAttribute(name);
  }

  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  function attrConstant() {
    this.setAttribute(name, value);
  }

  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

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
