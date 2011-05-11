// Welford's algorithm.
d3.stats.mean = function(x) {
  var m = 0,
      n = x.length,
      i = -1;
  while (++i < n) m += (x[i] - m) / (i + 1);
  return m;
};
