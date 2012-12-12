var d3_geo_streamListener = d3.geo.streamListener = function() {};

d3_geo_streamListener.prototype = {
  sphere: d3_noop,
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,
  polygonStart: d3_noop,
  polygonEnd: d3_noop
};
