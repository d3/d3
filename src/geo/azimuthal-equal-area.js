import "azimuthal";
import "geo";
import "projection";

var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(
  function(coslambdacosphi) { return Math.sqrt(2 / (1 + coslambdacosphi)); },
  function(rho) { return 2 * Math.asin(rho / 2); }
);

(d3.geo.azimuthalEqualArea = function() {
  return d3_geo_projection(d3_geo_azimuthalEqualArea);
}).raw = d3_geo_azimuthalEqualArea;
