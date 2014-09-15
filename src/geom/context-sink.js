import "../math/trigonometry";

d3.geom.contextSink = function(pointRadius, context) {
  if (arguments.length < 2) context = pointRadius, pointRadius = 4.5;

  var sink = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: polygonStart,
    polygonEnd: polygonEnd
  };

  function point(x, y) {
    context.moveTo(x, y);
    context.arc(x, y, pointRadius, 0, τ);
  }

  function pointLineStart(x, y) {
    context.moveTo(x, y);
    sink.point = pointLine;
  }

  function pointLine(x, y) {
    context.lineTo(x, y);
  }

  function lineStart() {
    sink.point = pointLineStart;
  }

  function lineEnd() {
    sink.point = point;
  }

  function lineEndPolygon() {
    context.closePath();
  }

  function polygonStart() {
    sink.lineEnd = lineEndPolygon;
  }

  function polygonEnd() {
    sink.lineEnd = lineEnd;
    sink.point = point;
  }

  return sink;
};
