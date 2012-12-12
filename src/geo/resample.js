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
        line = [p = projectPoint(λ0 = p[0], φ = p[1])],
        sinφ0 = Math.sin(φ),
        cosφ0 = Math.cos(φ),
        x0 = p[0],
        y0 = p[1];
    while (++i < n) {
      p = coordinates[i];
      p = projectPoint(λ = p[0], φ = p[1]);
      resampleLineTo(x0, y0, λ0, sinφ0, cosφ0,
                     x0 = p[0], y0 = p[1], λ0 = λ, sinφ0 = Math.sin(φ), cosφ0 = Math.cos(φ),
                     maxDepth, line);
      line.push([x0, y0]);
    }
    return line;
  }

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resamplePolygon(coordinates) {
    var n = coordinates.length,
        i = -1,
        polygon = [],
        ring,
        resampled,
        l,
        m,
        p;
    while (++i < n) {
      polygon.push(resampled = resampleLine(ring = coordinates[i]));
      m = ring.length - 1;
      l = resampled.length - 1;
      resampleLineTo(
          (p = ring[0])[0], p[1], (p = resampled[0])[0], Math.sin(p[1]), Math.cos(p[1]),
          (p = ring[m])[0], p[1], (p = resampled[l])[0], Math.sin(p[1]), Math.cos(p[1]),
          maxDepth, ring);
    }
    return polygon;
  }

  // TODO rename: this is not just resampling, it also projects and transforms!
  function resampleLineTo(x0, y0, λ0, sinφ0, cosφ0, x1, y1, λ1, sinφ1, cosφ1, depth, line) {
    var dx = x1 - x0,
        dy = y1 - y0,
        distance2 = dx * dx + dy * dy;
    if (distance2 > 4 * δ2 && depth--) {
      var cosΩ = sinφ0 * sinφ1 + cosφ0 * cosφ1 * Math.cos(λ1 - λ0),
          k = 1 / (Math.SQRT2 * Math.sqrt(1 + cosΩ)),
          x = k * (cosφ0 * Math.cos(λ0) + cosφ1 * Math.cos(λ1)),
          y = k * (cosφ0 * Math.sin(λ0) + cosφ1 * Math.sin(λ1)),
          z = Math.max(-1, Math.min(1, k * (sinφ0 + sinφ1))),
          φ2 = Math.asin(z),
          zε = Math.abs(Math.abs(z) - 1),
          λ2 = zε < ε || zε < εε && (Math.abs(cosφ0) < εε || Math.abs(cosφ1) < εε)
             ? (λ0 + λ1) / 2 : Math.atan2(y, x),
          p = projectPoint(λ2, φ2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x0 - x2,
          dy2 = y0 - y2,
          dz = dx * dy2 - dy * dx2;
      if (dz * dz / distance2 > δ2) {
        var cosφ2 = Math.cos(φ2);
        resampleLineTo(x0, y0, λ0, sinφ0, cosφ0, x2, y2, λ2, z, cosφ2, depth, line);
        line.push([x2, y2]);
        resampleLineTo(x2, y2, λ2, z, cosφ2, x1, y1, λ1, sinφ1, cosφ1, depth, line);
      }
    }
  }
}
