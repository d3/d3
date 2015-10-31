import "../math/trigonometry";
import "geo";
import "conic";
import "projection";

function d3_geo_conicEqualArea(phi0, phi1) {
  var sinphi0 = Math.sin(phi0),
      n = (sinphi0 + Math.sin(phi1)) / 2,
      C = 1 + sinphi0 * (2 * n - sinphi0),
      rho0 = Math.sqrt(C) / n;

  function forward(lambda, phi) {
    var rho = Math.sqrt(C - 2 * n * Math.sin(phi)) / n;
    return [
      rho * Math.sin(lambda *= n),
      rho0 - rho * Math.cos(lambda)
    ];
  }

  forward.invert = function(x, y) {
    var rho0_y = rho0 - y;
    return [
      Math.atan2(x, rho0_y) / n,
      d3_asin((C - (x * x + rho0_y * rho0_y) * n * n) / (2 * n))
    ];
  };

  return forward;
}

(d3.geo.conicEqualArea = function() {
  return d3_geo_conic(d3_geo_conicEqualArea);
}).raw = d3_geo_conicEqualArea;
