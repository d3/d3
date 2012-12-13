// TODO Unify this code with d3.geom.polygon area?

var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,

  // Only count area for polygon rings.
  polygonStart: function() {
    d3_geo_pathAreaPolygon = 0;
    d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
  },
  polygonEnd: function() {
    d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
    d3_geo_pathAreaSum += Math.abs(d3_geo_pathAreaPolygon / 2);
  }
};

function d3_geo_pathAreaRingStart() {
  var x00, y00, x0, y0;

  // For the first point, …
  d3_geo_pathArea.point = function(x, y) {
    d3_geo_pathArea.point = nextPoint;
    x00 = x0 = x, y00 = y0 = y;
  };

  // For subsequent points, …
  function nextPoint(x, y) {
    d3_geo_pathAreaPolygon += y0 * x - x0 * y;
    x0 = x, y0 = y;
  }

  // For the last point, return to the start.
  d3_geo_pathArea.lineEnd = function() {
    nextPoint(x00, y00);
  };
}
