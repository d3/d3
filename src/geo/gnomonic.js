import "azimuthal";
import "geo";
import "projection";

var d3_geo_gnomonic = d3_geo_azimuthal(
  function(coslambdacosphi) { return 1 / coslambdacosphi; },
  Math.atan
);

(d3.geo.gnomonic = function() {
  return d3_geo_projection(d3_geo_gnomonic);
}).raw = d3_geo_gnomonic;
