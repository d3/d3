// TODO Unify this code with d3.geom.polygon centroid?
// TODO Enforce positive area for exterior, negative area for interior?

var d3_geo_pathCentroid = {
  point: function(x, y) {
    d3_geo_centroidX += x;
    d3_geo_centroidY += y;
    ++d3_geo_centroidZ;
  },

  // For lines, weight by length.
  lineStart: d3_geo_pathCentroidLineStart,
  lineEnd: function() { d3_geo_pathCentroid.point = d3_noop; },

  // For polygons, weight by area.
  polygonStart: function() { d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart; },
  polygonEnd: function() { d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart; }
};

function d3_geo_pathCentroidLineStart() {
  var x0, y0;

  d3_geo_pathCentroid.point = function(x, y) {
    d3_geo_pathCentroid.point = nextPoint;
    x0 = x, y0 = y;
  };

  function nextPoint(x, y) {
    var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
    d3_geo_centroidX += z * (x0 + x) / 2;
    d3_geo_centroidY += z * (y0 + y) / 2;
    d3_geo_centroidZ += z;
    x0 = x, y0 = y;
  }
}

function d3_geo_pathCentroidRingStart() {
  var x0, y0;

  d3_geo_pathCentroid.point = function(x, y) {
    d3_geo_pathCentroid.point = nextPoint;
    x0 = x, y0 = y;
  };

  function nextPoint(x, y) {
    var dx = x - x0, dy = y - y0, z = y0 * x - x0 * y;
    d3_geo_centroidX += z * (x0 + x);
    d3_geo_centroidY += z * (y0 + y);
    d3_geo_centroidZ += z * 3;
    x0 = x, y0 = y;
  }
}
