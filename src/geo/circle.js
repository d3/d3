d3.geo.circle = function() {
  var origin = [0, 0],
      degrees = 90,
      radians = degrees * d3_geo_radians,
      precision = 1, // step size in degrees for interpolated clip edge
      arc = d3.geo.greatArc().source(origin).target(d3_identity),
      clipCircle,
      normal, // Cartesian normal to the circle origin.
      reference, // Cartesian reference point lying on the circle.
      center, // Cartesian center of the circle.
      cr = 0,
      sr = 1,
      x0 = 0,
      y0 = 0,
      sy0 = 0,
      cy0 = 1;

  function circle() {
    // TODO render a circle as a Polygon
  }

  function visible(point) {
    return distance(point) < radians;
  }

  circle.clip = function(d) {
    if (typeof origin === "function") arc.source(origin.apply(this, arguments));
    // Cache origin in Cartesian coordinates for computing relative angles.
    normal = d3_geo_circleCartesian(arc.source(), [0, 0, 0]);
    var abs = normal.map(Math.abs),
        unit = abs[0] < abs[1] && abs[0] < abs[2] ? [1, 0, 0]
             : abs[1] < abs[0] && abs[1] < abs[2] ? [0, 1, 0]
             : [0, 0, 1];
    center = d3_geo_circleScale(normal, cr);
    reference = d3_geo_circleCross(normal, unit);
    x0 = origin[0] * d3_geo_radians;
    cy0 = Math.cos(y0 = origin[1] * d3_geo_radians);
    sy0 = Math.sin(y0);
    return clipType(d) || null;
  };

  var clipType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features.map(clipType).filter(d3_identity);
      return features && (o = Object.create(o), o.features = features, o);
    },

    Feature: function(o) {
      var geometry = clipType(o.geometry);
      return geometry && (o = Object.create(o), o.geometry = geometry, o);
    },

    Point: function(o) {
      return visible(o.coordinates) && o;
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates.filter(visible);
      return coordinates.length && {
        type: o.type,
        coordinates: coordinates
      };
    },

    LineString: function(o) {
      var coordinates = clipLine(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.type = "MultiLineString", o.coordinates = coordinates, o);
    },

    MultiLineString: function(o) {
      var coordinates = d3.merge(o.coordinates.map(clipLine).filter(function(d) { return d.length; }));
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    Polygon: function(o) {
      var coordinates = clipPolygon(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.type = "MultiPolygon", o.coordinates = coordinates, o);
    },

    MultiPolygon: function(o) {
      var coordinates = d3.merge(o.coordinates.map(clipPolygon));
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType).filter(d3_identity);
      return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
    }

  });

  function clipLine(coordinates) {
    var segments = [],
        inside = visible(coordinates[0]),
        tmp;
    for (var i = 1, j = 0, n = coordinates.length; i < n; i++) {
      var point = coordinates[i],
          v = visible(point);
      if (v !== inside) {
        inside = v;
        var point0 = coordinates[i - 1],
            d0 = distance(point0),
            d1 = distance(point);
        if (inside) {
          // outside going in
          tmp = intersect(point, point0);
        } else {
          // inside going out
          var segment = coordinates.slice(j, i);
          if (tmp) segment.unshift(tmp);
          tmp = null;
          segment.push(intersect(point0, point));
          segments.push(segment);
        }
        j = i;
      }
    }
    if (inside && (j < i || tmp)) {
      var segment = coordinates.slice(j, i);
      if (tmp) segment.unshift(tmp);
      segments.push(segment);
    }
    return segments;
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b) {
    var pa = d3_geo_circleCartesian(a, [0, 0, 0]),
        pb = d3_geo_circleCartesian(b, [0, 0, 0]);
    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 x n2).
    var n1 = normal,
        n2 = d3_geo_circleCross(pa, pb),
        d1 = d3_geo_circleDot(n1, center),
        d2 = 0,
        n1n1 = d3_geo_circleDot(n1, n1),
        n2n2 = d3_geo_circleDot(n2, n2),
        n1n2 = d3_geo_circleDot(n1, n2),
        determinant = n1n1 * n2n2 - n1n2 * n1n2,
        c1 = (d1 * n2n2 - d2 * n1n2) / determinant,
        c2 = (d2 * n1n1 - d1 * n1n2) / determinant,
        n1xn2 = d3_geo_circleCross(n1, n2),
        A = d3_geo_circleScale(n1, c1),
        B = d3_geo_circleScale(n2, c2);
    d3_geo_circleAdd(A, B);
    // Now solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = d3_geo_circleDot(A, u),
        uu = d3_geo_circleDot(u, u),
        t = Math.sqrt(w * w - uu * (d3_geo_circleDot(A, A) - 1)),
        q = d3_geo_circleScale(u, (-w - t) / uu);
    d3_geo_circleAdd(q, A);
    return d3_geo_circleSpherical(q);
  }

  // Returns an array of polygons. Each polygon is an array of rings. The first
  // ring is the exterior, subsequent rings are holes.
  function clipPolygon(coordinates) {
    var polygons = [],
        ring = [],
        unvisited = 0, // number of unvisited entering intersections
        intersections = [];
    // Clip each ring into segments.
    var segments = [];
    coordinates.forEach(function(ring) {
      var ringSegments = clipLine(ring);
      // Since these are closed rings, we join segments if necessary.
      var n = ringSegments.length;
      if (n > 1) {
        var firstSegment = ringSegments[0],
            lastSegment = ringSegments[n - 1],
            p0 = firstSegment[0],
            p1 = lastSegment[lastSegment.length - 1];
        if (p0[0] === p1[0] && p0[1] === p1[1]) {
          ringSegments.shift();
          ringSegments.pop();
          ringSegments.push(lastSegment.concat(firstSegment));
        }
      }
      segments = segments.concat(ringSegments);
    });
    // Create a circular linked list using the intersected segment start and
    // end points, sorted by relative angles.
    segments.forEach(function(segment) {
      var p0 = segment[0],
          p1 = segment[segment.length - 1];
      if (p0[0] !== p1[0] || p0[1] !== p1[1]) {
        var b = {xyz: d3_geo_circleCartesian(p1, center), points: []},
            a = {xyz: d3_geo_circleCartesian(p0, center), points: segment, other: b};
        intersections.push(a, b);
        unvisited++;
      } else {
        // TODO attach subsumed holes to the correct Polygons. For now, we can
        // add these as separate Polygons, since typically we draw everything
        // as a subpath in SVG so it doesn't matter if the holes don't match
        // their polygons. This would be done by calculating some kind of
        // winding number.
        polygons.push([segment]);
      }
    });
    if (!unvisited) return polygons;
    // Sort intersection points by relative angles.
    intersections.forEach(function(intersection, i) {
      intersection.angle = angle(intersection.xyz, reference);
    });
    var start = intersections[0];
    intersections.sort(function(a, b) {
      return b.angle - a.angle;
    });
    // Construct circular linked list.
    for (var i = 0; i < intersections.length;) {
      intersections[i].next = intersections[++i % intersections.length];
    }
    while (unvisited) {
      // Look for unvisited entering intersections.
      while (start.visited || !start.other) start = start.next;
      var intersection = start;
      do {
        intersection.visited = true;
        ring = ring.concat(intersection.points);
        intersection = intersection.other;
        var from = intersection.angle;
        intersection = intersection.next;
        var to = intersection.angle;
        ring = ring.concat(interpolate(from, to));
        unvisited--;
      } while (intersection !== start);
      if (ring.length) {
        polygons.push([ring]);
        ring = [];
      }
      start = start.next;
    }
    return polygons;
  }

  // Distance from the origin to a point. Copied from d3.geo.greatArc for
  // speed.
  function distance(point) {
    var x1 = point[0] * d3_geo_radians,
        y1 = point[1] * d3_geo_radians;
    return Math.acos(Math.max(-1, Math.min(1, sy0 * Math.sin(y1) + cy0 * Math.cos(y1) * Math.cos(x1 - x0))));
  }

  // Signed angle from one point to another, relative to the circle center.
  function angle(a, b) {
    d3_geo_circleNormalize(a);
    d3_geo_circleNormalize(b);
    var c = d3_geo_circleCross(b, a),
        angle = Math.acos(Math.max(-1, Math.min(1, d3_geo_circleDot(a, b))));
    return ((d3_geo_circleDot(c, normal) < 0 ? -angle : angle) + 2 * Math.PI) % (2 * Math.PI);
  }

  function interpolate(from, to) {
    if (from < to) from += 2 * Math.PI;
    var result = [],
        v = d3_geo_circleCross(normal, reference),
        u0 = reference[0],
        u1 = reference[1],
        u2 = reference[2],
        v0 = v[0],
        v1 = v[1],
        v2 = v[2];
    for (var step = precision * d3_geo_radians, t = from; t > to; t -= step) {
      var c = Math.cos(t),
          s = Math.sin(t);
      result.push(d3_geo_circleSpherical([
        center[0] + sr * (c * u0 + s * v0),
        center[1] + sr * (c * u1 + s * v1),
        center[2] + sr * (c * u2 + s * v2)
      ]));
    }
    return result;
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    if (typeof origin !== "function") arc.source(origin);
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return degrees;
    radians = (degrees = +x) * d3_geo_radians;
    cr = Math.cos(radians);
    sr = Math.sin(radians);
    return circle;
  };

  return d3.rebind(circle, arc, "precision");
}

// Convert spherical (degrees) to normalized Cartesian coordinates, relative to
// a Cartesian origin.
function d3_geo_circleCartesian(point, origin) {
  var p0 = point[0] * d3_geo_radians,
      p1 = point[1] * d3_geo_radians,
      c1 = Math.cos(p1);
  return [c1 * Math.cos(p0) - origin[0],
          c1 * Math.sin(p0) - origin[1],
          Math.sin(p1) - origin[2]];
}

// Convert from Cartesian to spherical coordinates (in degrees).
function d3_geo_circleSpherical(point) {
  return [
    Math.atan2(point[1], point[0]) / d3_geo_radians,
    Math.asin(point[2]) / d3_geo_radians
  ];
}

function d3_geo_circleDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function d3_geo_circleCross(a, b) {
  return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]];
}

function d3_geo_circleAdd(a, b) {
  a[0] += b[0];
  a[1] += b[1];
  a[2] += b[2];
}

function d3_geo_circleScale(vector, s) {
  return [vector[0] * s, vector[1] * s, vector[2] * s];
}

function d3_geo_circleNormalize(d) {
  var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l;
  d[1] /= l;
  d[2] /= l;
}
