import "azimuthal";
import "geo";
import "projection";

var d3_geo_stereographic = d3_geo_azimuthal(
  function(coslambdacosphi) { return 1 / (1 + coslambdacosphi); },
  function(rho) { return 2 * Math.atan(rho); }
);

(d3.geo.stereographic = function() {
  return d3_geo_projection(d3_geo_stereographic);
}).raw = d3_geo_stereographic;
