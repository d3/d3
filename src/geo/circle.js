d3.geo.circle = function() {
  var origin = [0, 0],
      degrees = 90,
      clip,
      precision; // deprecated

  function circle() {
    // TODO render a circle as a Polygon
  }

  circle.clip = function(d) {
    var o = typeof origin === "function" ? origin.apply(this, arguments) : origin,
        rotate = d3_geo_rotation(-o[0] * d3_radians, -o[1] * d3_radians, 0);
    clip = d3_geo_circleClip(degrees, function(coordinates) {
      return rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
    });
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
    Point: function(o) { // TODO check
      var d = [];
      clip.point(o.coordinates, d3_geo_circleContext(d));
      return d.length && o;
    },
    MultiPoint: function(o) { // TODO check
      var coordinates = [],
          context = d3_geo_circleContext(coordinates);
      o.coordinates.forEach(function(coordinates) {
        clip.point(coordinates, context);
      });
      return coordinates.length && {
        type: o.type,
        coordinates: coordinates.map(function(lineString) { return lineString[0]; })
      };
    },
    LineString: function(o) {
      var lineStrings = [],
          context = d3_geo_circleContext(lineStrings);
      clip.line(o.coordinates, context);
      return lineStrings.length && (o = Object.create(o), o.type = "MultiLineString", o.coordinates = lineStrings, o);
    },
    MultiLineString: function(o) {
      var lineStrings = [],
          context = d3_geo_circleContext(lineStrings);
      o.coordinates.forEach(function(coordinates) {
        clip.line(coordinates, context);
      });
      return lineStrings.length && (o = Object.create(o), o.coordinates = lineStrings, o);
    },
    Polygon: function(o) {
      var lineStrings = [],
          context = d3_geo_circleContext(lineStrings);
      o.coordinates.forEach(function(coordinates) {
        clip.ring(coordinates, context);
      });
      var polygons = lineStrings.map(function(lineString) { return [lineString]; });
      return polygons.length && (o = Object.create(o), o.type = "MultiPolygon", o.coordinates = polygons, o);
    },
    MultiPolygon: function(o) {
      var lineStrings = [],
          context = d3_geo_circleContext(lineStrings);
      o.coordinates.forEach(function(coordinates) {
        coordinates.forEach(function(coordinates) {
          clip.ring(coordinates, context);
        });
      });
      var polygons = lineStrings.map(function(lineString) { return [lineString]; });
      return polygons.length && (o = Object.create(o), o.type = "MultiPolygon", o.coordinates = polygons, o);
    },
    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType).filter(d3_identity);
      return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
    }
  });

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return degrees;
    degrees = +x;
    return circle;
  };

  // TODO deprecate
  circle.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    return circle;
  }

  return circle;
};

function d3_geo_circleContext(lineStrings) {
  var lineString = null;
  return {
    moveTo: function(x, y) { lineStrings.push(lineString = [x * d3_degrees, y * d3_degrees]); },
    lineTo: function(x, y) { lineString.push([x * d3_degrees, y * d3_degrees]); },
    closePath: function() {}
  };
}

function d3_geo_circleClip(degrees, rotate) {
  var radians = degrees * d3_radians,
      precision = 1,
      normal = [1, 0, 0], // Cartesian normal to the circle origin.
      reference = [0, -1, 0], // Cartesian reference point lying on the circle.
      cr = Math.cos(radians),
      sr = Math.sin(radians),
      center = d3_geo_circleScale(normal, cr); // Cartesian center of the circle.

  return {
    point: function(coordinates, context) {
      if (visible(coordinates = rotate(coordinates))) {
        context.moveTo(coordinates[0], coordinates[1]);
      }
    },
    line: function(coordinates, context) {
      var segments = clipLine(coordinates.map(rotate));
      segments.forEach(function(lineString) {
        var i = 0, n = lineString.length, point = lineString[0];
        context.moveTo(point[0], point[1]);
        while (++i < n) context.lineTo((point = lineString[i])[0], point[1]);
      });
    },
    ring: function(ring, context) {
      var polygons = clipPolygon([ring.map(rotate)], context);
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring) {
          var i = 0, n = ring.length, point = ring[0];
          context.moveTo(point[0], point[1]);
          while (++i < n) context.lineTo((point = ring[i])[0], point[1]);
          context.closePath();
        });
      });
    }
  };

  function visible(point) {
    return Math.cos(point[1]) * Math.cos(point[0]) > cr;
  }

  function clipLine(coordinates) {
    var segments = [],
        inside = visible(coordinates[0]),
        tmp;
    for (var i = 1, j = 0, n = coordinates.length; i < n; i++) {
      var point = coordinates[i],
          v = visible(point);
      if (v !== inside) {
        inside = v;
        var point0 = coordinates[i - 1];
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
  // TODO special case: clipAngle(90°); avoid conversion ↔ Cartesian 3-space.
  function intersect(a, b) {
    var pa = d3_geo_circleCartesian(a, [0, 0, 0]),
        pb = d3_geo_circleCartesian(b, [0, 0, 0]);
    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 x n2).
    var n1 = [1, 0, 0], // normal
        n2 = d3_geo_circleCross(pa, pb),
        d1 = center[0], // d3_geo_circleDot(n1, center),
        d2 = 0,
        n1n1 = 1, // d3_geo_circleDot(n1, n1),
        n2n2 = d3_geo_circleDot(n2, n2),
        n1n2 = n2[0], // d3_geo_circleDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;
    // Two polar points.
    if (!determinant) return a;

    var c1 = (d1 * n2n2 - d2 * n1n2) / determinant,
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
  function clipPolygon(coordinates, context) {
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
      intersection.angle = angle(intersection.xyz);
    });
    var start = intersections[0],
        tmp = null;
    intersections.sort(function(a, b) {
      return b.angle - a.angle;
    });
    // Construct circular linked list.
    for (var i = 0; i < intersections.length;) {
      intersections[i].next = intersections[++i % intersections.length];
    }
    while (unvisited) {
      // Look for unvisited entering intersections.
      while (start.visited || !start.other) {
        if (start === tmp) return polygons;
        start = start.next;
      }
      var intersection = start;
      do {
        if (!intersection.other) { unvisited--; break; }
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
      tmp = start;
      start = start.next;
    }
    return polygons;
  }

  // Signed angle from one point to another, relative to the circle center.
  function angle(a) {
    d3_geo_circleNormalize(a);
    var angle = Math.acos(Math.max(-1, Math.min(1, -a[1])));
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI) % (2 * Math.PI);
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
    for (var step = precision * d3_radians, t = from; t > to; t -= step) {
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
};

// Convert spherical (degrees) to normalized Cartesian coordinates, relative to
// a Cartesian origin.
function d3_geo_circleCartesian(point, origin) {
  var p0 = point[0],
      p1 = point[1],
      c1 = Math.cos(p1);
  return [c1 * Math.cos(p0) - origin[0],
          c1 * Math.sin(p0) - origin[1],
          Math.sin(p1) - origin[2]];
}

// Convert from Cartesian to spherical coordinates (in degrees).
function d3_geo_circleSpherical(point) {
  return [
    Math.atan2(point[1], point[0]),
    Math.asin(Math.max(-1, Math.min(1, point[2])))
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
