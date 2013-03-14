import "../arrays/merge";
import "../core/noop";
import "../math/trigonometry";
import "clip-polygon";

function d3_geo_clip(pointVisible, clipLine, interpolate) {
  return function(listener) {
    var line = clipLine(listener);

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        invisible = false;
        invisibleArea = visibleArea = 0;
        segments = [];
        listener.polygonStart();
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;

        segments = d3.merge(segments);
        if (segments.length) {
          d3_geo_clipPolygon(segments, d3_geo_clipSort, null, interpolate, listener);
        } else if (visibleArea < -ε || invisible && invisibleArea < -ε) {
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
        }
        listener.polygonEnd();
        segments = null;
      },
      sphere: function() {
        listener.polygonStart();
        listener.lineStart();
        interpolate(null, null, 1, listener);
        listener.lineEnd();
        listener.polygonEnd();
      }
    };

    function point(λ, φ) { if (pointVisible(λ, φ)) listener.point(λ, φ); }
    function pointLine(λ, φ) { line.point(λ, φ); }
    function lineStart() { clip.point = pointLine; line.lineStart(); }
    function lineEnd() { clip.point = point; line.lineEnd(); }

    var segments,
        visibleArea,
        invisibleArea,
        invisible;

    var buffer = d3_geo_clipBufferListener(),
        ringListener = clipLine(buffer),
        ring;

    function pointRing(λ, φ) {
      ringListener.point(λ, φ);
      ring.push([λ, φ]);
    }

    function ringStart() {
      ringListener.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringListener.lineEnd();

      var clean = ringListener.clean(),
          ringSegments = buffer.buffer(),
          segment,
          n = ringSegments.length;

      // TODO compute on-the-fly?
      if (!n) {
        invisible = true;
        invisibleArea += d3_geo_clipAreaRing(ring, -1);
        ring = null;
        return;
      }
      ring = null;

      // No intersections.
      // TODO compute on-the-fly?
      if (clean & 1) {
        segment = ringSegments[0];
        visibleArea += d3_geo_clipAreaRing(segment, 1);
        var n = segment.length - 1,
            i = -1,
            point;
        listener.lineStart();
        while (++i < n) listener.point((point = segment[i])[0], point[1]);
        listener.lineEnd();
        return;
      }

      // Rejoin connected segments.
      // TODO reuse bufferListener.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
    }

    return clip;
  };
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
    },
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    }
  };
}

// Approximate polygon ring area (×2, since we only need the sign).
// For an invisible polygon ring, we rotate longitudinally by 180°.
// The invisible parameter should be 1, or -1 to rotate longitudinally.
// Based on Robert. G. Chamberlain and William H. Duquette,
// “Some Algorithms for Polygons on a Sphere”,
// http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
function d3_geo_clipAreaRing(ring, invisible) {
  if (!(n = ring.length)) return 0;
  var n,
      i = 0,
      area = 0,
      p = ring[0],
      λ = p[0],
      φ = p[1],
      cosφ = Math.cos(φ),
      x0 = Math.atan2(invisible * Math.sin(λ) * cosφ, Math.sin(φ)),
      y0 = 1 - invisible * Math.cos(λ) * cosφ,
      x1 = x0,
      x, // λ'; λ rotated to south pole.
      y; // φ' = 1 + sin(φ); φ rotated to south pole.
  while (++i < n) {
    p = ring[i];
    cosφ = Math.cos(φ = p[1]);
    x = Math.atan2(invisible * Math.sin(λ = p[0]) * cosφ, Math.sin(φ));
    y = 1 - invisible * Math.cos(λ) * cosφ;

    // If both the current point and the previous point are at the north pole,
    // skip this point.
    if (Math.abs(y0 - 2) < ε && Math.abs(y - 2) < ε) continue;

    // If this or the previous point is at the south pole, or if this segment
    // goes through the south pole, the area is 0.
    if (Math.abs(y) < ε || Math.abs(y0) < ε) {}

    // If this segment goes through either pole…
    else if (Math.abs(Math.abs(x - x0) - π) < ε) {
      // For the north pole, compute lune area.
      if (y + y0 > 2) area += 4 * (x - x0);
      // For the south pole, the area is zero.
    }

    // If the previous point is at the north pole, then compute lune area.
    else if (Math.abs(y0 - 2) < ε) area += 4 * (x - x1);

    // Otherwise, the spherical triangle area is approximately
    // δλ * (1 + sinφ0 + 1 + sinφ) / 2.
    else area += ((3 * π + x - x0) % (2 * π) - π) * (y0 + y);

    x1 = x0, x0 = x, y0 = y;
  }
  return area;
}

// Intersection points are sorted along the clip edge. For both antimeridian
// cutting and circle clipping, the same comparison is used.
function d3_geo_clipSort(a, b) {
  return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1])
       - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
}
