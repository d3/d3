import "geom";

d3.geom.pathSink = function(pointRadius) {
  var buffer = [], pointCircle = "m0," + pointRadius
      + "a" + pointRadius + "," + pointRadius + " 0 1,1 0," + -2 * pointRadius
      + "a" + pointRadius + "," + pointRadius + " 0 1,1 0," + 2 * pointRadius
      + "z";

  var sink = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: polygonStart,
    polygonEnd: polygonEnd,
    value: value
  };

  function point(x, y) {
    buffer.push("M", x, ",", y, pointCircle);
  }

  function pointLineStart(x, y) {
    buffer.push("M", x, ",", y);
    sink.point = pointLine;
  }

  function pointLine(x, y) {
    buffer.push("L", x, ",", y);
  }

  function lineStart() {
    sink.point = pointLineStart;
  }

  function lineEnd() {
    sink.point = point;
  }

  function lineEndPolygon() {
    buffer.push("Z");
  }

  function polygonStart() {
    sink.lineEnd = lineEndPolygon;
  }

  function polygonEnd() {
    sink.lineEnd = lineEnd;
    sink.point = point;
  }

  function value() {
    if (buffer.length) {
      var value = buffer.join("");
      buffer = [];
      return value;
    }
  }

  return sink;
};
