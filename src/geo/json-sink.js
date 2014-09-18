import "../math/trigonometry";
import "geo";

// TODO support things besides polygons
d3.geo.jsonSink = function() {
  var value = {type: "MultiPolygon", coordinates: []},
      polygon,
      line;
  return {
    polygonStart: function() { value.coordinates.push(polygon = []); },
    polygonEnd: function() {},
    lineStart: function() { polygon.push(line = []); },
    lineEnd: function() { line.push(line[0]); },
    point: function(λ, φ) { line.push([λ * d3_degrees, φ * d3_degrees]); },
    value: function() {
      var oldValue = value;
      value = {type: "MultiPolygon", coordinates: []};
      return oldValue;
    }
  };
};
