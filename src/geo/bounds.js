d3.geo.bounds = function(feature) {
  d3_geo_boundsTop = d3_geo_boundsRight = -(d3_geo_boundsLeft = d3_geo_boundsBottom = Infinity);
  d3_geo_bounds.object(feature);
  return [[d3_geo_boundsLeft, d3_geo_boundsBottom], [d3_geo_boundsRight, d3_geo_boundsTop]];
};

var d3_geo_boundsLeft,
    d3_geo_boundsBottom,
    d3_geo_boundsRight,
    d3_geo_boundsTop;

var d3_geo_bounds = d3_geo_type({
  point: function(point) {
    var x = point[0], y = point[1];
    if (x < d3_geo_boundsLeft) d3_geo_boundsLeft = x;
    if (x > d3_geo_boundsRight) d3_geo_boundsRight = x;
    if (y < d3_geo_boundsBottom) d3_geo_boundsBottom = y;
    if (y > d3_geo_boundsTop) d3_geo_boundsTop = y;
  },
  polygon: function(coordinates) {
    this.line(coordinates[0]); // ignore holes
  }
});
