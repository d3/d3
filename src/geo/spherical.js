import "../math/abs";
import "../math/trigonometry";

function d3_geo_spherical(cartesian) {
  return [
    Math.atan2(cartesian[1], cartesian[0]),
    d3_asin(cartesian[2])
  ];
}

function d3_geo_sphericalEqual(a, b) {
  return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
}
