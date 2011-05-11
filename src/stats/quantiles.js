d3.stats.quantiles = function(d, quantiles) {
  d = d.slice().sort(d3.ascending);
  var n = d.length;
  return quantiles.map(function(q) {
    q *= n;
    return ~~q === q ? (d[q] + d[q + 1]) / 2 : d[Math.round(q)];
  });
};
