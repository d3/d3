var π = Math.PI,
    ε = 1e-6,
    d3 = {version: "3.0.6"}, // semver
    d3_radians = π / 180,
    d3_degrees = 180 / π,
    d3_document = document,
    d3_window = window;

function d3_target(d) {
  return d.target;
}

function d3_source(d) {
  return d.source;
}
