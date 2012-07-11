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
    normal = cartesian(arc.source(), [0, 0, 0]);
    var abs = normal.map(Math.abs),
        unit = abs[0] < abs[1] && abs[0] < abs[2] ? [1, 0, 0]
             : abs[1] < abs[0] && abs[1] < abs[2] ? [0, 1, 0]
             : [0, 0, 1];
    center = scale(normal, cr);
    reference = cross(normal, unit);
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
          tmp = intersect(point, point0, d1, d0);
        } else {
          // inside going out
          var segment = coordinates.slice(j, i);
          if (tmp) segment.unshift(tmp);
          tmp = null;
          segment.push(intersect(point0, point, d0, d1));
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
  function intersect(a, b, d0, d1) {
    var pa = cartesian(a, [0, 0, 0]),
        pb = cartesian(b, [0, 0, 0]);
    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 x n2).
    var n1 = normal,
        n2 = cross(pa, pb),
        d1 = dot(n1, center),
        d2 = 0,
        n1n1 = dot(n1, n1),
        n2n2 = dot(n2, n2),
        n1n2 = dot(n1, n2),
        determinant = n1n1 * n2n2 - n1n2 * n1n2,
        c1 = (d1 * n2n2 - d2 * n1n2) / determinant,
        c2 = (d2 * n1n1 - d1 * n1n2) / determinant,
        n1xn2 = cross(n1, n2),
        A = scale(n1, c1),
        B = scale(n2, c2);
    add(A, B);
    // Now solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = dot(A, u),
        uu = dot(u, u),
        t = Math.sqrt(w * w - uu * (dot(A, A) - 1)),
        q = scale(u, (-w - t) / uu);
    add(q, A);
    return geo.apply(null, q);
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
        var b = {xyz: cartesian(p1, center), points: []},
            a = {xyz: cartesian(p0, center), points: segment, other: b};
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

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]];
  }

  function add(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }

  function scale(vector, s) {
    return [vector[0] * s, vector[1] * s, vector[2] * s];
  }

  function magnitude(d) {
    return Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  }

  function normalize(d) {
    var l = magnitude(d);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }

  // Signed angle of one line relative to another.
  function angle(a, b) {
    normalize(a);
    normalize(b);
    var c = cross(b, a),
        angle = Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
    return ((dot(c, normal) < 0 ? -angle : angle) + 2 * Math.PI) % (2 * Math.PI);
  }

  // Convert to Cartesian 3-space, relative to circle center.
  function cartesian(point, center) {
    var p0 = point[0] * d3_geo_radians,
        p1 = point[1] * d3_geo_radians,
        c1 = Math.cos(p1),
        x = c1 * Math.cos(p0) - center[0],
        y = c1 * Math.sin(p0) - center[1],
        z = Math.sin(p1) - center[2];
    return [x, y, z];
  }

  function geo(x, y, z) {
    return [
      Math.atan2(y, x) / d3_geo_radians,
      Math.asin(z) / d3_geo_radians
    ];
  }

  function interpolate(from, to) {
    if (from < to) from += 2 * Math.PI;
    var result = [],
        v = cross(normal, reference),
        u0 = reference[0],
        u1 = reference[1],
        u2 = reference[2],
        v0 = v[0],
        v1 = v[1],
        v2 = v[2];
    for (var step = precision * d3_geo_radians, t = from; t > to; t -= step) {
      var c = Math.cos(t),
          s = Math.sin(t);
      result.push(geo(
        center[0] + sr * (c * u0 + s * v0),
        center[1] + sr * (c * u1 + s * v1),
        center[2] + sr * (c * u2 + s * v2)
      ));
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
