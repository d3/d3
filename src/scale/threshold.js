d3.scale.threshold = function() {
  return d3_scale_threshold([.5], [0, 1]);
};

function d3_scale_threshold(domain, range) {

  function scale(x) {
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

  scale.copy = function() {
    return d3_scale_threshold(domain, range);
  };

  return scale;
};
