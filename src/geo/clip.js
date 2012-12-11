// General spherical polygon clipping algorithm: takes a polygon, cuts it into
// visible line segments and rejoins the segments by interpolating along the
// clip edge.  If there are no intersections with the clip edge, the whole clip
// edge is inserted if appropriate.
//
// This is used by both d3_geo_circleClip and d3_geo_cut, each providing
// different functions for clipRing and interpolate.
function d3_geo_clipPolygon(polygon, context, clipRing, interpolate) {
  var subject = [],
      clip = [],
      segments = [],
      buffer = d3_geo_clipBufferSegments(clipRing),
      visibleArea = 0,
      invisibleArea = 0,
      invisible = false;

  var segments = d3.merge(polygon.map(function(ring) {
    var x = buffer(ring),
        ringSegments = x[1],
        segment,
        n = ringSegments.length;

    if (!n) {
      invisible = true;
      invisibleArea += d3_geo_areaRing(ring.map(d3_geo_clipRotationInvisible));
      return [];
    }

    // No intersections.
    if (x[0] & 1) {
      visibleArea += d3_geo_areaRing((segment = ringSegments[0]).map(d3_geo_clipRotation));
      var point = segment[0],
          n = segment.length - 1,
          i = 0;
      context.moveTo(point[0], point[1]);
      while (++i < n) context.lineTo((point = segment[i])[0], point[1]);
      context.closePath();
      return [];
    }

    // Rejoin connected segments.
    if (n > 1 && x[0] & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

    return ringSegments.filter(d3_geo_clipSegmentLength1);
  }));

  if (!segments.length && (visibleArea < -ε2 || invisible && invisibleArea < -ε2)) {
    d3_geo_clipSphere(context, interpolate);
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
  clip.sort(d3_geo_clipSort);
  d3_geo_clipLinkCircular(subject);
  d3_geo_clipLinkCircular(clip);
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

function d3_geo_clipBufferSegments(f) {
  return function(coordinates) {
    var segments = [],
        segment;
    return [
      f(coordinates, {
        moveTo: function(x, y) { segments.push(segment = [[x, y]]); },
        lineTo: function(x, y) { segment.push([x, y]); }
      }),
      segments
    ];
  };
}

function d3_geo_clipRotation(point) {
  var λ = point[0],
      φ = point[1],
      cosφ = Math.cos(φ);
  return [
    Math.atan2(Math.sin(λ) * cosφ, Math.sin(φ)),
    Math.asin(Math.max(-1, Math.min(1, -Math.cos(λ) * cosφ)))
  ];
}

// For an invisible polygon ring, we first rotate longitudinally by 180°.
function d3_geo_clipRotationInvisible(point) {
  var λ = point[0] + π,
      φ = point[1],
      cosφ = Math.cos(φ);
  return [
    Math.atan2(Math.sin(λ) * cosφ, Math.sin(φ)),
    Math.asin(Math.max(-1, Math.min(1, -Math.cos(λ) * cosφ)))
  ];
}


function d3_geo_clipLinkCircular(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.next = b = array[i];
    b.prev = a;
    a = b;
  }
  a.next = b = array[0];
  b.prev = a;
}

// Intersection points are sorted along the clip edge. For both antimeridian
// cutting and circle clipping, the same comparison is used.
function d3_geo_clipSort(a, b) {
  return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1])
       - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
}

function d3_geo_clipSegmentLength1(segment) {
  return segment.length > 1;
}

function d3_geo_clipSphere(context, interpolate) {
  var moved = false;
  interpolate(null, null, 1, {
    lineTo: function(x, y) {
      (moved ? context.lineTo : (moved = true, context.moveTo))(x, y);
    }
  });
  context.closePath();
}
