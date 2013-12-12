import "geo";
import "mercator";
import "transverse";

(d3.geo.transverseMercator = function() {
  return d3_geo_mercatorProjection(d3_geo_transverseProjection(d3_geo_mercator));
}).raw = d3_geo_mercator;
