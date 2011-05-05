d3.scale.linear = function() {
  var d = [0, 1],
      r = [0, 1],
      interpolate = d3.interpolate,
      i = [interpolate(0, 1)],
      clamp = false;

  function scale(x) {
    var j = d3.search(d, x);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    x = (x - d[j]) / (d[j + 1] - d[j]);
    return i[j](clamp ? Math.max(0, Math.min(1, x)) : x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    var j = d3.search(r, y);
    if (j < 0) j = -j - 2;
    j = Math.max(0, Math.min(i.length - 1, j));
    return d[j] + (y - r[j]) / (r[j + 1] - r[j]) * (d[j + 1] - d[j]);
  };

  scale.domain = function(x) {
    if (!arguments.length) return d;
    d = x.map(Number);
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return r;
    r = x;
    i = [];
    for (var j = 0; j < r.length - 1; j++) {
      i.push(interpolate(r[j], r[j + 1]));
    }
    return scale;
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return scale;
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    i = [];
    for (var j = 0; j < r.length - 1; j++) {
      i.push(interpolate(r[j], r[j + 1]));
    }
    return scale;
  };

  // TODO Dates? Ugh.
  function tickRange(m) {
    var start = d3.min(d),
        stop = d3.max(d),
        span = stop - start,
        step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
        err = m / (span / step);

    // Filter ticks to get closer to the desired count.
    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;

    // Round start and stop values to step interval.
    return {
      start: Math.ceil(start / step) * step,
      stop: Math.floor(stop / step) * step + step * .5, // inclusive
      step: step
    };
  }

  scale.ticks = function(m) {
    var range = tickRange(m);
    return d3.range(range.start, range.stop, range.step);
  };

  scale.tickFormat = function(m) {
    var n = Math.max(0, -Math.floor(Math.log(tickRange(m).step) / Math.LN10 + .01));
    return d3.format(",." + n + "f");
  };

  return scale;
};
