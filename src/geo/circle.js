d3.geo.circle = function() {
  var origin = [0, 0],
      degrees,
      clip,
      precision = 6 * d3_radians,
      rotate,
      interpolate;

  function circle(d) {
    var o = typeof origin === "function" ? origin.apply(this, arguments) : origin;
    rotate = d3_geo_rotation(-o[0] * d3_radians, -o[1] * d3_radians, 0);
    var rings = [[]];
        context = bufferContext(rings);
    d3_geo_circleInterpolateCircle(interpolate, context);
    context.closePath();
    return {
      type: "Polygon",
      coordinates: rings
    };
  }

  circle.clip = function(d) {
    var o = typeof origin === "function" ? origin.apply(this, arguments) : origin;
    rotate = d3_geo_rotation(-o[0] * d3_radians, -o[1] * d3_radians, 0);
    clip = d3_geo_circleClip(degrees, function(coordinates) {
      return rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
    });
    return clipType.object(d) || null;
  };

  var clipType = d3_geo_type({
    FeatureCollection: function(o) {
      var features = o.features.map(clipType.Feature, clipType).filter(d3_identity);
      return features && (o = Object.create(o), o.features = features, o);
    },
    Feature: function(o) {
      var geometry = clipType.geometry(o.geometry);
      return geometry && (o = Object.create(o), o.geometry = geometry, o);
    },
    Point: function(o) { // TODO check
      var d = [];
      clip.point(o.coordinates, bufferContext(d));
      return d.length && o;
    },
    MultiPoint: function(o) { // TODO check
      var coordinates = [],
          context = bufferContext(coordinates);
      o.coordinates.forEach(function(coordinates) {
        clip.point(coordinates, context);
      });
      return coordinates.length && (o = Object.create(o),
          o.coordinates = coordinates.map(function(lineString) { return lineString[0]; }), o);
    },
    LineString: function(o) {
      var lineStrings = [],
          context = bufferContext(lineStrings);
      clip.line(o.coordinates, context);
      return lineStrings.length && (o = Object.create(o), o.type = "MultiLineString", o.coordinates = lineStrings, o);
    },
    MultiLineString: function(o) {
      var lineStrings = [],
          context = bufferContext(lineStrings);
      o.coordinates.forEach(function(coordinates) {
        clip.line(coordinates, context);
      });
      return lineStrings.length && (o = Object.create(o), o.coordinates = lineStrings, o);
    },
    Polygon: function(o) {
      var lineStrings = [];
      clip.polygon(o.coordinates, bufferContext(lineStrings));
      var polygons = lineStrings.map(function(lineString) { return [lineString]; });
      return polygons.length && (o = Object.create(o), o.type = "MultiPolygon", o.coordinates = polygons, o);
    },
    MultiPolygon: function(o) {
      var lineStrings = [],
          context = bufferContext(lineStrings);
      o.coordinates.forEach(function(coordinates) {
        clip.polygon(coordinates, context);
      });
      var polygons = lineStrings.map(function(lineString) { return [lineString]; });
      return polygons.length && (o = Object.create(o), o.coordinates = polygons, o);
    },
    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType.geometry, clipType).filter(d3_identity);
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
    interpolate = d3_geo_circleInterpolate((degrees = +x) * d3_radians, precision);
    return circle;
  };

  circle.precision = function(_) {
    if (!arguments.length) return precision;
    interpolate = d3_geo_circleInterpolate(radians, precision = _ * d3_radians);
    return circle;
  }

  return circle.angle(90);

  function bufferContext(lineStrings) {
    var lineString = lineStrings[0];
    return {
      moveTo: function(λ, φ) {
        var point = rotate.invert(λ, φ);
        point[0] *= d3_degrees;
        point[1] *= d3_degrees;
        lineStrings.push(lineString = [point]);
      },
      lineTo: function(λ, φ) {
        var point = rotate.invert(λ, φ);
        point[0] *= d3_degrees;
        point[1] *= d3_degrees;
        lineString.push(point);
      },
      closePath: function() {
        if (lineString.length) lineString.push(lineString[0]);
      }
    };
  }
};

function d3_geo_circleClip(degrees, rotate) {
  var radians = degrees * d3_radians,
      normal = [1, 0, 0], // Cartesian normal to the circle origin.
      reference = [0, -1, 0], // Cartesian reference point lying on the circle.
      cr = Math.cos(radians),
      sr = Math.sin(radians),
      center = d3_geo_circleScale(normal, cr), // Cartesian center of the circle.
      angle = d3_geo_circleAngle(center),
      interpolate = d3_geo_circleInterpolate(radians, 6 * d3_radians);

  return {
    point: function(coordinates, context) {
      if (visible(coordinates = rotate(coordinates))) {
        context.point(coordinates[0], coordinates[1]);
      }
    },
    line: function(coordinates, context) {
      clipLine(coordinates, context);
    },
    polygon: function(polygon, context) {
      d3_geo_circleClipPolygon(polygon, context, clipLine, interpolate, angle);
    }
  };

  function visible(point) {
    return Math.cos(point[1]) * Math.cos(point[0]) > cr;
  }

  // TODO two invisible endpoints with visible intermediate segment.
  function clipLine(coordinates, context, winding) {
    if (!(n = coordinates.length)) return;
    var point0 = rotate(coordinates[0]),
        inside = visible(point0),
        keepWinding = inside && winding != null,
        n;
    if (inside) context.moveTo(point0[0], point0[1]);
    for (var i = 1; i < n; i++) {
      var point1 = rotate(coordinates[i]),
          v = visible(point1);
      if (v !== inside) {
        keepWinding = false;
        if (inside = v) {
          // outside going in
          point0 = intersect(point1, point0);
          context.moveTo(point0[0], point0[1]);
        } else {
          // inside going out
          point0 = intersect(point0, point1);
          context.lineTo(point0[0], point0[1]);
        }
      } else if (keepWinding) {
        winding += d3_geo_circleWinding(point0, point1);
      }
      if (v) context.lineTo(point1[0], point1[1]);
      point0 = point1;
    }
    return keepWinding && winding;
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
}

function d3_geo_circleInterpolate(radians, precision) {
  var normal = [1, 0, 0],
      reference = [0, -1, 0],
      cr = Math.cos(radians),
      sr = Math.sin(radians),
      center = d3_geo_circleScale(normal, cr); // Cartesian center of the circle.
  return function(from, to, context) {
    from = from.angle;
    to = to.angle;
    if (from < to) from += 2 * Math.PI;
    var v = d3_geo_circleCross(normal, reference),
        u0 = reference[0],
        u1 = reference[1],
        u2 = reference[2],
        v0 = v[0],
        v1 = v[1],
        v2 = v[2];
    for (var step = precision, t = from; t > to; t -= step) {
      var c = Math.cos(t),
          s = Math.sin(t),
          point = d3_geo_circleSpherical([
            center[0] + sr * (c * u0 + s * v0),
            center[1] + sr * (c * u1 + s * v1),
            center[2] + sr * (c * u2 + s * v2)
          ]);
      context.lineTo(point[0], point[1]);
    }
  };
}

function d3_geo_circleClipPolygon(coordinates, context, clipLine, interpolate, angle) {
  var unvisited = 0, // number of unvisited entering intersections
      intersections = [],
      segments = [],
      buffer = d3_geo_circleBufferSegments(clipLine),
      winding = 0;
  coordinates.forEach(function(ring) {
    var x = buffer(ring, context),
        ringSegments = x[1];
    winding += x[0];
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
  if (winding > 0) {
    segments.push(winding = []);
    x = {lineTo: function(x, y) { winding.push([x, y]); }};
    d3_geo_circleInterpolateCircle(interpolate, x);
    winding.push(winding[0]);
  }
  // Create a circular linked list using the intersected segment start and
  // end points, sorted by relative angles.
  // TODO sort by angle first, then set in/out flags.
  segments.forEach(function(segment) {
    var p0 = segment[0],
        p1 = segment[segment.length - 1];
    if (p0[0] !== p1[0] || p0[1] !== p1[1]) {
      var b = {point: p1, angle: angle(p1), points: [], other: null},
          a = {point: p0, angle: angle(p0), points: segment, other: b};
      //b.other = a;
      intersections.push(a, b);
      unvisited++;
    } else {
      // TODO attach subsumed holes to the correct Polygons. For now, we can
      // add these as separate Polygons, since typically we draw everything
      // as a subpath in SVG so it doesn't matter if the holes don't match
      // their polygons. This would be done by calculating some kind of
      // winding number.
      var point = segment[0], n = segment.length - 1, i = 0;
      context.moveTo(point[0], point[1]);
      while (++i < n) context.lineTo((point = segment[i])[0], point[1]);
      context.closePath();
    }
  });
  if (!unvisited) return;
  // Sort intersection points by relative angles.
  var start = intersections[0],
      tmp = null;
  intersections.sort(function(a, b) { return b.angle - a.angle; });
  // Construct circular linked list.
  for (var i = 0; i < intersections.length;) {
    intersections[i].next = intersections[++i % intersections.length];
  }
  while (unvisited) {
    // Look for unvisited entering intersections.
    while (start.visited || !start.other) {
      if (start === tmp) return;
      start = start.next;
    }
    var intersection = start,
        moved = false,
        points,
        point;
    do {
      if (!intersection.other) { unvisited--; break; }
      intersection.visited = true;
      point = (points = intersection.points)[0];
      if (moved) context.lineTo(point[0], point[1]);
      else context.moveTo(point[0], point[1]), moved = true;
      for (var i = 1; i < points.length; i++) context.lineTo((point = points[i])[0], point[1]);
      interpolate(intersection = intersection.other, intersection = intersection.next, context);
      unvisited--;
    } while (intersection !== start);
    if (moved) {
      context.closePath();
      moved = false;
    }
    tmp = start;
    start = start.next;
  }
}

// Signed angle of a cartesian point relative to [0, 0, 0].
function d3_geo_circleAngle(center) {
  return function(point) {
    var a = d3_geo_circleCartesian(point, center);
    d3_geo_circleNormalize(a);
    var angle = Math.acos(Math.max(-1, Math.min(1, -a[1])));
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI) % (2 * Math.PI);
  };
}

// Convert spherical to normalized Cartesian coordinates, relative to a
// Cartesian origin.
function d3_geo_circleCartesian(point, origin) {
  var p0 = point[0],
      p1 = point[1],
      c1 = Math.cos(p1);
  return [c1 * Math.cos(p0) - origin[0],
          c1 * Math.sin(p0) - origin[1],
          Math.sin(p1) - origin[2]];
}

// Convert from Cartesian to spherical coordinates.
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

function d3_geo_circleBufferSegments(f) {
  return function(coordinates, context) {
    var segments = [],
        segment,
        winding = f(coordinates, {
      point: function() {},
      moveTo: function(x, y) { segments.push(segment = [[x, y]]); },
      lineTo: function(x, y) { segment.push([x, y]); },
      closePath: function() {}
    }, 0);
    return [winding, segments];
  };
}

// Based on http://softsurfer.com/Archive/algorithm_0103/algorithm_0103.htm
// Calculates a single winding number step relative to [0, 0].
// TODO optimise stereographic calculation using 3D coordinates.
function d3_geo_circleWinding(p0, p) {
  var c0 = Math.cos(p0[1]),
      k0 = 1 + Math.cos(p0[0]) * c0,
      c = Math.cos(p[1]),
      k = 1 + Math.cos(p[0]) * c;
  p0 = [c0 * Math.sin(p0[0]) / k0, Math.sin(p0[1]) / k0];
  p = [c * Math.sin(p[0]) / k, Math.sin(p[1]) / k];
  if (p0[1] <= 0) {
    if (p[1] >  0 && (p0[0] - p[0]) * p0[1] + p0[0] * (p[1] - p0[1]) > 0) return 1;
  } else {
    if (p[1] <= 0 && (p0[0] - p[0]) * p0[1] + p0[0] * (p[1] - p0[1]) < 0) return -1;
  }
  return 0;
}

function d3_geo_circleInterpolateCircle(interpolate, context) {
  for (var i = 0; i < 4; i++) {
    interpolate({angle: -i * π / 2}, {angle: -(i + 1) * π / 2}, context);
  }
}
