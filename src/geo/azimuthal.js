// Abstract azimuthal projection.
function d3_geo_azimuthal(scale, angle) {
  function azimuthal(λ, φ) {
    var cosλ = Math.cos(λ),
        cosφ = Math.cos(φ),
        k = scale(cosλ * cosφ);
    return [
      k * cosφ * Math.sin(λ),
      k * Math.sin(φ)
    ];
  }

  azimuthal.invert = function(x, y) {
    var ρ = Math.sqrt(x * x + y * y),
        c = angle(ρ),
        sinc = Math.sin(c),
        cosc = Math.cos(c);
    return [
      Math.atan2(x * sinc, ρ * cosc),
      Math.asin(ρ && y * sinc / ρ)
    ];
  };

  return azimuthal;
}
