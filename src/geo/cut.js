// Cut features along the antimeridian.
var d3_geo_cut = {
  point: function(point, context) { context.point(point[0], point[1]); },
  line: d3_geo_cutLine,
  polygon: function(polygon, context) {
    d3_geo_clipPolygon(polygon, context, d3_geo_cutLine, d3_geo_cutInterpolate);
  },
  sphere: function(context) {
    d3_geo_clipSphere(context, d3_geo_cutInterpolate);
  }
}

// Takes a line and cuts into visible segments. Return values:
//   0: there were intersections or the line was empty.
//   1: no intersections.
//   2: there were intersections, and the first and last segments should be
//      rejoined.
function d3_geo_cutLine(line, context) {
  if (!(n = line.length)) return 0;
  var point = line[0],
      λ0 = point[0],
      φ0 = point[1],
      λ1,
      φ1,
      sλ0 = λ0 > 0 ? π : -π,
      sλ1,
      dλ,
      i = 0,
      n,
      clean = 1; // no intersections
  context.moveTo(λ0, φ0);
  while (++i < n) {
    point = line[i];
    λ1 = point[0];
    φ1 = point[1];
    sλ1 = λ1 > 0 ? π : -π;
    dλ = Math.abs(λ1 - λ0);
    if (Math.abs(dλ - π) < ε) { // line crosses a pole
      context.lineTo(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
      context.lineTo(sλ0, φ0);
      context.moveTo(sλ1, φ0);
      context.lineTo(λ1, φ0);
      clean = 0;
    } else if (sλ0 !== sλ1 && dλ >= π) { // line crosses antemeridian
      // handle degeneracies
      if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
      if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
      φ0 = d3_geo_cutIntersect(λ0, φ0, λ1, φ1);
      context.lineTo(sλ0, φ0);
      context.moveTo(sλ1, φ0);
      clean = 0;
    }
    context.lineTo(λ0 = λ1, φ0 = φ1);
    sλ0 = sλ1;
  }
  // if there are intersections, we always rejoin the first and last segments.
  return 2 - clean;
}

// Intersects a great-circle segment with the antimeridian.
function d3_geo_cutIntersect(λ0, φ0, λ1, φ1) {
  var cosφ0,
      cosφ1,
      sinλ0_λ1 = Math.sin(λ0 - λ1);
  return Math.abs(sinλ0_λ1) > ε
      ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1)
                 - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0))
                 / (cosφ0 * cosφ1 * sinλ0_λ1))
      : (φ0 + φ1) / 2;
}

// Interpolates between two points along the antimeridian.
function d3_geo_cutInterpolate(from, to, direction, context) {
  var φ;
  if (from == null) {
    φ = direction * π / 2;
    context.lineTo(-π,  φ);
    context.lineTo( 0,  φ);
    context.lineTo( π,  φ);
    context.lineTo( π,  0);
    context.lineTo( π, -φ);
    context.lineTo( 0, -φ);
    context.lineTo(-π, -φ);
    context.lineTo(-π,  0);
  } else if (Math.abs(from[0] - to[0]) > ε) {
    var s = (from[0] < to[0] ? 1 : -1) * π;
    φ = direction * s / 2;
    context.lineTo(-s, φ);
    context.lineTo( 0, φ);
    context.lineTo( s, φ);
  } else {
    context.lineTo(to[0], to[1]);
  }
}
