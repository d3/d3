import "number";

d3.interpolateDate = d3_interpolateDate;

function d3_interpolateDate(a, b) {
  var interp = d3_interpolateNumber(+a, +b)
  return function(t) { return new Date(interp(t)); };
}
