import "variance";

d3.deviation = function() {
  var v = d3.variance.apply(this, arguments);
  return v ? Math.sqrt(v) : v;
};
