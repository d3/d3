import "../math/abs";
import "../math/trigonometry";
import "cartesian";

function d3_geo_resample(project) {
  var delta2 = .5, // precision, px²
      cosMinDistance = Math.cos(30 * d3_radians), // cos(minimum angular distance)
      maxDepth = 16;

  function resample(stream) {
    return (maxDepth ? resampleRecursive : resampleNone)(stream);
  }

  function resampleNone(stream) {
    return d3_geo_transformPoint(stream, function(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    });
  }

  function resampleRecursive(stream) {
    var lambda00, phi00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resample = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resample.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resample.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resample.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = d3_geo_cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resample.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resample.point = ringPoint;
      resample.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi00 = phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resample.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resample.lineEnd = lineEnd;
      lineEnd();
    }

    return resample;
  }

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = Math.sqrt(a * a + b * b + c * c),
          phi2 = Math.asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : Math.atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }

  resample.precision = function(_) {
    if (!arguments.length) return Math.sqrt(delta2);
    maxDepth = (delta2 = _ * _) > 0 && 16;
    return resample;
  };

  return resample;
}
