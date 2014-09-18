import "../math/abs";
import "../math/trigonometry";
import "cartesian";
import "point-transformation";

var d3_geo_projectCosMinDistance = Math.cos(30 * d3_radians), // cos(minimum angular distance)
    d3_geo_projectMaxDepth = 16;

d3.geo.project = function(f, δ, sink) {
  if (arguments.length < 3) sink = δ, δ = 0;
  if (!(+δ > 0)) return d3_geo_pointTransformation(sink, function(x, y) { x = f(x, y); sink.point(x[0], x[1]); });

  var δ2 = δ * δ, // precision, px²
      λ00, φ00, x00, y00, a00, b00, c00, // first point
      λ0, x0, y0, a0, b0, c0; // previous point

  var project = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,
    polygonStart: polygonStart,
    polygonEnd: polygonEnd
  };

  function point(x, y) {
    x = f(x, y);
    sink.point(x[0], x[1]);
  }

  function lineStart() {
    x0 = NaN;
    project.point = linePoint;
    sink.lineStart();
  }

  function linePoint(λ, φ) {
    var c = d3_geo_cartesian([λ, φ]), p = f(λ, φ);
    segment(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], d3_geo_projectMaxDepth, sink);
    sink.point(x0, y0);
  }

  function lineEnd() {
    project.point = point;
    sink.lineEnd();
  }

  function ringStart() {
    lineStart();
    project.point = ringPoint;
    project.lineEnd = ringEnd;
  }

  function ringPoint(λ, φ) {
    linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
    project.point = linePoint;
  }

  function ringEnd() {
    segment(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, d3_geo_projectMaxDepth, sink);
    project.lineEnd = lineEnd;
    lineEnd();
  }

  function polygonStart() {
    sink.polygonStart();
    project.lineStart = ringStart;
  }

  function polygonEnd() {
    sink.polygonEnd();
    project.lineStart = lineStart;
  }

  function segment(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * δ2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = Math.sqrt(a * a + b * b + c * c),
          φ2 = Math.asin(c /= m),
          λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a),
          p = f(λ2, φ2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > δ2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < d3_geo_projectCosMinDistance) { // angular distance
        segment(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth);
        sink.point(x2, y2);
        segment(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth);
      }
    }
  }

  return project;
};
