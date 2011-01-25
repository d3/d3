d3.scale.quantize = function() {
  var x0 = 0,
      x1 = 1,
      kx = 2,
      i = 1,
      range = [0, 1];

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    kx = range.length / (x1 - x0);
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  };

  return scale;
};
