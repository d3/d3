import "../math/abs";
import "../math/trigonometry";
import "conic";
import "equirectangular";
import "geo";
import "projection";

function d3_geo_conicEquidistant(φ0, φ1) {
  var cosφ0 = Math.cos(φ0),
      n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0),
      G = cosφ0 / n + φ0;

  if (abs(n) < ε) return d3_geo_equirectangular;

  function forward(λ, φ) {
    var ρ = G - φ;
    return [
      ρ * Math.sin(n * λ),
      G - ρ * Math.cos(n * λ)
    ];
  }

  forward.invert = function(x, y) {
    var ρ0_y = G - y;
    return [
      Math.atan2(x, ρ0_y) / n,
      G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y)
    ];
  };

  return forward;
}

(d3.geo.conicEquidistant = function() {
  return d3_geo_conic(d3_geo_conicEquidistant);
}).raw = d3_geo_conicEquidistant;
