// Abstract azimuthal projection.
function d3_geo_azimuthal(scale, angle) {
  function azimuthal(lambda, phi) {
    var coslambda = Math.cos(lambda),
        cosphi = Math.cos(phi),
        k = scale(coslambda * cosphi);
    return [
      k * cosphi * Math.sin(lambda),
      k * Math.sin(phi)
    ];
  }

  azimuthal.invert = function(x, y) {
    var rho = Math.sqrt(x * x + y * y),
        c = angle(rho),
        sinc = Math.sin(c),
        cosc = Math.cos(c);
    return [
      Math.atan2(x * sinc, rho * cosc),
      Math.asin(rho && y * sinc / rho)
    ];
  };

  return azimuthal;
}
