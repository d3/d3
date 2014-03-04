import "rgb";

function d3_Color() {}

d3_Color.prototype.interpolate = d3_rgbInterpolate;

d3_Color.prototype.toString = function() {
  return this.rgb() + "";
};
