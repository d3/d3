import "../arrays/merge";
import "../core/noop";
import "../math/trigonometry";
import "clip-polygon";
import "clip-buffer-sink";

function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
  return function(sink) {
    var line = clipLine(sink);

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;

        segments = d3.merge(segments);
        var clipStartInside = d3_geo_pointInPolygon(clipStart, polygon);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, sink);
        } else if (clipStartInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(λ, φ) { if (pointVisible(λ, φ)) sink.point(λ, φ); }
    function pointLine(λ, φ) { line.point(λ, φ); }
    function lineStart() { clip.point = pointLine; line.lineStart(); }
    function lineEnd() { clip.point = point; line.lineEnd(); }

    var segments;

    var buffer = d3_geo_clipBufferSink(),
        ringSink = clipLine(buffer),
        polygonStarted = false,
        polygon,
        ring;

    function pointRing(λ, φ) {
      ring.push([λ, φ]);
      ringSink.point(λ, φ);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = buffer.buffer(),
          segment,
          n = ringSegments.length;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        var n = segment.length - 1,
            i = -1,
            point;
        if (n > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          while (++i < n) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse bufferSink.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
    }

    return clip;
  };
}

function d3_geo_clipSegmentLength1(segment) {
  return segment.length > 1;
}

// Intersection points are sorted along the clip edge. For both antimeridian
// cutting and circle clipping, the same comparison is used.
function d3_geo_clipSort(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1]);
}
