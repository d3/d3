import "../math/trigonometry";
import "geo";
import "mercator";
import "projection";

function d3_geo_transverseMercator(λ, φ) {
  var B = Math.cos(φ) * Math.sin(λ);
  return [
    Math.log((1 + B) / (1 - B)) / 2,
    Math.atan2(Math.tan(φ), Math.cos(λ))
  ];
}

d3_geo_transverseMercator.invert = function(x, y) {
  return [
    Math.atan2(d3_sinh(x), Math.cos(y)),
    d3_asin(Math.sin(y) / d3_cosh(x))
  ];
};

(d3.geo.transverseMercator = function() {
  return d3_geo_mercatorProjection(d3_geo_transverseMercator);
}).raw = d3_geo_transverseMercator;
