import "geo";
import "mercator";
import "transverse";

d3.geo.transverseMercator = function() {
  return d3_geo_transverse(d3.geo.mercator());
};
