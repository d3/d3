import "../math/trigonometry";
import "spherical";

// General spherical polygon clipping algorithm.
// Given a polygon that has been cut into visible line segments, rejoins the
// segments by interpolating along the clip edge where necessary.
function d3_geo_clipPolygon(segments, compare, clipStartInside, pointInPolygon, interpolate, listener) {
  var subject = [],
      clip = [],
      rings = [],
      n = segments.length;

  for (var i = 0; i < n; ++i) {
    var segment = segments[i];

    if ((m = segment.length - 1) <= 0) continue;

    var m, p0 = segment[0], p1 = segment[m];

    // If the first and last points of a segment are coincident, then treat as
    // a closed ring.
    if (d3_geo_sphericalEqual(p0, p1)) {
      rings.push(segment);
      continue;
    }

    var a = {point: p0, points: segment, other: null, visited: false, entry: true, subject: true},
        b = {point: p0, points: [p0], other: a, visited: false, entry: false, subject: false};
    a.other = b;
    subject.push(a);
    clip.push(b);
    a = {point: p1, points: [p1], other: null, visited: false, entry: false, subject: true};
    b = {point: p1, points: [p1], other: a, visited: false, entry: true, subject: false};
    a.other = b;
    subject.push(a);
    clip.push(b);
  }

  // If there are any segments to be joined…
  if (subject.length) {

    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);

    // Mark intersection points as alternating between entering and exiting.
    for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
      clip[i].entry = entry = !entry;
    }

    var start = subject[0],
        current,
        points,
        point,
        listener_ = listener;

    // If there are closed rings, then buffer the rejoined segments so they can
    // be output with the correct interior rings later.
    if (rings.length) listener = d3_geo_clipBufferListener();

    while (1) {
      // Find first unvisited intersection.
      current = start;
      while (current.visited) if ((current = current.next) === start) break;
      if (current.visited) break;
      points = current.points;
      listener.polygonStart();
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
      listener.polygonEnd();
    }

    if (n = rings.length) {
      var exteriors = listener.buffer();
      listener = listener_;
      for (var j = 0, m = exteriors.length; j < m; ++j) {
        var exterior = exteriors[j];
        listener.polygonStart();
        d3_geo_clipPolygonStreamRing(exterior, listener);
        for (var i = 0; i < n; ++i) {
          var ring = rings[i];
          if (ring && pointInPolygon(ring[0], [exterior])) {
            d3_geo_clipPolygonStreamRing(ring, listener);
            rings[i] = null;
          }
        }
        listener.polygonEnd();
      }
    }
  }

  // Otherwise, there are no intersections.
  else if ((n = rings.length) || clipStartInside) {
    listener.polygonStart();
    // If the clip polygon is inside the subject polygon, then the clip polygon
    // becomes the exterior.
    if (clipStartInside) {
      listener.lineStart();
      interpolate(null, null, 1, listener);
      listener.lineEnd();
    }
    for (var i = 0; i < n; ++i) {
      d3_geo_clipPolygonStreamRing(rings[i], listener);
    }
    listener.polygonEnd();
  }
}

function d3_geo_clipPolygonStreamRing(ring, listener) {
  listener.lineStart();
  for (var i = 0, n = ring.length - 1, p; i < n; ++i) {
    listener.point((p = ring[i])[0], p[1]);
  }
  listener.lineEnd();
}

function d3_geo_clipPolygonLinkCircular(array) {
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
