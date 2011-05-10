d3.stats.mean = function(x) {
  var s = 0,
      n = x.length,
      i = -1;
  while (++i < n) s += x[i];
  return s / n;
}
