function d3_transition_attr(name, value) {
  return this.attrTween(name, d3_transitionTween(value));
}

function d3_transition_attrTween(name, tween) {
  name = d3.ns.qualify(name);

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f && function(t) {
      this.setAttribute(name, f(t));
    };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f && function(t) {
      this.setAttributeNS(name.space, name.local, f(t));
    };
  }

  return this.tween("attr." + name, name.local ? attrTweenNS : attrTween);
}
