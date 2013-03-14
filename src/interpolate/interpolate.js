import "../color/color";
import "../color/rgb";
import "rgb";
import "transform";
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

function d3_interpolateByName(name) {
  return name == "transform"
      ? d3_interpolateTransform
      : d3_interpolate;
}

d3.interpolators = [
  d3_interpolateObject,
  function(a, b) { return Array.isArray(b) && d3_interpolateArray(a, b); },
  function(a, b) { return (typeof a === "string" || typeof b === "string") && d3_interpolateString(a + "", b + ""); },
  function(a, b) { return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Color) && d3_interpolateRgb(a, b); },
  function(a, b) { return !isNaN(a = +a) && !isNaN(b = +b) && d3_interpolateNumber(a, b); }
];
