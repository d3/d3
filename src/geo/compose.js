// TODO This might be overkill.
function d3_geo_compose(a, b) {
  if (a === d3_geo_equirectangular) return b;
  if (b === d3_geo_equirectangular) return a;

  function compose(λ, φ) {
    return b.apply(b, a(λ, φ));
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return a.invert.apply(a, b.invert(x, y));
  };

  return compose;
}
