function d3_geo_pathBuffer() {
  var pointCircle = d3_geo_pathCircle(4.5),
      buffer = [];

  var stream = {
    point: point,

    // While inside a line, override point to moveTo then lineTo.
    lineStart: function() { stream.point = pointLineStart; },
    lineEnd: lineEnd,

    // While inside a polygon, override lineEnd to closePath.
    polygonStart: function() { stream.lineEnd = lineEndPolygon; },
    polygonEnd: function() { stream.lineEnd = lineEnd; stream.point = point; },

    pointRadius: function(_) {
      pointCircle = d3_geo_pathCircle(_);
      return stream;
    },

    result: function() {
      if (buffer.length) {
        var result = buffer.join("");
        buffer = [];
        return result;
      }
    }
  };

  function point(x, y) {
    buffer.push("M", x, ",", y, pointCircle);
  }

  function pointLineStart(x, y) {
    buffer.push("M", x, ",", y);
    stream.point = pointLine;
  }

  function pointLine(x, y) {
    buffer.push("L", x, ",", y);
  }

  function lineEnd() {
    stream.point = point;
  }

  function lineEndPolygon() {
    buffer.push("Z");
  }

  return stream;
}
