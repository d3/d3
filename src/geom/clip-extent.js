import "../arrays/merge";
import "../math/abs";
import "../math/trigonometry";
import "../geo/clip-buffer-sink";
import "../geo/clip-polygon";
import "geom";
import "clip-line";

var d3_geom_clipExtentMAX = 1e9;

d3.geom.clipExtent = function(x0, y0, x1, y1, sink) {
  var sink_ = sink,
      bufferSink = d3_geo_clipBufferSink(),
      clipLine = d3_geom_clipLine(x0, y0, x1, y1),
      segments,
      polygon,
      ring;

  var clip = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: function() {
      sink = bufferSink;
      segments = [];
      polygon = [];
      clean = true;
    },
    polygonEnd: function() {
      sink = sink_;
      segments = d3.merge(segments);
      var clipStartInside = insidePolygon([x0, y1]),
          inside = clean && clipStartInside,
          visible = segments.length;
      if (inside || visible) {
        sink.polygonStart();
        if (inside) {
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (visible) {
          d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, sink);
        }
        sink.polygonEnd();
      }
      segments = polygon = ring = null;
    }
  };

  function insidePolygon(p) {
    var wn = 0, // the winding number counter
        n = polygon.length,
        y = p[1];

    for (var i = 0; i < n; ++i) {
      for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
        b = v[j];
        if (a[1] <= y) {
          if (b[1] >  y && d3_cross2d(a, b, p) > 0) ++wn;
        } else {
          if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn;
        }
        a = b;
      }
    }
    return wn !== 0;
  }

  function interpolate(from, to, direction, sink) {
    var a = 0, a1 = 0;
    if (from == null ||
        (a = corner(from, direction)) !== (a1 = corner(to, direction)) ||
        comparePoints(from, to) < 0 ^ direction > 0) {
      do {
        sink.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      } while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      sink.point(to[0], to[1]);
    }
  }

  function pointVisible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function point(x, y) {
    if (pointVisible(x, y)) sink.point(x, y);
  }

  var x__, y__, v__, // first point
      x_, y_, v_, // previous point
      first,
      clean;

  function lineStart() {
    clip.point = linePoint;
    if (polygon) polygon.push(ring = []);
    first = true;
    v_ = false;
    x_ = y_ = NaN;
  }

  function lineEnd() {
    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    if (segments) {
      linePoint(x__, y__);
      if (v__ && v_) bufferSink.rejoin();
      segments.push(bufferSink.buffer());
    }
    clip.point = point;
    if (v_) sink.lineEnd();
  }

  function linePoint(x, y) {
    x = Math.max(-d3_geom_clipExtentMAX, Math.min(d3_geom_clipExtentMAX, x));
    y = Math.max(-d3_geom_clipExtentMAX, Math.min(d3_geom_clipExtentMAX, y));
    var v = pointVisible(x, y);
    if (polygon) ring.push([x, y]);
    if (first) {
      x__ = x, y__ = y, v__ = v;
      first = false;
      if (v) {
        sink.lineStart();
        sink.point(x, y);
      }
    } else {
      if (v && v_) sink.point(x, y);
      else {
        var l = {a: {x: x_, y: y_}, b: {x: x, y: y}};
        if (clipLine(l)) {
          if (!v_) {
            sink.lineStart();
            sink.point(l.a.x, l.a.y);
          }
          sink.point(l.b.x, l.b.y);
          if (!v) sink.lineEnd();
          clean = false;
        } else if (v) {
          sink.lineStart();
          sink.point(x, y);
          clean = false;
        }
      }
    }
    x_ = x, y_ = y, v_ = v;
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < ε
  }

  function compare(a, b) {
    return comparePoints(a.x, b.x);
  }

  function comparePoints(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return clip;
}
