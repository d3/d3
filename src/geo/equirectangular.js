function d3_geo_equirectangular(λ, φ) {
  return [λ, φ];
}

d3_geo_equirectangular.invert = d3_geo_equirectangular;

d3.geo.equirectangular = function() {
  return d3_geo_projection(d3_geo_equirectangular).scale(500 / 2 / π);
};
