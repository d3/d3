function d3_tween(b) {
  return typeof b == "function"
    ? function(d, i, a) { return d3.interpolate(a, b.call(this, d, i)); }
    : function(d, i, a) { return d3.interpolate(a, b); };
}
