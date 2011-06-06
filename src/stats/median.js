d3.stats.median = function(x) {
  return d3.stats.quantiles(x, [.5])[0];
};
