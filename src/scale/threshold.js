d3.scale.threshold = function() {
  return d3_scale_threshold([.5], [0, 1]);
};

function d3_scale_threshold(domain, range) {

  function scale(x) {
    // ASSUMPTION: domain.length == range.length - 1
    return range[d3.bisect(domain, x)];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return scale;
  };

  scale.range = function(_) {
    if (!arguments.length) return range;
    range = _;
    return scale;
  };

  scale.ticks = function(m) {
    var l = Math.min(domain.length, range.length - 1);
    if (l > 0) {
      var t = [], i;
      t.push(+domain[0] - 1);
      for (i = 1; i < l; i++) {
        t.push((+domain[i] - +domain[i - 1]) / 2);
      }
      t.push(+domain[l - 1] + 1);
      return t;
    }
    return [];
  };

  scale.copy = function() {
    return d3_scale_threshold(domain, range);
  };

  return scale;
};
