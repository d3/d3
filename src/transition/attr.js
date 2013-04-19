import "../core/ns";
import "../interpolate/interpolate";
import "transition";
import "tween";

d3_transitionPrototype.attr = function(nameNS, value) {
  if (arguments.length < 2) {

    // For attr(object), the object specifies the names and values of the
    // attributes to transition. The values may be functions that are
    // evaluated for each element.
    for (value in nameNS) this.attr(value, nameNS[value]);
    return this;
  }

  var interpolate = d3_interpolateByName(nameNS),
      name = d3.ns.qualify(nameNS);

  // For attr(string, null), remove the attribute with the specified name.
  function attrNull() {
    this.removeAttribute(name);
  }
  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  return d3_transition_tween(this, "attr." + nameNS, value, function(b) {

    // For attr(string, string), set the attribute with the specified name.
    function attrString() {
      var a = this.getAttribute(name), i;
      return a !== b && (i = interpolate(a, b), function(t) { this.setAttribute(name, i(t)); });
    }
    function attrStringNS() {
      var a = this.getAttributeNS(name.space, name.local), i;
      return a !== b && (i = interpolate(a, b), function(t) { this.setAttributeNS(name.space, name.local, i(t)); });
    }

    return b == null ? (name.local ? attrNullNS : attrNull)
        : (b += "", name.local ? attrStringNS : attrString);
  });
};

d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var attr,
      name = d3.ns.qualify(nameNS),
      nameTween = "attr." + nameNS;

  if (arguments.length < 2) {
    attr = this.tween(nameTween);
    return attr && attr._;
  }

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f && function(t) { this.setAttribute(name, f(t)); };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f && function(t) { this.setAttributeNS(name.space, name.local, f(t)); };
  }

  if (tween != null) {
    attr = name.local ? attrTweenNS : attrTween;
    attr._ = tween;
  }

  return this.tween(nameTween, attr);
};
