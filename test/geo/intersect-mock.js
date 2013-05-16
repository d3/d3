import "../../src/geo/geo";
import "../../src/geo/intersect";
import "../../src/math/trigonometry";

d3.geo.intersect = function(a, b) {
  return d3_geo_intersect(
      new d3_geo_intersectSegment(a[0], a[1]),
      new d3_geo_intersectSegment(b[0], b[1]));
};
