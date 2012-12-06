d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[x.length - 1];
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.ticks = function(m) {
    if (i <= 0) return [];
    // produce nice tick values (erase the long decimal tails due to floating point calc inaccuracy),
    // x1 is not inclusive
    return d3.range(x0, x1 - 0.5 / kx, 1.0 / kx).map(function(x, i) {
      // heuristic: round to 3 extra digits to remove FP calc inaccuracy
      var p = d3_format_precision(x, 4);
      var v = d3.round(x, p);
      return v;
    });
  };

  scale.rangeBand = function() {
    return kx;
  }

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  return rescale();
}
