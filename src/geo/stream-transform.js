function d3_geo_streamTransform(stream, point) {
  return {
    point: point,
    sphere: stream.sphere,
    lineStart: stream.lineStart,
    lineEnd: stream.lineEnd,
    polygonStart: stream.polygonStart,
    polygonEnd: stream.polygonEnd
  };
}
