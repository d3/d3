function d3_geo_equirectangular(λ, φ) {
  return [λ, φ];
}

(d3.geo.equirectangular = function() {
  return d3_geo_projection(d3_geo_equirectangular).scale(250 / π);
}).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
