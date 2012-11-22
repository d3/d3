d3 = {version: "3.0.0pre"}; // semver

var π = Math.PI,
    ε = 1e-6,
    εε = 1e-3,
    d3_radians = π / 180,
    d3_degrees = 180 / π;

function d3_zero() {
  return 0;
}

function d3_target(d) {
  return d.target;
}

function d3_source(d) {
  return d.source;
}
