function d3_geo_clip(pointVisible, clipLine, interpolate) {
  return function(listener) {
    var line = clipLine(listener),
        polygon = [],
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointPolygon;
        clip.lineStart = linePolygon; 
        clip.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        d3_geo_clipPolygon(polygon, clipLine, interpolate, listener);
        polygon = [];
        ring = null;
      },
      sphere: function() {
        listener.polygonStart();
        listener.lineStart();
        interpolate(null, null, 1, listener);
        listener.lineEnd();
        listener.polygonEnd();
      }
    };

    return clip;

    function point(λ, φ) { if (pointVisible(λ, φ)) listener.point(λ, φ); }
    function pointLine(λ, φ) { line.point(λ, φ); }
    function pointPolygon(λ, φ) { ring.push([λ, φ]); }
    function lineStart() { clip.point = pointLine; line.lineStart(); }
    function lineEnd() { clip.point = point; line.lineEnd(); }
    function linePolygon() { polygon.push(ring = []); }
    function lineEndPolygon() { ring.push(ring[0]); }
  };
}

// General spherical polygon clipping algorithm: takes a polygon, cuts it into
// visible line segments and rejoins the segments by interpolating along the
// clip edge.  If there are no intersections with the clip edge, the whole clip
// edge is inserted if appropriate.
//
// This is used by both d3_geo_circleClip and d3_geo_cut, each providing
// different functions for clipRing and interpolate.
function d3_geo_clipPolygon(polygon, clipRing, interpolate, listener) {
  var subject = [],
      clip = [],
      segments = [],
      visibleArea = 0,
      invisibleArea = 0,
      invisible = false,
      buffer = d3_geo_clipBufferListener(),
      ringListener = clipRing(buffer);

  listener.polygonStart();

  var segments = d3.merge(polygon.map(function(ring) {
    ringListener.lineStart();
    ring.forEach(function(point) {
      ringListener.point(point[0], point[1]);
    });
    ringListener.lineEnd();

    var clean = ringListener.clean(),
        ringSegments = buffer.buffer(),
        segment,
        n = ringSegments.length;

    if (!n) {
      invisible = true;
      invisibleArea += d3_geo_clipAreaRing(ring, d3_geo_clipRotationInvisible);
      return [];
    }

    // No intersections.
    if (clean & 1) {
      segment = ringSegments[0];
      visibleArea += d3_geo_clipAreaRing(segment, d3_geo_clipRotation);
      var n = segment.length - 1,
          i = -1,
          point;
      listener.lineStart();
      while (++i < n) listener.point((point = segment[i])[0], point[1]);
      listener.lineEnd();
      return [];
    }

    // Rejoin connected segments.
    if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

    return ringSegments.filter(d3_geo_clipSegmentLength1);
  }));

  if (!segments.length && (visibleArea < -ε2 || invisible && invisibleArea < -ε2)) {
    listener.lineStart();
    interpolate(null, null, 1, listener);
    listener.lineEnd();
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
  if (!subject.length) return listener.polygonEnd();
  var start = subject[0],
      current,
      points,
      point;
  while (1) {
    // Find first unvisited intersection.
    current = start;
    while (current.visited) if ((current = current.next) === start) return listener.polygonEnd();
    points = current.points;
    listener.lineStart();
    do {
      current.visited = current.other.visited = true;
      if (current.entry) {
        if (current.subject) {
          for (var i = 0; i < points.length; i++) listener.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.point, current.next.point, 1, listener);
        }
        current = current.next;
      } else {
        if (current.subject) {
          points = current.prev.points;
          for (var i = points.length; --i >= 0;) listener.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.point, current.prev.point, -1, listener);
        }
        current = current.prev;
      }
      current = current.other;
      points = current.points;
    } while (!current.visited);
    listener.lineEnd();
  }
  listener.polygonEnd();
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

function d3_geo_clipBufferListener() {
  var lines = [],
      line;
  return {
    lineStart: function() { lines.push(line = []); },
    point: function(λ, φ) { line.push([λ, φ]); },
    lineEnd: d3_noop,
    buffer: function() {
      var buffer = lines;
      lines = [];
      line = null;
      return buffer;
    }
  };
}

function d3_geo_clipAreaRing(ring, rotate) {
  d3_geo_area.polygonStart();
  d3_geo_area.lineStart();
  for (var i = 0, n = ring.length, p; i < n; ++i) {
    p = rotate(ring[i]);
    d3_geo_area.point(p[0] * d3_degrees, p[1] * d3_degrees);
  }
  d3_geo_area.lineEnd();
  d3_geo_area.polygonEnd();
  return d3_geo_areaRing;
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
