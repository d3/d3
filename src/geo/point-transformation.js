function d3_geo_pointTransformation(sink, point) {
  return {
    sphere: function() { sink.sphere(); },
    polygonStart: function() { sink.polygonStart(); },
    polygonEnd: function() { sink.polygonEnd(); },
    lineStart: function() { sink.lineStart(); },
    lineEnd: function() { sink.lineEnd(); },
    point: point
  };
}
