import "../interpolate/rgb";

function d3_Color() {}

d3_Color.prototype.interpolate = d3_interpolateRgb;

d3_Color.prototype.toString = function() {
  return this.rgb() + "";
};
