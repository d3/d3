import "../core/noop";
import "geom";

d3.geom.boundsSink = function() {
  var x0 = Infinity,
      y0 = x0,
      x1 = -x0,
      y1 = -x0;
  return {
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop,
    point: function(x, y) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    },
    value: function() {
      var value = [[x0, y0], [x1, y1]];
      x0 = Infinity, y0 = x0, x1 = -x0, y1 = -x0;
      return value;
    }
  };
};
