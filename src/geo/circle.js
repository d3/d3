import "../math/trigonometry";
import "cartesian";
import "geo";
import "rotation";
import "spherical";

d3.geo.circle = function() {
  var origin = [0, 0],
      angle,
      precision = 6,
      interpolate;

  function circle() {
    var center = typeof origin === "function" ? origin.apply(this, arguments) : origin,
        rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert,
        ring = [];

    interpolate(null, null, 1, {
      point: function(x, y) {
        ring.push(x = rotate(x, y));
        x[0] *= d3_degrees, x[1] *= d3_degrees;
      }
    });

    return {type: "Polygon", coordinates: [ring]};
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return angle;
    interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
    return circle;
  };

  circle.precision = function(_) {
    if (!arguments.length) return precision;
    interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
    return circle;
  };

  return circle.angle(90);
};

// Interpolates along a circle centered at [0°, 0°], with a given radius and
// precision.
function d3_geo_circleInterpolate(radius, precision) {
  var cr = Math.cos(radius),
      sr = Math.sin(radius);
  return function(from, to, direction, listener) {
    var step = direction * precision;
    if (from != null) {
      from = d3_geo_circleAngle(cr, from);
      to = d3_geo_circleAngle(cr, to);
      if (direction > 0 ? from < to: from > to) from += direction * τ;
    } else {
      from = radius + direction * τ;
      to = radius - .5 * step;
    }
    for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
      listener.point((point = d3_geo_spherical([
        cr,
        -sr * Math.cos(t),
        -sr * Math.sin(t)
      ]))[0], point[1]);
    }
  };
}

// Signed angle of a cartesian point relative to [cr, 0, 0].
function d3_geo_circleAngle(cr, point) {
  var a = d3_geo_cartesian(point);
  a[0] -= cr;
  d3_geo_cartesianNormalize(a);
  var angle = d3_acos(-a[1]);
  return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
}
