function d3_geo_antemeridianLine(rotate, project) {
  return function(lineString, context) {
    d3_geo_antemeridianClipLine(rotate, project, lineString, context);
  };
}

function d3_geo_antemeridianRing(rotate, project) {
  return function(ring, context) {
    d3_geo_antemeridianClipLine(rotate, project, ring, context);
    context.closePath();
  };
}

function d3_geo_antemeridianClipLine(rotate, project, lineString, context) {
  if (!(n = lineString.length)) return;
  var λ0, φ0, λ1, φ1, δλ, sλ0, n,
      location = rotate(lineString[0]),
      point = project(λ0 = location[0], φ0 = location[1]),
      intersection;
  context.moveTo(point[0], point[1]);
  for (var i = 0, j = 0; j < n; j++) {
    location = rotate(lineString[j]);
    point = project(λ1 = location[0], φ1 = location[1]);
    δλ = (Math.abs(λ1 - λ0) + 2 * π) % (2 * π);
    sλ0 = λ0 > 0;
    if (j > i && sλ0 ^ (λ1 > 0) && (δλ >= π || δλ < ε && Math.abs(Math.abs(λ0) - π) < ε)) {
      φ0 = d3_geo_antemeridianIntersect(λ0, φ0, λ1, φ1);
      context.lineTo((intersection = project(sλ0 ? π : -π, φ0))[0], intersection[1]);
      context.moveTo((intersection = project(sλ0 ? -π : π, φ0))[0], intersection[1]);
    }
    context.lineTo(point[0], point[1]);
    λ0 = λ1;
    φ0 = φ1;
  }
}

function d3_geo_antemeridianIntersect(λ0, φ0, λ1, φ1) {
  var cosφ0, cosφ1,
      sinλ0_λ1 = Math.sin(λ0 - λ1);
  return Math.abs(sinλ0_λ1) > ε
      ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1)
                 - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0))
                 / (cosφ0 * cosφ1 * sinλ0_λ1))
      : (φ0 + φ1) / 2;
}
