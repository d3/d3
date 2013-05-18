import "../math/trigonometry";
import "geo";

// Length returned in radians; multiply by radius for distance.
d3.geo.distance = function(a, b) {
  var Δλ = (b[0] - a[0]) * d3_radians,
      φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians,
      sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ),
      sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0),
      sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1),
      t;
  return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
};
