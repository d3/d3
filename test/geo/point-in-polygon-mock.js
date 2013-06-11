import "../../src/geo/point-in-polygon";
import "../../src/math/trigonometry";

d3.geo.pointInPolygon = function(polygon) {
  polygon = polygon.map(function(ring) {
    ring = ring.map(pointRadians);
    ring.pop();
    return ring;
  });

  return function(point) {
    return d3_geo_pointInPolygon(pointRadians(point), polygon);
  };

  function pointRadians(point) {
    return [point[0] * d3_radians, point[1] * d3_radians];
  }
};
