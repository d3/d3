import "azimuthal";
import "geo";
import "projection";

var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(
  function(cosλcosφ) { return Math.sqrt(2 / (1 + cosλcosφ)); },
  function(ρ) { return 2 * Math.asin(ρ / 2); }
);

(d3.geo.azimuthalEqualArea = function() {
  return d3_geo_projection(d3_geo_azimuthalEqualArea);
}).raw = d3_geo_azimuthalEqualArea;
