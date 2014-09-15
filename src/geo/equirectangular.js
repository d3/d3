import "geo";
// import "projection";

d3.geo.equirectangular = function(λ, φ) {
  return [λ, φ];
};

// (d3.geo.equirectangular = function() {
//   return d3_geo_projection(d3_geo_equirectangular);
// }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
