d3.scale.ordinal = function() {
  return d3_scale_ordinal({}, 0, {t: "range", x: []});
};

function d3_scale_ordinal(domain, size, ranger) {
  var range,
      rangeBand;

  function scale(x) {
    return range[((domain[x] || (domain[x] = ++size)) - 1) % range.length];
  }

  scale.domain = function(x) {
    if (!arguments.length) return d3.keys(domain);
    domain = {};
    size = 0;
    var i = -1, n = x.length, xi;
    while (++i < n) if (!domain[xi = x[i]]) domain[xi] = ++size;
    return scale[ranger.t](ranger.x, ranger.p);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    ranger = {t: "range", x: x};
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (size - 1 + padding);
    range = size < 2 ? [(start + stop) / 2] : d3.range(start + step * padding / 2, stop + step / 2, step);
    rangeBand = 0;
    ranger = {t: "rangePoints", x: x, p: padding};
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (size + padding);
    range = d3.range(start + step * padding, stop, step);
    rangeBand = step * (1 - padding);
    ranger = {t: "rangeBands", x: x, p: padding};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = Math.floor((stop - start) / (size + padding)),
        err = stop - start - (size - padding) * step;
    range = d3.range(start + Math.round(err / 2), stop, step);
    rangeBand = Math.round(step * (1 - padding));
    ranger = {t: "rangeRoundBands", x: x, p: padding};
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.copy = function() {
    var copy = {}, x;
    for (x in domain) copy[x] = domain[x];
    return d3_scale_ordinal(copy, size, ranger);
  };

  return scale[ranger.t](ranger.x, ranger.p);
};
