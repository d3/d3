import "../arrays/merge";
import "../math/abs";
import "../math/trigonometry";
import "../geom/clip-line";
import "geo";
import "clip";
import "clip-polygon";

var d3_geo_clipExtentMAX = 1e9;

d3.geo.clipExtent = function() {
  var x0, y0, x1, y1,
      stream,
      clip,
      clipExtent = {
        stream: function(output) {
          if (stream) stream.valid = false;
          stream = clip(output);
          stream.valid = true; // allow caching by d3.geo.path
          return stream;
        },
        extent: function(_) {
          if (!arguments.length) return [[x0, y0], [x1, y1]];
          clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
          if (stream) stream.valid = false, stream = null;
          return clipExtent;
        }
      };
  return clipExtent.extent([[0, 0], [960, 500]]);
};

function d3_geo_clipExtent(x0, y0, x1, y1) {
  return function(listener) {
    var listener_ = listener,
        bufferListener = d3_geo_clipBufferListener(),
        clipLine = d3_geom_clipLine(x0, y0, x1, y1),
        segments,
        polygon,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        listener = bufferListener;
        segments = [];
        polygon = [];
        clean = true;
      },
      polygonEnd: function() {
        listener = listener_;
        segments = d3.merge(segments);
        var clipStartInside = insidePolygon([x0, y1]),
            inside = clean && clipStartInside,
            visible = segments.length;
        if (inside || visible) {
          listener.polygonStart();
          if (inside) {
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          if (visible) {
            d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
          }
          listener.polygonEnd();
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
            if (b[1] >  y && isLeft(a, b, p) > 0) ++wn;
          } else {
            if (b[1] <= y && isLeft(a, b, p) < 0) --wn;
          }
          a = b;
        }
      }
      return wn !== 0;
    }

    function isLeft(a, b, c) {
      return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    }

    function interpolate(from, to, direction, listener) {
      var a = 0, a1 = 0;
      if (from == null ||
          (a = corner(from, direction)) !== (a1 = corner(to, direction)) ||
          comparePoints(from, to) < 0 ^ direction > 0) {
        do {
          listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
        } while ((a = (a + direction + 4) % 4) !== a1);
      } else {
        listener.point(to[0], to[1]);
      }
    }

    function pointVisible(x, y) {
      return x0 <= x && x <= x1 && y0 <= y && y <= y1;
    }

    function point(x, y) {
      if (pointVisible(x, y)) listener.point(x, y);
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
        if (v__ && v_) bufferListener.rejoin();
        segments.push(bufferListener.buffer());
      }
      clip.point = point;
      if (v_) listener.lineEnd();
    }

    function linePoint(x, y) {
      x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
      y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
      var v = pointVisible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          listener.lineStart();
          listener.point(x, y);
        }
      } else {
        if (v && v_) listener.point(x, y);
        else {
          var l = {a: {x: x_, y: y_}, b: {x: x, y: y}};
          if (clipLine(l)) {
            if (!v_) {
              listener.lineStart();
              listener.point(l.a.x, l.a.y);
            }
            listener.point(l.b.x, l.b.y);
            if (!v) listener.lineEnd();
            clean = false;
          } else if (v) {
            listener.lineStart();
            listener.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clip;
  };

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
}
