d3.tween = d3_tweenInterpolate(d3.interpolate);
d3.tweenRgb = d3_tweenInterpolate(d3.interpolateRgb);

function d3_tweenInterpolate(I) {
  return function(a, b) {
    var i = I(a, b);
    return function() {
      return i(d3.time);
    };
  };
}

function d3_tweenByName(n) {
  return n in d3_interpolate_rgb || /\bcolor\b/.test(n)
      ? d3.tweenRgb
      : d3.tween;
}
