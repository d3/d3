import "../math/abs";
import "../math/trigonometry";
import "conic";
import "equirectangular";
import "geo";
import "projection";

function d3_geo_conicEquidistant(phi0, phi1) {
  var cosphi0 = Math.cos(phi0),
      n = phi0 === phi1 ? Math.sin(phi0) : (cosphi0 - Math.cos(phi1)) / (phi1 - phi0),
      G = cosphi0 / n + phi0;

  if (abs(n) < epsilon) return d3_geo_equirectangular;

  function forward(lambda, phi) {
    var rho = G - phi;
    return [
      rho * Math.sin(n * lambda),
      G - rho * Math.cos(n * lambda)
    ];
  }

  forward.invert = function(x, y) {
    var rho0_y = G - y;
    return [
      Math.atan2(x, rho0_y) / n,
      G - d3_sgn(n) * Math.sqrt(x * x + rho0_y * rho0_y)
    ];
  };

  return forward;
}

(d3.geo.conicEquidistant = function() {
  return d3_geo_conic(d3_geo_conicEquidistant);
}).raw = d3_geo_conicEquidistant;
