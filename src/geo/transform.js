import "geo";
import "../core/array";

d3.geo.transform = function(methods) {
  return {
    stream: function(stream) {
      var transform = new d3_geo_transform(stream);
      for (var k in methods) transform[k] = methods[k];
      return transform;
    }
  };
};

function d3_geo_transform(stream) {
  this.stream = stream;
}

d3_geo_transform.prototype = {
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};
