// TODO Unify this code with d3.geom.polygon area?

var d3_geo_pathAreaScale, d3_geo_pathArea = {
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,

  // Only count area for polygon rings.
  polygonStart: function() {
    d3_geo_pathAreaScale = .5;
    d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    d3_geo_pathArea.lineEnd = d3_geo_pathAreaRingEnd;
  },
  polygonEnd: function() {
    d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
  }
};

function d3_geo_pathAreaRingStart() {
  var x0, y0;

  d3_geo_areaRing = 0;

  // For the first point, …
  d3_geo_pathArea.point = function(x, y) {
    d3_geo_pathArea.point = nextPoint;
    x0 = x, y0 = y;
  };

  // For subsequent points, …
  function nextPoint(x, y) {
    d3_geo_areaRing += y0 * x - x0 * y;
    x0 = x, y0 = y;
  }
}

function d3_geo_pathAreaRingEnd() {
  d3_geo_areaSum += Math.abs(d3_geo_areaRing) * d3_geo_pathAreaScale;
  d3_geo_pathAreaScale = -.5;
}
