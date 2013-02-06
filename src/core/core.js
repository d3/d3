d3 = {version: "3.0.5"}; // semver

var π = Math.PI,
    ε = 1e-6,
    d3_radians = π / 180,
    d3_degrees = 180 / π,
    d3_document = typeof document !== "undefined" ? document : {},
    d3_window = typeof window !== "undefined" ? window : {};

function d3_target(d) {
  return d.target;
}

function d3_source(d) {
  return d.source;
}
