function d3_geo_resample(projectPoint) {
  var δ2 = .5, // precision, px²
      maxDepth = 16;

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resample(listener) {
    var resample = {
      point: resamplePoint,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        listener.polygonStart();
        resample.lineStart = ringStart;
      },
      polygonEnd: function() { listener.polygonEnd(); },
      sphere: d3_noop
    };

    function lineStart() {
      x0 = NaN;
      resample.point = resamplePointLine;
      listener.lineStart();
    }

    function lineEnd() {
      resample.point = resamplePoint;
      listener.lineEnd();
    }

    function ringStart() {
      var λ00, φ00; // first point

      lineStart();
      resample.point = function(λ, φ) {
        resamplePointLine(λ00 = λ, φ00 = φ);
        resample.point = resamplePointLine;
      };
      resample.lineEnd = function() {
        var cartesian = d3_geo_cartesian([λ00, φ00]),
            p = projectPoint(λ00, φ00);
        resampleLineTo(x0, y0, λ0, a0, b0, c0,
                       p[0], p[1], λ00, cartesian[0], cartesian[1], cartesian[2],
                       maxDepth, listener);
        resample.lineEnd = lineEnd;
        lineEnd();
      };
    }

    // TODO rename: this is not just resampling, it also projects and transforms!
    function resamplePoint(λ, φ) {
      var point = projectPoint(λ, φ);
      listener.point(point[0], point[1]);
    }

    var λ0,
        x0,
        y0,
        a0,
        b0,
        c0;

    // TODO rename: this is not just resampling, it also projects and transforms!
    function resamplePointLine(λ, φ) {
      var cartesian = d3_geo_cartesian([λ, φ]),
          p = projectPoint(λ, φ);
      resampleLineTo(x0, y0, λ0, a0, b0, c0,
                     x0 = p[0], y0 = p[1], λ0 = λ, a0 = cartesian[0], b0 = cartesian[1], c0 = cartesian[2],
                     maxDepth, listener);
      listener.point(x0, y0);
    }

    return resample;
  }

  resample.precision = function(_) {
    if (!arguments.length) return Math.sqrt(δ2);
    maxDepth = (δ2 = _ * _) > 0 && 16;
    return resample;
  };

  return resample;

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, listener) {
    var dx = x1 - x0,
        dy = y1 - y0,
        distance2 = dx * dx + dy * dy;
    if (distance2 > 4 * δ2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = Math.sqrt(a * a + b * b + c * c),
          φ2 = Math.asin(c /= m),
          λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a),
          p = projectPoint(λ2, φ2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / distance2 > δ2 || (Math.abs((dx * dx2 + dy * dy2) / distance2 - .5) > .4)) {
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, listener);
        listener.point(x2, y2);
        resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, listener);
      }
    }
  }
}
