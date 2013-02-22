d3.deviation = function(array, f) {
  var v = f ? d3.variance(array, f) : d3.variance(array);
  return v ? Math.sqrt(v) : v;
};
