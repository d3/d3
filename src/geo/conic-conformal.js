import "../math/abs";
import "../math/trigonometry";
import "conic";
import "geo";
import "projection";

function d3_geo_conicConformal(phi0, phi1) {
  var cosphi0 = Math.cos(phi0),
      t = function(phi) { return Math.tan(pi / 4 + phi / 2); },
      n = phi0 === phi1 ? Math.sin(phi0) : Math.log(cosphi0 / Math.cos(phi1)) / Math.log(t(phi1) / t(phi0)),
      F = cosphi0 * Math.pow(t(phi0), n) / n;

  if (!n) return d3_geo_mercator;

  function forward(lambda, phi) {
    if (F > 0) { if (phi < -halfpi + epsilon) phi = -halfpi + epsilon; }
    else { if (phi > halfpi - epsilon) phi = halfpi - epsilon; }
    var rho = F / Math.pow(t(phi), n);
    return [
      rho * Math.sin(n * lambda),
      F - rho * Math.cos(n * lambda)
    ];
  }

  forward.invert = function(x, y) {
    var rho0_y = F - y,
        rho = d3_sgn(n) * Math.sqrt(x * x + rho0_y * rho0_y);
    return [
      Math.atan2(x, rho0_y) / n,
      2 * Math.atan(Math.pow(F / rho, 1 / n)) - halfpi
    ];
  };

  return forward;
}

(d3.geo.conicConformal = function() {
  return d3_geo_conic(d3_geo_conicConformal);
}).raw = d3_geo_conicConformal;
