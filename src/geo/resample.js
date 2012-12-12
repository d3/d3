function d3_geo_resample(projectPoint) {
  var δ2 = .5, // precision, px²
      maxDepth = 16;

  // TODO rename: this is not just resampling, it also projects and transforms!
  var resample = d3_geo_type({
    Point: function(o) {
      o.coordinates = resamplePoint(o.coordinates);
    },
    MultiPoint: function(o) {
      o.coordinates = o.coordinates.map(resamplePoint);
    },
    LineString: function(o) {
      o.coordinates = resampleLine(o.coordinates);
    },
    MultiLineString: function(o) {
      o.coordinates = o.coordinates.map(resampleLine);
    },
    Polygon: function(o) {
      o.coordinates = resamplePolygon(o.coordinates);
    },
    MultiPolygon: function(o) {
      o.coordinates = o.coordinates.map(resamplePolygon);
    }
  });

  resample.precision = function(_) {
    if (!arguments.length) return Math.sqrt(δ2);
    maxDepth = (δ2 = _ * _) > 0 && 16;
    return resample;
  };

  return resample;

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resamplePoint(point) {
    return projectPoint(point[0], point[1]);
  }

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resampleLine(coordinates) {
    if (!(n = coordinates.length)) return coordinates;
    var n,
        i = 0,
        p = coordinates[0],
        λ,
        φ,
        λ0,
        cartesian = d3_geo_cartesian(p),
        line = [p = projectPoint(λ0 = p[0], φ = p[1])],
        x0 = p[0],
        y0 = p[1],
        a0 = cartesian[0],
        b0 = cartesian[1],
        c0 = cartesian[2];
    while (++i < n) {
      p = coordinates[i];
      cartesian = d3_geo_cartesian(p);
      p = projectPoint(λ = p[0], φ = p[1]);
      resampleLineTo(x0, y0, λ0, a0, b0, c0,
                     x0 = p[0], y0 = p[1], λ0 = λ, a0 = cartesian[0], b0 = cartesian[1], c0 = cartesian[2],
                     maxDepth, line);
      line.push([x0, y0]);
    }
    return line;
  }

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resamplePolygon(coordinates) {
    return coordinates.map(resampleLine);
  }

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, line) {
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
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a, b, c, depth, line);
        line.push([x2, y2]);
        resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, line);
      }
    }
  }
}
