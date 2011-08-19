d3.scale.quantile = function() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length;
    thresholds.length = Math.max(0, q - 1);
    while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
  }

  function scale(x) {
    if (isNaN(x = +x)) return NaN;
    return range[d3.bisect(thresholds, x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    rescale();
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rescale();
    return scale;
  };

  scale.quantiles = function() {
    return thresholds;
  };

  return scale;
};
