// Unbiased estimate of a sample's variance.
// Also known as the sample variance, where the denominator is n - 1.
d3.stats.variance = function(x) {
  var mean = d3.stats.mean(x),
      n = x.length,
      i = -1,
      s = 0;
  while (++i < n) {
    var v = x[i] - mean;
    s += v * v;
  }
  return s / (n - 1);
};
