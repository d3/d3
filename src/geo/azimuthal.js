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

// Deprecated; use one of d3.geo.{orthographic,stereographic,…} instead.
d3.geo.azimuthal = function() {
  var mode = "orthographic",
      m = d3_geo_projectionMutator(d3_geo_azimuthalMode),
      p = m(mode);

  p.mode = function(_) {
    if (!arguments.length) return mode;
    return m(mode = _ + "");
  };

  // Deprecated; use projection.rotate instead.
  p.origin = function(_) {
    if (!arguments.length) { var rotate = p.rotate(); return [-rotate[0], -rotate[1]]; }
    return p.rotate([-_[0], -_[1]]);
  };

  return p.scale(200);
};

var d3_geo_azimuthalModes = {
  equalarea: d3_geo_azimuthalEqualArea,
  equidistant: d3_geo_azimuthalEquidistant,
  gnomonic: d3_geo_gnomonic,
  orthographic: d3_geo_orthographic,
  stereographic: d3_geo_stereographic
};

function d3_geo_azimuthalMode(mode) {
  return d3_geo_azimuthalModes[mode];
}
