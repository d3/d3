d3_transitionPrototype.attr = function(name, value) {
  if (arguments.length < 2) {

    // For attr(object), the object specifies the names and values of the
    // attributes to transition. The values may be functions that are
    // evaluated for each element.
    for (value in name) this.attr(value, name[value]);
    return this;
  }

  var id = this.id;
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.__transition__[id].tween.set("attr." + name, d3_transition_attr(name, value.call(node, node.__data__, i, j))); }
      : (value = d3_transition_attr(name, value), function(node) { node.__transition__[id].tween.set("attr." + name, value); }));
};

d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var name = d3.ns.qualify(nameNS);

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f && function(t) { this.setAttribute(name, f(t)); };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f && function(t) { this.setAttributeNS(name.space, name.local, f(t)); };
  }

  return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
};

function d3_transition_attr(name, b) {
  var interpolate;

  name = d3.ns.qualify(name);

  // For attr(string, null), remove the attribute with the specified name.
  function attrNull() {
    this.removeAttribute(name);
  }
  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  // For attr(string, string), set the attribute with the specified name.
  function attrString() {
    var a = this.getAttribute(name), i;
    return a !== b && (i = interpolate(a, b), function(t) { this.setAttribute(name, i(t)); });
  }
  function attrStringNS() {
    var a = this.getAttributeNS(name.space, name.local), i;
    return a !== b && (i = interpolate(a, b), function(t) { this.setAttributeNS(name.space, name.local, i(t)); });
  }

  return b == null
      ? (name.local ? attrNullNS : attrNull)
      : (b += "", interpolate = d3_interpolateByName(name), name.local ? attrStringNS : attrString);
}
