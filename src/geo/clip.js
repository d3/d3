function d3_geo_clip(clipPoint, clipLine, interpolate) {
  return d3_geo_type({
    point: clipPoint,
    LineString: function(o) {
      o = Object.create(o);
      o.type = "MultiLineString";
      o.coordinates = clipLine(o.coordinates)[1];
      return o;
    },
    MultiLineString: function(o) {
      o = Object.create(o);
      o.coordinates = d3.merge(o.coordinates.map(function(line) {
        return clipLine(line)[1];
      }));
      return o;
    },
    Polygon: function(o) {
      o = Object.create(o);
      o.type = "MultiPolygon";
      o.coordinates = d3_geo_clipPolygon(o.coordinates, clipLine, interpolate);
      return o;
    },
    MultiPolygon: function(o) {
      o = Object.create(o);
      o.coordinates = d3.merge(o.coordinates.map(function(polygon) {
        return d3_geo_clipPolygon(polygon, clipLine, interpolate);
      }));
      return o;
    },
    Sphere: function() {
      return {type: "Polygon", coordinates: [interpolate(null, null, 1)]};
    }
  });
}

// General spherical polygon clipping algorithm: takes a polygon, cuts it into
// visible line segments and rejoins the segments by interpolating along the
// clip edge.  If there are no intersections with the clip edge, the whole clip
// edge is inserted if appropriate.
//
// This is used by both d3_geo_circleClip and d3_geo_cut, each providing
// different functions for clipRing and interpolate.
function d3_geo_clipPolygon(polygon, clipRing, interpolate) {
  var subject = [],
      clip = [],
      segments = [],
      visibleArea = 0,
      invisibleArea = 0,
      invisible = false,
      result = [],
      polygons = [result];

  var segments = d3.merge(polygon.map(function(ring) {
    var x = clipRing(ring),
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
      result.push(segment);
      return [];
    }

    // Rejoin connected segments.
    if (n > 1 && x[0] & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

    return ringSegments.filter(d3_geo_clipSegmentLength1);
  }));

  if (!segments.length && (visibleArea < -ε2 || invisible && invisibleArea < -ε2)) {
    result.push(interpolate(null, null, 1));
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
  if (!subject.length) return polygons;
  var start = subject[0],
      current,
      points,
      ring;
  while (1) {
    // Find first unvisited intersection.
    current = start;
    while (current.visited) if ((current = current.next) === start) return polygons;
    points = current.points;
    ring = [points.shift()];
    do {
      current.visited = current.other.visited = true;
      if (current.entry) {
        ring = ring.concat(current.subject ? points : interpolate(current.point, current.next.point, 1));
        current = current.next;
      } else {
        ring = ring.concat(current.subject ? (points = current.prev.points).reverse() : interpolate(current.point, current.prev.point, -1));
        current = current.prev;
      }
      current = current.other;
      points = current.points;
    } while (!current.visited);
    result.push(ring);
  }
  return polygons;
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
