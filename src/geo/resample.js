function d3_geo_resample(projectPoint) {
  var δ2 = .5, // precision, px²
      maxDepth = 16;

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resample(listener) {
    var resample = {
      point: resamplePoint,
      lineStart: function() { x0 = NaN; resample.point = resamplePointLine; listener.lineStart(); },
      lineEnd: function() { resample.point = resamplePoint; listener.lineEnd(); },
      // TODO resample last point to first point for polygon rings.
      polygonStart: function() { listener.polygonStart(); },
      polygonEnd: function() { listener.polygonEnd(); },
      sphere: d3_noop
    };

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
          // TODO handle distortions near poles
          λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a),
          p = projectPoint(λ2, φ2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x0 - x2,
          dy2 = y0 - y2,
          dz = dx * dy2 - dy * dx2;
      if (dz * dz / distance2 > δ2) {
        a /= m;
        b /= m;
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a, b, c, depth, listener);
        listener.point(x2, y2);
        resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, listener);
      }
    }
  }
}
