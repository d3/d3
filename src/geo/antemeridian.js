function d3_geo_antemeridianLine(rotate, p) {
  return function(lineString, context) {
    d3_geo_antemeridianClipLine(rotate, lineString, d3_geo_antemeridianContext(p, context));
  };
}

function d3_geo_antemeridianRing(rotate, p) {
  return function(ring, context) {
    d3_geo_antemeridianClipLine(rotate, ring, d3_geo_antemeridianContext(p, context));
    context.closePath();
  };
}

function d3_geo_antemeridianClipLine(rotate, lineString, context) {
  if (!(n = lineString.length)) return;
  var point = rotate(lineString[0]);
  context.moveTo(λ0 = point[0], φ0 = point[1]);
  for (var λ0, φ0, i = 0, j = 0, n; j < n; j++) {
    point = rotate(lineString[j]);
    var λ1 = point[0],
        φ1 = point[1],
        δλ = (Math.abs(λ1 - λ0) + 2 * π) % (2 * π),
        sλ0 = λ0 > 0;
    if (j > i && sλ0 ^ (λ1 > 0) && (δλ >= π || δλ < ε && Math.abs(Math.abs(λ0) - π) < ε)) {
      φ0 = d3_geo_antemeridianIntersect(λ0, φ0, λ1, φ1);
      context.lineTo(sλ0 ? π : -π, φ0);
      context.moveTo(sλ0 ? -π : π, φ0);
    }
    context.lineTo(λ0 = λ1, φ0 = φ1);
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

function d3_geo_antemeridianContext(p, context) {
  return {
    moveTo: function(x, y) { var point = p(x, y); context.moveTo(point[0], point[1]); },
    lineTo: function(x, y) { var point = p(x, y); context.lineTo(point[0], point[1]); },
    closePath: function() { context.closePath(); }
  };
}
