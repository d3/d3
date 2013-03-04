d3.geo.clipView = function d3_geo_clipView(coordinates) {
  var clipPolygon = d3.geom.polygon(coordinates).clip;

  return function(listener) {
    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        clip.point = ringPoint;
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineEnd = lineEnd;
        clip.lineStart = lineStart;
      }
    };

    function visible(x, y) {
      var p = [x, y],
          i = -1,
          n = coordinates.length,
          a = coordinates[n - 1];
      while (++i < n) {
        b = coordinates[i];
        if (!d3_geom_polygonInside(p, a, b)) return false;
        a = b;
      }
      return true;
    }

    function point(x, y) {
      if (visible(x, y)) {
        listener.point(x, y);
      }
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
      if (v) {
        if (first) listener.lineStart();
        else if (v !== v0) {
          listener.lineStart();
          // TODO intersect
        }
        listener.point(x, y);
      } else if (v0) {
        // TODO intersect
        listener.lineEnd();
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
