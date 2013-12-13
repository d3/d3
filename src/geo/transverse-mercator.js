import "../math/trigonometry";
import "geo";
import "mercator";

function d3_geo_transverseMercator(λ, φ) {
  return [Math.log(Math.tan(π / 4 + φ / 2)), -λ];
}

d3_geo_transverseMercator.invert = function(x, y) {
  return [-y, 2 * Math.atan(Math.exp(x)) - halfπ];
};

(d3.geo.transverseMercator = function() {
  var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator),
      center = projection.center,
      rotate = projection.rotate;

  projection.center = function(_) {
    return _
        ? center([-_[1], _[0]])
        : ((_ = center()), [-_[1], _[0]]);
  };

  projection.rotate = function(_) {
    return _
        ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90])
        : ((_ = rotate()), [_[0], _[1], _[2] - 90]);
  };

  return projection.rotate([0, 0]);
}).raw = d3_geo_transverseMercator;
