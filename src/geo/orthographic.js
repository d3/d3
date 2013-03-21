import "azimuthal";
import "geo";
import "projection";

var d3_geo_orthographic = d3_geo_azimuthal(
  function() { return 1; },
  Math.asin
);

(d3.geo.orthographic = function() {
  return d3_geo_projection(d3_geo_orthographic);
}).raw = d3_geo_orthographic;
