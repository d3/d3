function d3_geo_mercator(λ, φ) {
  return [
    λ / (2 * π),
    Math.max(-.5, Math.min(+.5, Math.log(Math.tan(π / 4 + φ / 2)) / (2 * π)))
  ];
}

d3_geo_mercator.invert = function(x, y) {
  return [
    2 * π * x,
    2 * Math.atan(Math.exp(2 * π * y)) - π / 2
  ];
};

(d3.geo.mercator = function() {
  return d3_geo_projection(d3_geo_mercator).scale(500);
}).raw = d3_geo_mercator;
