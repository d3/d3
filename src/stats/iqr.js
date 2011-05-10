d3.stats.iqr = function(x) {
  var quartiles = d3.stats.quantiles(x, [.25, .75]);
  return quartiles[1] - quartiles[0];
};
