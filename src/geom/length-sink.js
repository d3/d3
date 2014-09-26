import "../core/noop";
import "geom";

d3.geom.lengthSink = function() {
  var x00,
      y00,
      x0,
      y0,
      sum = 0;

  var sink = {
    point: d3_noop,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: polygonStart,
    polygonEnd: polygonEnd,
    value: value
  };

  function pointLineStart(x, y) {
    x00 = x0 = x;
    y00 = y0 = y;
    sink.point = pointLine;
  }

  function pointLine(x, y) {
    var dx = x - x0,
        dy = y - y0;
    x0 = x;
    y0 = y;
    sum += Math.sqrt(dx * dx + dy * dy);
  }

  function lineStart() {
    sink.point = pointLineStart;
  }

  function lineEnd() {
    x00 = y00 = x0 = y0 = undefined;
    sink.point = d3_noop;
  }

  function lineEndPolygon() {
    pointLine(x00, y00);
    lineEnd();
  }

  function polygonStart() {
    sink.lineEnd = lineEndPolygon;
  }

  function polygonEnd() {
    sink.lineEnd = lineEnd;
  }

  function value() {
    var value = sum;
    sum = 0;
    return value;
  }

  return sink;
};
