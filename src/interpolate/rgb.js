import "../color/rgb";

d3.interpolateRgb = d3_interpolateRgb;

function d3_interpolateRgb(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    a.r = Math.round(ar + br * t);
    a.g = Math.round(ag + bg * t);
    a.b = Math.round(ab + bb * t);
    return a;
  };
}
