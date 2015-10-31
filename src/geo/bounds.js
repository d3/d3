import "../math/abs";
import "geo";
import "stream";
import "area";
import "cartesian";
import "spherical";

d3.geo.bounds = (function() {
  var lambda0, phi0, lambda1, phi1, // bounds
      lambda_, // previous lambda-coordinate
      lambda__, phi__, // first point
      p0, // previous 3D point
      dlambdaSum,
      ranges,
      range;

  var bound = {
    point: point,
    lineStart: lineStart,
    lineEnd: lineEnd,

    polygonStart: function() {
      bound.point = ringPoint;
      bound.lineStart = ringStart;
      bound.lineEnd = ringEnd;
      dlambdaSum = 0;
      d3_geo_area.polygonStart();
    },
    polygonEnd: function() {
      d3_geo_area.polygonEnd();
      bound.point = point;
      bound.lineStart = lineStart;
      bound.lineEnd = lineEnd;
      if (d3_geo_areaRingSum < 0) lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
      else if (dlambdaSum > epsilon) phi1 = 90;
      else if (dlambdaSum < -epsilon) phi0 = -90;
      range[0] = lambda0, range[1] = lambda1;
    }
  };

  function point(lambda, phi) {
    ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
    if (phi < phi0) phi0 = phi;
    if (phi > phi1) phi1 = phi;
  }

  function linePoint(lambda, phi) {
    var p = d3_geo_cartesian([lambda * d3_radians, phi * d3_radians]);
    if (p0) {
      var normal = d3_geo_cartesianCross(p0, p),
          equatorial = [normal[1], -normal[0], 0],
          inflection = d3_geo_cartesianCross(equatorial, normal);
      d3_geo_cartesianNormalize(inflection);
      inflection = d3_geo_spherical(inflection);
      var dlambda = lambda - lambda_,
          s = dlambda > 0 ? 1 : -1,
          lambdai = inflection[0] * d3_degrees * s,
          antimeridian = abs(dlambda) > 180;
      if (antimeridian ^ (s * lambda_ < lambdai && lambdai < s * lambda)) {
        var phii = inflection[1] * d3_degrees;
        if (phii > phi1) phi1 = phii;
      } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (s * lambda_ < lambdai && lambdai < s * lambda)) {
        var phii = -inflection[1] * d3_degrees;
        if (phii < phi0) phi0 = phii;
      } else {
        if (phi < phi0) phi0 = phi;
        if (phi > phi1) phi1 = phi;
      }
      if (antimeridian) {
        if (lambda < lambda_) {
          if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
        }
      } else {
        if (lambda1 >= lambda0) {
          if (lambda < lambda0) lambda0 = lambda;
          if (lambda > lambda1) lambda1 = lambda;
        } else {
          if (lambda > lambda_) {
            if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
          } else {
            if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
          }
        }
      }
    } else {
      point(lambda, phi);
    }
    p0 = p, lambda_ = lambda;
  }

  function lineStart() { bound.point = linePoint; }
  function lineEnd() {
    range[0] = lambda0, range[1] = lambda1;
    bound.point = point;
    p0 = null;
  }

  function ringPoint(lambda, phi) {
    if (p0) {
      var dlambda = lambda - lambda_;
      dlambdaSum += abs(dlambda) > 180 ? dlambda + (dlambda > 0 ? 360 : -360) : dlambda;
    } else lambda__ = lambda, phi__ = phi;
    d3_geo_area.point(lambda, phi);
    linePoint(lambda, phi);
  }

  function ringStart() {
    d3_geo_area.lineStart();
  }

  function ringEnd() {
    ringPoint(lambda__, phi__);
    d3_geo_area.lineEnd();
    if (abs(dlambdaSum) > epsilon) lambda0 = -(lambda1 = 180);
    range[0] = lambda0, range[1] = lambda1;
    p0 = null;
  }

  // Finds the left-right distance between two longitudes.
  // This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
  // the distance between ±180° to be 360°.
  function angle(lambda0, lambda1) { return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1; }

  function compareRanges(a, b) { return a[0] - b[0]; }

  function withinRange(x, range) {
    return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
  }

  return function(feature) {
    phi1 = lambda1 = -(lambda0 = phi0 = Infinity);
    ranges = [];

    d3.geo.stream(feature, bound);

    var n = ranges.length;
    if (n) {
      // First, sort ranges by their minimum longitudes.
      ranges.sort(compareRanges);

      // Then, merge any ranges that overlap.
      for (var i = 1, a = ranges[0], b, merged = [a]; i < n; ++i) {
        b = ranges[i];
        if (withinRange(b[0], a) || withinRange(b[1], a)) {
          if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
          if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
        } else {
          merged.push(a = b);
        }
      }

      // Finally, find the largest gap between the merged ranges.
      // The final bounding box will be the inverse of this gap.
      var best = -Infinity, dlambda;
      for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
        b = merged[i];
        if ((dlambda = angle(a[1], b[0])) > best) best = dlambda, lambda0 = b[0], lambda1 = a[1];
      }
    }
    ranges = range = null;

    return lambda0 === Infinity || phi0 === Infinity
        ? [[NaN, NaN], [NaN, NaN]]
        : [[lambda0, phi0], [lambda1, phi1]];
  };
})();
