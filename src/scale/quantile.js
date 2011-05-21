d3.scale.quantile = function() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length,
        i;
    thresholds.length = Math.max(0, q - 1);
    while (++k < q) {
      i = n * k / q;
      if (i % 1) thresholds[k - 1] = domain[~~i];
      else thresholds[k - 1] = (domain[i = ~~i] + domain[i - 1]) / 2;
    }
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
