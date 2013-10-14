import "../core/noop";
import "../math/abs";
import "../math/trigonometry";
import "geo";
import "stream";

d3.geo.length = function(object) {
  d3_geo_lengthSum = 0;
  d3.geo.stream(object, d3_geo_length);
  return d3_geo_lengthSum;
};

var d3_geo_lengthSum;

var d3_geo_length = {
  sphere: d3_noop,
  point: d3_noop,
  lineStart: d3_geo_lengthLineStart,
  lineEnd: d3_noop,
  polygonStart: d3_noop,
  polygonEnd: d3_noop
};

function d3_geo_lengthLineStart() {
  var λ0, sinφ0, cosφ0;

  d3_geo_length.point = function(λ, φ) {
    λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
    d3_geo_length.point = nextPoint;
  };

  d3_geo_length.lineEnd = function() {
    d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
  };

  function nextPoint(λ, φ) {
    var sinφ = Math.sin(φ *= d3_radians),
        cosφ = Math.cos(φ),
        t = abs((λ *= d3_radians) - λ0),
        cosΔλ = Math.cos(t);
    d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
    λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
  }
}
