function d3_geo_clipView(x0, y0, x1, y1) {
  return function(listener) {
    var listener_ = listener,
        bufferListener = d3_geo_clipBufferListener(),
        segments;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        listener = bufferListener;
        segments = [];
      },
      polygonEnd: function() {
        listener = listener_;
        if (segments.length) {
          listener.polygonStart();
          d3_geo_clipPolygon(d3.merge(segments), compare, interpolate, listener);
          listener.polygonEnd();
        }
        segments = null;
      }
    };

    function interpolate(from, to, direction, listener) {
      if (Math.abs(from[0] - to[0]) > ε && Math.abs(from[1] - to[1]) > ε) {
        var a = corner(from, direction),
            a1 = corner(to, direction);
        do {
          listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
        } while ((a = (a + direction + 4) % 4) !== a1);
      } else {
        listener.point(to[0], to[1]);
      }
    }

    function visible(x, y) {
      return x0 <= x && x <= x1 && y0 <= y && y <= y1;
    }

    function point(x, y) {
      if (visible(x, y)) listener.point(x, y);
    }

    var x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first;

    function lineStart() {
      clip.point = linePoint;
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
      var v = visible(x, y);
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
          var a = [x_, y_],
              b = [x, y];
          if (clipLine(a, b)) {
            if (!v_) {
              listener.lineStart();
              listener.point(a[0], a[1]);
            }
            listener.point(b[0], b[1]);
            if (!v) listener.lineEnd();
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clip;
  };

  function corner(p, direction) {
    return Math.abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3
        : Math.abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1
        : Math.abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // Math.abs(p[1] - y1) < ε
  }

  function compare(a, b) {
    a = a.point, b = b.point;
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  // Liang–Barsky line clipping.
  function clipLine(a, b) {
    var dx = b[0] - a[0],
        dy = b[1] - a[1],
        t = [0, 1];

    if (Math.abs(dx) < ε && Math.abs(dy) < ε) return x0 <= a[0] && a[0] <= x1 && y0 <= a[1] && a[1] <= y1;

    if (d3_geo_clipViewT(x0 - a[0],  dx, t) &&
        d3_geo_clipViewT(a[0] - x1, -dx, t) &&
        d3_geo_clipViewT(y0 - a[1],  dy, t) &&
        d3_geo_clipViewT(a[1] - y1, -dy, t)) {
      if (t[1] < 1) {
        b[0] = a[0] + t[1] * dx;
        b[1] = a[1] + t[1] * dy;
      }
      if (t[0] > 0) {
        a[0] += t[0] * dx;
        a[1] += t[0] * dy;
      }
      return true;
    }

    return false;
  }
}

function d3_geo_clipViewT(num, denominator, t) {
  if (Math.abs(denominator) < ε) return num > ε;

  var u = num / denominator;

  if (denominator > 0) {
    if (u > t[1]) return false;
    if (u > t[0]) t[0] = u;
  } else {
    if (u < t[0]) return false;
    if (u < t[1]) t[1] = u;
  }
  return true;
}
