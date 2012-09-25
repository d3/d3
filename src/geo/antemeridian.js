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
  var λ0, φ0, λ1, φ1, δλ, sλ0, i = 0, n,
      point = rotate(lineString[0]);
  point = project(λ0 = point[0], φ0 = point[1]);
  context.moveTo(point[0], point[1]);
  while (++i < n) {
    λ1 = (point = rotate(lineString[i]))[0];
    φ1 = point[1];
    δλ = (Math.abs(λ1 - λ0) + 2 * π) % (2 * π);
    sλ0 = λ0 > 0;
    if (sλ0 ^ (λ1 > 0) && (δλ >= π || δλ < ε && Math.abs(Math.abs(λ0) - π) < ε)) {
      φ0 = d3_geo_antemeridianIntersect(λ0, φ0, λ1, φ1);
      context.lineTo((point = project(sλ0 ? π : -π, φ0))[0], point[1]);
      context.moveTo((point = project(sλ0 ? -π : π, φ0))[0], point[1]);
    }
    context.lineTo((point = project(λ0 = λ1, φ0 = φ1))[0], point[1]);
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
