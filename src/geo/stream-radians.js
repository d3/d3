function d3_geo_streamRadians(stream) {
  return d3_geo_streamTransform(stream, function(x, y) {
    stream.point(x * d3_radians, y * d3_radians);
  });
}
