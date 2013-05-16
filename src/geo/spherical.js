import "../math/abs";
import "../math/trigonometry";

function d3_geo_spherical(cartesian) {
  return [
    Math.atan2(cartesian[1], cartesian[0]),
    d3_asin(cartesian[2])
  ];
}

function d3_geo_sphericalEqual(a, b) {
  return abs(a[1] - b[1]) < ε && (abs(abs(a[1]) - π / 2) < ε ||
       d3_geo_sphericalLongitudeDifference(a[0], b[0]) < ε);
}

function d3_geo_sphericalLongitudeDifference(λ0, λ1) {
  var dλ = abs(λ1 - λ0);
  return dλ > π ? 2 * π - dλ : dλ;
}
