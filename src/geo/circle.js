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
    interpolate(null, null, 1, {
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
    interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
    return circle;
  };

  return circle.angle(90);
};

function d3_geo_circleClip(degrees, rotate) {
  var radians = degrees * d3_radians,
      cr = Math.cos(radians),
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
      d3_geo_circleClipPolygon(polygon, context, clipLine, interpolate);
    },
    sphere: function(context) {
      d3_geo_projectionSphere(context, interpolate);
    }
  };

  function visible(point) {
    return Math.cos(point[1]) * Math.cos(point[0]) > cr;
  }

  // TODO two invisible endpoints with visible intermediate segment.
  function clipLine(coordinates, context, ring) {
    if (!(n = coordinates.length)) return [ring && 0, false];
    var point0 = rotate(coordinates[0]),
        point1,
        point2,
        v0 = visible(point0),
        v00 = ring && v0,
        v,
        n,
        clean = ring, // clean indicates no intersections
        points = [];
    if (v0) context.moveTo(point0[0], point0[1]);
    else if (clean) points.push([point0[0] + π, point0[1]]);
    for (var i = 1; i < n; i++) {
      point1 = rotate(coordinates[i]);
      v = visible(point1);
      // handle degeneracies
      if (v !== v0) {
        point2 = intersect(point0, point1);
        if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
          point1[0] += ε;
          point1[1] += ε;
          v = visible(point1);
        }
      }
      if (v !== v0) {
        clean = false;
        if (v0 = v) {
          // outside going in
          point2 = intersect(point1, point0);
          context.moveTo(point2[0], point2[1]);
        } else {
          // inside going out
          point2 = intersect(point0, point1);
          context.lineTo(point2[0], point2[1]);
        }
        point0 = point2;
      }
      if (v && !d3_geo_sphericalEqual(point0, point1)) context.lineTo(point1[0], point1[1]);
      else if (clean) points.push([point1[0] + π, point1[1]]);
      point0 = point1;
    }
    return [
      clean && points,
      v00 && v // whether the first and last segments should be rejoined
    ];
  }

  // Intersects the great circle between a and b with the clip circle.
  // TODO special case: clipAngle(90°); avoid conversion ↔ Cartesian 3-space.
  function intersect(a, b) {
    var pa = d3_geo_cartesian(a, 0),
        pb = d3_geo_cartesian(b, 0);
    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 x n2).
    var n1 = [1, 0, 0], // normal
        n2 = d3_geo_cartesianCross(pa, pb),
        n2n2 = d3_geo_cartesianDot(n2, n2),
        n1n2 = n2[0], // d3_geo_cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;
    // Two polar points.
    if (!determinant) return a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = d3_geo_cartesianCross(n1, n2),
        A = d3_geo_cartesianScale(n1, c1),
        B = d3_geo_cartesianScale(n2, c2);
    d3_geo_cartesianAdd(A, B);
    // Now solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = d3_geo_cartesianDot(A, u),
        uu = d3_geo_cartesianDot(u, u),
        t = Math.sqrt(w * w - uu * (d3_geo_cartesianDot(A, A) - 1)),
        q = d3_geo_cartesianScale(u, (-w - t) / uu);
    d3_geo_cartesianAdd(q, A);
    return d3_geo_spherical(q);
  }
}

function d3_geo_circleInterpolate(radians, precision) {
  var cr = Math.cos(radians),
      sr = Math.sin(radians);
  return function(from, to, direction, context) {
    if (from != null) {
      from = d3_geo_circleAngle(cr, from);
      to = d3_geo_circleAngle(cr, to);
      if (direction > 0 ? from < to: from > to) from += direction * 2 * π;
    } else {
      from = radians + direction * 2 * π;
      to = radians;
    }
    for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
      var c = Math.cos(t),
          s = Math.sin(t),
          point = d3_geo_spherical([
            cr,
            -sr * c,
            -sr * s
          ]);
      context.lineTo(point[0], point[1]);
    }
  };
}

function d3_geo_circleClipRotation(point) {
  var λ = point[0],
      φ = point[1],
      cosφ = Math.cos(φ);
  return [
    Math.atan2(Math.sin(λ) * cosφ, Math.sin(φ)),
    Math.asin(Math.max(-1, Math.min(1, -Math.cos(λ) * cosφ)))
  ];
}

function d3_geo_circleClipPolygon(coordinates, context, clipLine, interpolate) {
  var subject = [],
      clip = [],
      segments = [],
      buffer = d3_geo_circleBufferSegments(clipLine),
      visibleArea = 0,
      invisibleArea = 0,
      invisible = false;

  coordinates.forEach(function(ring) {
    var x = buffer(ring, context),
        ringSegments = x[1],
        segment,
        n = ringSegments.length;

    if (!n) {
      invisible = true;
      invisibleArea += d3_geo_areaRing(x[0][0].map(d3_geo_circleClipRotation));
      return;
    }

    // No intersections.
    if (x[0][0]) {
      visibleArea += d3_geo_areaRing((segment = ringSegments[0]).map(d3_geo_circleClipRotation));
      var point = segment[0],
          n = segment.length - 1,
          i = 0;
      context.moveTo(point[0], point[1]);
      while (++i < n) context.lineTo((point = segment[i])[0], point[1]);
      context.closePath();
      return;
    }

    // Rejoin connected segments.
    if (n > 1 && x[0][1]) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

    segments = segments.concat(ringSegments.filter(d3_geo_circleSegmentLength1));
  });

  if (!segments.length && (visibleArea < -ε2 || invisible && invisibleArea < -ε2)) {
    d3_geo_projectionSphere(context, interpolate);
  }
  segments.forEach(function(segment) {
    var n = segment.length;
    if (n <= 1) return;
    var p0 = segment[0],
        p1 = segment[n - 1],
        a = {point: p0, points: segment, other: null, visited: false, entry: true, subject: true},
        b = {point: p0, points: [p0], other: a, visited: false, entry: false, subject: false};
    a.other = b;
    subject.push(a);
    clip.push(b);
    a = {point: p1, points: [p1], other: null, visited: false, entry: false, subject: true};
    b = {point: p1, points: [p1], other: a, visited: false, entry: true, subject: false};
    a.other = b;
    subject.push(a);
    clip.push(b);
  });
  // Sort intersection points by relative angles.
  clip.sort(d3_geo_circleClipSort);
  // Construct circular linked lists.
  d3_geo_circleLinkCircular(subject);
  d3_geo_circleLinkCircular(clip);
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
          interpolate(current.point, current.next.point, 1, context);
        }
        current = current.next;
      } else {
        if (current.subject) {
          points = current.prev.points;
          for (var i = points.length; --i >= 0;) context.lineTo((point = points[i])[0], point[1]);
        } else {
          interpolate(current.point, current.prev.point, -1, context);
        }
        current = current.prev;
      }
      current = current.other;
      points = current.points;
    } while (!current.visited);
    context.closePath();
  }
}

function d3_geo_circleLinkCircular(array) {
  for (var i = 0, a = array[0], b, n = array.length; i < n;) {
    a.next = b = array[++i % n];
    b.prev = a;
    a = b;
  }
}

function d3_geo_circleClipSort(a, b) {
  return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1])
       - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
}

// Signed angle of a cartesian point relative to [0, 0, 0].
function d3_geo_circleAngle(cr, point) {
  var a = d3_geo_cartesian(point);
  a[0] -= cr;
  d3_geo_cartesianNormalize(a);
  var angle = Math.acos(Math.max(-1, Math.min(1, -a[1])));
  return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
}

function d3_geo_circleBufferSegments(f) {
  return function(coordinates) {
    var segments = [],
        segment;
    return [
      f(coordinates, {
          moveTo: function(x, y) { segments.push(segment = [[x, y]]); },
          lineTo: function(x, y) { segment.push([x, y]); }
        }, true),
      segments
    ];
  };
}

function d3_geo_circleSegmentLength1(segment) {
  return segment.length > 1;
}
