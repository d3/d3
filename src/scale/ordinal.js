d3.scale.ordinal = function() {
  return d3_scale_ordinal({}, 0, d3_noop);
};

function d3_scale_ordinal(domain, size, rerange) {
  var range = [],
      rangeBand = 0;

  function scale(x) {
    return range[((domain[x] || (domain[x] = ++size)) - 1) % range.length];
  }

  scale.domain = function(x) {
    if (!arguments.length) return d3.keys(domain);
    domain = {};
    size = 0;
    var i = -1, n = x.length, xi;
    while (++i < n) if (!domain[xi = x[i]]) domain[xi] = ++size;
    rerange();
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    rerange = d3_noop;
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0], stop = x[1];
    (rerange = function() {
      var step = (stop - start) / (size - 1 + padding);
      range = size < 2
          ? [(start + stop) / 2]
          : d3.range(start + step * padding / 2, stop + step / 2, step);
      rangeBand = 0;
    })();
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0], stop = x[1];
    (rerange = function() {
      var step = (stop - start) / (size + padding);
      range = d3.range(start + step * padding, stop, step);
      rangeBand = step * (1 - padding);
    })();
    return scale;
  };

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0], stop = x[1];
    (rerange = function() {
      var step = Math.floor((stop - start) / (size + padding)),
          err = stop - start - (size - padding) * step;
      range = d3.range(start + Math.round(err / 2), stop, step);
      rangeBand = Math.round(step * (1 - padding));
    })();
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.copy = function() {
    var copy = {}, x;
    for (x in domain) copy[x] = domain[x];
    return d3_scale_ordinal(copy, size, rerange);
  };

  rerange();
  return scale;
};
