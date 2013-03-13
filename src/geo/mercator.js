import "../math/trigonometry";
import "geo";
import "projection";

function d3_geo_mercator(λ, φ) {
  return [λ, Math.log(Math.tan(π / 4 + φ / 2))];
}

d3_geo_mercator.invert = function(x, y) {
  return [x, 2 * Math.atan(Math.exp(y)) - π / 2];
};

(d3.geo.mercator = function() {
  return d3_geo_projection(d3_geo_mercator);
}).raw = d3_geo_mercator;
