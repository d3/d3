d3.geo.circle = function() {
  var origin = [0, 0],
      angle,
      precision = 6,
      rotate,
      interpolate;

  function circle() {
    var o = typeof origin === "function" ? origin.apply(this, arguments) : origin;
    rotate = d3_geo_rotation(-o[0] * d3_radians, -o[1] * d3_radians, 0);
    var ring = [];
    d3_geo_circleInterpolateCircle(interpolate, {
      lineTo: function(λ, φ) {
        var point = rotate.invert(λ, φ);
        point[0] *= d3_degrees;
        point[1] *= d3_degrees;
        ring.push(point);
      }
    });
    return {
      type: "Polygon",
      coordinates: [ring]
    };
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return angle;
    interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
    return circle;
  };

  circle.precision = function(_) {
    if (!arguments.length) return precision;
    interpolate = d3_geo_circleInterpolate(radians, (precision = +_) * d3_radians);
    return circle;
  };

  return circle.angle(90);
};

function d3_geo_circleClip(degrees, rotate) {
  var radians = degrees * d3_radians,
      cr = Math.cos(radians),
      center = [cr, 0, 0], // Cartesian center of the circle.
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
        point2,
        inside = visible(point0),
        keepWinding = winding != null,
        closed = keepWinding && inside,
        n,
        move0,
        line0;
    if (inside) context.moveTo((move0 = point0)[0], point0[1]);
    for (var i = 1; i < n; i++) {
      var point1 = rotate(coordinates[i]),
          v = visible(point1);
      if (v !== inside) {
        if (inside = v) {
          // outside going in
          point2 = intersect(point1, point0);
          // avoid coincident points
          if (!line0 || (Math.abs(line0[0] - point2[0]) > ε || Math.abs(line0[1] - point2[1]) > ε)) {
            if (move0) keepWinding = false;
            context.moveTo((move0 = point2)[0], point2[1]);
          }
          if (keepWinding) winding += d3_geo_circleWinding(point2, point1);
          point0 = point2;
        } else {
          // inside going out
          line0 = point2 = intersect(point0, point1);
          context.lineTo(point2[0], point2[1]);
          // check to see if this generates a closed polygon
          if (keepWinding) {
            if (Math.abs(move0[0] - point2[0]) > ε || Math.abs(move0[1] - point2[1]) > ε) {
              keepWinding = false;
            } else {
              winding += d3_geo_circleWinding(point0, move0);
            }
          }
          point0 = point2;
        }
      }
      if (keepWinding) winding += d3_geo_circleWinding(point0, point1);
      if (v) context.lineTo(point1[0], point1[1]);
      point0 = point1;
    }
    if (closed && v) context.closePath();
    return keepWinding && (!move0 || Math.abs(move0[0] - point0[0]) < ε && Math.abs(move0[1] - point0[1]) < ε) && winding;
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
        n2n2 = d3_geo_circleDot(n2, n2),
        n1n2 = n2[0], // d3_geo_circleDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;
    // Two polar points.
    if (!determinant) return a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
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
  var cr = Math.cos(radians),
      sr = Math.sin(radians);
  return function(from, to, direction, context) {
    var step = direction * precision;
    from = from.angle;
    to = to.angle;
    if (from < to) from += 2 * π;
    for (var step = precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
      var c = Math.cos(t),
          s = Math.sin(t),
          point = d3_geo_circleSpherical([
            cr,
            -sr * c,
            -sr * s
          ]);
      context.lineTo(point[0], point[1]);
    }
  };
}

function d3_geo_circleClipPolygon(coordinates, context, clipLine, interpolate, angle) {
  var subject = [],
      clip = [],
      segments = [],
      buffer = d3_geo_circleBufferSegments(clipLine),
      winding = 0,
      count = 0;
  coordinates.forEach(function(ring) {
    var x = buffer(ring, context),
        ringSegments = x[1];
    winding += x[0];
    var n = ringSegments.length;
    if (!n) return;
    count += n;

    if (x[0] !== false) {
      var segment = ringSegments[0],
          point = segment[0],
          n = segment.length - 1,
          i = 0;
      context.moveTo(point[0], point[1]);
      while (++i < n) context.lineTo((point = segment[i])[0], point[1]);
      context.closePath();
      return;
    }
    segments = segments.concat(ringSegments);
  });

  if (count ? winding > 0 : winding < 0) {
    var moved = false;
    d3_geo_circleInterpolateCircle(interpolate, {
      lineTo: function(x, y) {
        (moved ? context.lineTo : (moved = true, context.moveTo))(x, y);
      }
    });
    context.closePath();
  }
  segments.forEach(function(segment) {
    var p0 = segment[0],
        p1 = segment[segment.length - 1],
        a = {point: p0, points: segment, other: null, visited: false, entry: true, subject: true},
        b = {point: p0, angle: angle(p0), points: [p0], other: a, visited: false, entry: false, subject: false};
    a.other = b;
    subject.push(a);
    clip.push(b);
    a = {point: p1, points: [p1], other: null, visited: false, entry: false, subject: true};
    b = {point: p1, angle: angle(p1), points: [p1], other: a, visited: false, entry: true, subject: false};
    a.other = b;
    subject.push(a);
    clip.push(b);
  });
  // Sort intersection points by relative angles.
  clip.sort(function(a, b) { return b.angle - a.angle; });
  // Construct circular linked lists.
  [subject, clip].forEach(function(intersections) {
    for (var i = 0, a = intersections[0], b; i < intersections.length;) {
      a.next = b = intersections[++i % intersections.length];
      b.prev = a;
      a = b;
    }
  });
  if (!subject.length) return;
  var start = subject[0],
      current,
      points,
      point;
  while (1) {
    // Find first unvisited intersection.
    current = start;
    while (current.visited) if ((current = current.next) === start) return;
    points = current.points;
    context.moveTo((point = points.shift())[0], point[1]);
    do {
      current.visited = current.other.visited = true;
      if (current.entry) {
        if (current.subject) {
          for (var i = 0; i < points.length; i++) context.lineTo((point = points[i])[0], point[1]);
        } else {
          interpolate(current, current.next, 1, context);
        }
        current = current.next;
      } else {
        if (current.subject) {
          points = current.prev.points;
          for (var i = points.length; --i >= 0;) context.lineTo((point = points[i])[0], point[1]);
        } else {
          interpolate(current, current.prev, -1, context);
        }
        current = current.prev;
      }
      current = current.other;
      points = current.points;
    } while (!current.visited);
    context.closePath();
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
  return function(coordinates) {
    var segments = [],
        segment;
    return [
      f(coordinates, {
          point: d3_noop,
          moveTo: function(x, y) { segments.push(segment = [[x, y]]); },
          lineTo: function(x, y) { segment.push([x, y]); },
          closePath: function() {
            if (segments.length < 2) return;
            segments.pop();
            segments.push(segment = segment.concat(segments.shift()));
          }
        }, 0),
      segments
    ];
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
    interpolate({angle: -i * π / 2}, {angle: -(i + 1) * π / 2}, 1, context);
  }
}
