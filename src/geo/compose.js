// TODO This might be overkill.
function d3_geo_compose(a, b) {
  if (a === d3_geo_equirectangular) return b;
  if (b === d3_geo_equirectangular) return a;

  function compose(λ, φ) {
    var coordinates = a(λ, φ);
    return b(coordinates[0], coordinates[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    var coordinates = b.invert(x, y);
    return a.invert(coordinates[0], coordinates[1]);
  };

  return compose;
}
