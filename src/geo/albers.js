function d3_geo_albers(φ0, φ1) {
  var sinφ0 = Math.sin(φ0),
      n = (sinφ0 + Math.sin(φ1)) / 2,
      C = 1 + sinφ0 * (2 * n - sinφ0),
      ρ0 = Math.sqrt(C) / n;

  function albers(λ, φ) {
    var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
    return [
      ρ * Math.sin(n * λ),
      ρ0 - ρ * Math.cos(n * λ)
    ];
  }

  albers.invert = function(x, y) {
    var ρ0_y = ρ0 - y;
    return [
      Math.atan2(x, ρ0_y) / n,
      Math.asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n))
    ];
  };

  return albers;
}

d3.geo.albers = function() {
  var p = d3_geo_doubleParallelProjection(d3_geo_albers)
      .rotate([98, 0])
      .center([0, 38])
      .parallels([29.5, 45.5])
      .scale(1000);

  // Deprecated; use projection.rotate and projection.center instead.
  p.origin = function(_) {
    var rotate = p.rotate(),
        center = p.center();
    if (!arguments.length) return [-rotate[0], center[1]];
    return p.rotate([-_[0], rotate[1]]).center([center[0], _[1]]);
  };

  return p;
};

// TODO Expose this API? Rename conicProjection?
function d3_geo_doubleParallelProjection(projectAt) {
  var φ0 = 0,
      φ1 = π / 3,
      m = d3_geo_projectionMutator(projectAt),
      p = m(φ0, φ1);

  p.parallels = function(_) {
    if (!arguments.length) return [φ0 * d3_degrees, φ1 * d3_degrees];
    return m(φ0 = _[0] * d3_radians, φ1 = _[1] * d3_radians);
  };

  return p;
}
