import "centroid";

// TODO Unify this code with d3.geom.polygon centroid?
// TODO Enforce positive area for exterior, negative area for interior?

var d3_geo_pathCentroid = {
  point: d3_geo_pathCentroidPoint,

  // For lines, weight by length.
  lineStart: d3_geo_pathCentroidLineStart,
  lineEnd: d3_geo_pathCentroidLineEnd,

  // For polygons, weight by area.
  polygonStart: function() {
    d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
  },
  polygonEnd: function() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
    d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
    d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
  }
};

function d3_geo_pathCentroidPoint(x, y) {
  d3_geo_centroidX0 += x;
  d3_geo_centroidY0 += y;
  ++d3_geo_centroidZ0;
}

function d3_geo_pathCentroidLineStart() {
  var x0, y0;

  d3_geo_pathCentroid.point = function(x, y) {
    d3_geo_pathCentroid.point = nextPoint;
    d3_geo_pathCentroidPoint(x0 = x, y0 = y);
  };

  function nextPoint(x, y) {
    var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
    d3_geo_centroidX1 += z * (x0 + x) / 2;
    d3_geo_centroidY1 += z * (y0 + y) / 2;
    d3_geo_centroidZ1 += z;
    d3_geo_pathCentroidPoint(x0 = x, y0 = y);
  }
}

function d3_geo_pathCentroidLineEnd() {
  d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
}

function d3_geo_pathCentroidRingStart() {
  var x00, y00, x0, y0;

  // For the first point, …
  d3_geo_pathCentroid.point = function(x, y) {
    d3_geo_pathCentroid.point = nextPoint;
    d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
  };

  // For subsequent points, …
  function nextPoint(x, y) {
    var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
    d3_geo_centroidX1 += z * (x0 + x) / 2;
    d3_geo_centroidY1 += z * (y0 + y) / 2;
    d3_geo_centroidZ1 += z;

    z = y0 * x - x0 * y;
    d3_geo_centroidX2 += z * (x0 + x);
    d3_geo_centroidY2 += z * (y0 + y);
    d3_geo_centroidZ2 += z * 3;
    d3_geo_pathCentroidPoint(x0 = x, y0 = y);
  }

  // For the last point, return to the start.
  d3_geo_pathCentroid.lineEnd = function() {
    nextPoint(x00, y00);
  };
}
