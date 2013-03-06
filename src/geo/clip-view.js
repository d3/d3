d3.geo.clipView = function d3_geo_clipView(x0, y0, x1, y1) {

  // TODO optimise polygon clipping.
  var clipPolygon = d3.geom.polygon([[x0, y0], [x0, y1], [x1, y1], [x1, y0]]).clip,
      clipLine = d3_geo_clipViewLine(x0, x1, y0, y1);

  return function(listener) {
    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        listener.polygonStart();
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        clip.point = ringPoint;
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineEnd = lineEnd;
        clip.lineStart = lineStart;
        listener.polygonEnd();
      }
    };

    function visible(x, y) {
      return x0 <= x && x <= x1 && y0 <= y && y <= y1;
    }

    function point(x, y) {
      if (visible(x, y)) listener.point(x, y);
    }

    var x0, y0, v0, first;

    function lineStart() {
      clip.point = linePoint;
      first = true;
      v0 = false;
    }

    function lineEnd() {
      clip.point = point;
      if (v0) listener.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (first) {
        if (v) {
          listener.lineStart();
          listener.point(x, y);
        }
      } else {
        if (v && v0) listener.point(x, y);
        else {
          var a = [x0, y0],
              b = [x, y];
          if (clipLine(a, b)) {
            if (!v0) {
              listener.lineStart();
              listener.point(a[0], a[1]);
            }
            listener.point(b[0], b[1]);
            if (!v) listener.lineEnd();
          }
        }
      }
      first = false;
      x0 = x, y0 = y, v0 = v;
    }

    var ring;

    function ringStart() {
      ring = [];
    }

    function ringEnd() {
      ring.pop();
      ring = clipPolygon(ring);
      var n = ring.length;
      if (n) {
        listener.lineStart();
        for (var i = 0, n = ring.length, p; i < n; ++i) {
          listener.point((p = ring[i])[0], p[1]);
        }
        listener.point(ring[0][0], ring[0][1]);
        listener.lineEnd();
      }
    }

    function ringPoint(x, y) {
      ring.push([x, y]);
    }

    return clip;
  };
}

// Liang–Barsky line clipping.
function d3_geo_clipViewLine(xMin, xMax, yMin, yMax) {
  return function(a, b) {
    var dx = b[0] - a[0],
        dy = b[1] - a[1],
        t = [0, 1];

    if (Math.abs(dx) < ε && Math.abs(dy) < ε &&
        xMin <= a[0] && a[0] <= xMax && yMin <= a[1] && a[1] <= yMax) return;

    if (clipT(xMin - a[0],  dx, t) &&
        clipT(a[0] - xMax, -dx, t) &&
        clipT(yMin - a[1],  dy, t) &&
        clipT(a[1] - yMax, -dy, t)) {
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
  };

  function clipT(num, denominator, t) {
    if (Math.abs(denominator) < ε) return num <= 0;

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
}
