d3.scale.quantile = function() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var i = -1,
        n = thresholds.length = range.length,
        k = domain.length / n;
    while (++i < n) thresholds[i] = domain[~~(i * k)];
  }

  function quantile(value) {
    if (isNaN(value = +value)) return NaN;
    var low = 0, high = thresholds.length - 1;
    while (low <= high) {
      var mid = (low + high) >> 1, midValue = thresholds[mid];
      if (midValue < value) low = mid + 1;
      else if (midValue > value) high = mid - 1;
      else return mid;
    }
    return high < 0 ? 0 : high;
  }

  function scale(x) {
    return range[quantile(x)];
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
