import "rgb";

function d3_Color() {}

var d3_colorPrototype = d3_Color.prototype;

d3_colorPrototype.toString = function() {
  return this.rgb() + "";
};
