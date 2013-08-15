import "geo";
import "stream";

d3.geo.simplify = function() {
  var importance = 1, simplify = {
    stream: function(stream) {
      return d3_geo_streamTransform(stream, function(x, y, z) {
        if (z >= importance) stream.point(x, y);
      });
    },
    importance: function(_) {
      if (!arguments.length) return importance;
      importance = +_;
      return simplify;
    }
  };
  return simplify;
};
