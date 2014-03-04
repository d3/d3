import "../color/rgb";
import "object";
import "array";
import "number";
import "string";

d3.interpolate = d3_interpolate;

function d3_interpolate(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
}

d3.interpolators = [
  function(a, b) {
    var t = typeof b;
    return (t === "string" ? (d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_rgbInterpolate : d3_interpolateString)
        : t === "object" ? b.interpolate || (Array.isArray(b) ? d3_interpolateArray : d3_interpolateObject)
        : d3_interpolateNumber)(a, b);
  }
];
