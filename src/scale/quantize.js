import "../arrays/range";
import "../arrays/map";
import "scale";

d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;
  var rangeIndex = new d3_Map;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    var j = range.length;
    kx = j / (x1 - x0);
    i = j - 1;
    while (--j >= 0) rangeIndex.set(range[j], j);
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

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  scale.invertExtent = function(y) {
    y = rangeIndex.get(y);
    return [y      / kx + x0,
           (y + 1) / kx + x0];
  };

  return rescale();
}
