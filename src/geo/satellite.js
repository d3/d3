import "geo";

// TODO inverse

d3.geo.satellite = function(P, ω) {
  var vertical = d3_geo_satelliteVertical(P);
  if (!+ω) return vertical;
  var cosω = Math.cos(ω),
      sinω = Math.sin(ω);

  return function(λ, φ) {
    var coordinates = vertical(λ, φ),
        x = coordinates[0],
        y = coordinates[1],
        A = y * sinω / (P - 1) + cosω;
    return [
      x * cosω / A,
      y / A
    ];
  };
}

function d3_geo_satelliteVertical(P) {
  return function(λ, φ) {
    var cosφ = Math.cos(φ),
        k = (P - 1) / (P - cosφ * Math.cos(λ));
    return [
      k * cosφ * Math.sin(λ),
      k * Math.sin(φ)
    ];
  };
}
