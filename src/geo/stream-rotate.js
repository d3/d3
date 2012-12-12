function d3_geo_streamRotate(rotate, stream) {
  return d3_geo_streamTransform(stream, function(x, y) {
    x = rotate(x, y);
    stream.point(x[0], x[1]);
  });
}
