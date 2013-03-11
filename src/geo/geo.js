d3.geo = {};

function d3_geo_asin(x) {
  return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
}

function d3_geo_sinh(x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function d3_geo_cosh(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
}
