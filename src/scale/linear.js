d3.scale.linear = function() {
  var x0 = 0,
      x1 = 1,
      y0 = 0,
      y1 = 1,
      kx = 1 / (x1 - x0),
      ky = (x1 - x0) / (y1 - y0),
      i = d3.interpolate(y0, y1);

  function scale(x) {
    return i((x - x0) * kx);
  }

  scale.invert = function(y) {
    return (y - y0) * ky + x0; // TODO assumes number?
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    kx = 1 / (x1 - x0);
    ky = (x1 - x0) / (y1 - y0);
    return scale;
  };

  /** @param {*=} x */
  scale.range = function(x) {
    if (!arguments.length) return [y0, y1];
    y0 = x[0];
    y1 = x[1];
    ky = (x1 - x0) / (y1 - y0);
    i = d3.interpolate(y0, y1); // TODO allow override?
    return scale;
  };

  // TODO Dates? Ugh.
  function tickRange(m) {
    var start = Math.min(x0, x1),
        stop = Math.max(x0, x1),
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
