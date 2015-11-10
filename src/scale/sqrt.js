import "pow";
import "scale";

d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(0.5);
};
