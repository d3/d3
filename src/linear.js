d3.linear = function() {
  var x0 = 0,
      x1 = 1,
      y0 = 0,
      y1 = 1,
      k = 1 / (x1 - x0),
      i = d3.interpolate(y0, y1);

  function scale(x) {
    return i((x - x0) * k);
  }

  scale.invert = function(x) {
    return (x - y0) / k + x0; // TODO assumes number?
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    k = 1 / (x1 - x0);
    return scale;
  };

  /** @param {*=} x */
  scale.range = function(x) {
    if (!arguments.length) return [y0, y1];
    y0 = x[0];
    y1 = x[1];
    i = d3.interpolate(y0, y1); // TODO allow override?
    return scale;
  };

  return scale;
};
