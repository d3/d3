import "../math/trigonometry";
import "geo";
import "mercator";

function d3_geo_transverseMercator(lambda, phi) {
  return [Math.log(Math.tan(pi / 4 + phi / 2)), -lambda];
}

d3_geo_transverseMercator.invert = function(x, y) {
  return [-y, 2 * Math.atan(Math.exp(x)) - halfpi];
};

(d3.geo.transverseMercator = function() {
  var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator),
      center = projection.center,
      rotate = projection.rotate;

  projection.center = function(_) {
    return _
        ? center([-_[1], _[0]])
        : ((_ = center()), [_[1], -_[0]]);
  };

  projection.rotate = function(_) {
    return _
        ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90])
        : ((_ = rotate()), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90]);
}).raw = d3_geo_transverseMercator;
