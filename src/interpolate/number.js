d3.interpolateNumber = d3_interpolateNumber;

function d3_interpolateNumber(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
}
