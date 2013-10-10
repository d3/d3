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

    var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true),
        b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
    a.o = b;
    subject.push(a);
    clip.push(b);
    a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
    b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
    a.o = b;
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
      clip[i].e = entry = !entry;
    }

    var start = subject[0],
        listener_ = listener,
        point;

    // If there are closed rings, then buffer the rejoined segments so they can
    // be output with the correct interior rings later.
    if (rings.length) listener = d3_geo_clipBufferListener();

    while (1) {
      // Find first unvisited intersection.
      var current = start,
          isSubject = true;
      while (current.v) if ((current = current.n) === start) break;
      if (current.v) break;
      listener.polygonStart();
      listener.lineStart();
      do {
        current.v = current.o.v = true;
        if (current.e) {
          if (isSubject) {
            for (var i = 0, points = current.z, n = points.length; i < n; ++i) {
              listener.point((point = points[i])[0], point[1]);
            }
          } else {
            interpolate(current.x, current.n.x, 1, listener);
          }
          current = current.n;
        } else {
          if (isSubject) {
            for (var points = current.z, i = points.length; --i >= 0;) {
              listener.point((point = points[i])[0], point[1]);
            }
          } else {
            interpolate(current.x, current.p.x, -1, listener);
          }
          current = current.p;
        }
        current = current.o;
        isSubject = !isSubject;
      } while (!current.v);
      listener.lineEnd();
      listener.polygonEnd();
    }

    if (n = rings.length) {
      var exteriors = listener.buffer(),
          exteriorPolygon = [null];
      listener = listener_;
      for (var j = 0, m = exteriors.length; j < m; ++j) {
        var exterior = exteriorPolygon[0] = exteriors[j];
        listener.polygonStart();
        d3_geo_clipPolygonStreamRing(exterior, listener);
        for (var i = 0; i < n; ++i) {
          var ring = rings[i];
          if (ring && pointInPolygon(ring[0], exteriorPolygon)) {
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
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

function d3_geo_clipPolygonIntersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}
