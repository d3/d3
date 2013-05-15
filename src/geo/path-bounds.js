import "../core/noop";

var d3_geo_pathBoundsX0,
    d3_geo_pathBoundsY0,
    d3_geo_pathBoundsX1,
    d3_geo_pathBoundsY1;

var d3_geo_pathBounds = {
  point: d3_geo_pathBoundsPoint,
  lineStart: d3_noop,
  lineEnd: d3_noop,
  polygonStart: d3_noop,
  polygonEnd: d3_noop
};

function d3_geo_pathBoundsPoint(x, y) {
  if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
  if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
  if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
  if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
}
