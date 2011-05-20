d3.stats.median = function(x) {
  var i = x.length / 2,
      j = Math.floor(i);
  return i === j ? (x[j - 1] + x[j]) / 2 : x[j];
};
