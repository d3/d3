var π = Math.PI,
    ε = 1e-6,
    ε2 = ε * ε,
    d3_radians = π / 180,
    d3_degrees = 180 / π;

function d3_sgn(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function d3_acos(x) {
  return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
}

function d3_asin(x) {
  return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
}

function d3_sinh(x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
}

function d3_cosh(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
}

function d3_tanh(x) {
  return d3_sinh(x) / d3_cosh(x);
}

function d3_haversin(x) {
  return (x = Math.sin(x / 2)) * x;
}
