// Cut features along the antimeridian.
var d3_geo_cut = d3_geo_clip(d3_identity, d3_geo_cutLine, d3_geo_cutInterpolate);

// Takes a line and cuts into visible segments. Returns a tuple of
// [x, segments], where x is:
//   0: there were intersections or the line was empty.
//   1: no intersections.
//   2: there were intersections, and the first and last segments should be
//      rejoined.
function d3_geo_cutLine(coordinates) {
  if (!(n = coordinates.length)) return [0, []];
  var point = coordinates[0],
      λ0 = point[0],
      φ0 = point[1],
      λ1,
      φ1,
      sλ0 = λ0 > 0 ? π : -π,
      sλ1,
      dλ,
      i = 0,
      n,
      clean = 1, // no intersections
      line = [point],
      lines = [line];
  while (++i < n) {
    point = coordinates[i];
    λ1 = point[0];
    φ1 = point[1];
    sλ1 = λ1 > 0 ? π : -π;
    dλ = Math.abs(λ1 - λ0);
    if (Math.abs(dλ - π) < ε) { // line crosses a pole
      line.push([λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2], [sλ0, φ0]);
      lines.push(line = [[sλ1, φ0], [λ1, φ0]]);
      clean = 0;
    } else if (sλ0 !== sλ1 && dλ >= π) { // line crosses antemeridian
      // handle degeneracies
      if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
      if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
      φ0 = d3_geo_cutIntersect(λ0, φ0, λ1, φ1);
      line.push([sλ0, φ0]);
      lines.push(line = [[sλ1, φ0]]);
      clean = 0;
    }
    line.push([λ0 = λ1, φ0 = φ1]);
    sλ0 = sλ1;
  }
  // if there are intersections, we always rejoin the first and last segments.
  return [2 - clean, lines];
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
function d3_geo_cutInterpolate(from, to, direction) {
  var φ;
  if (from == null) {
    φ = direction * π / 2;
    return [
      [-π,  φ],
      [ 0,  φ],
      [ π,  φ],
      [ π,  0],
      [ π, -φ],
      [ 0, -φ],
      [-π, -φ],
      [-π,  0],
      [-π,  φ]
    ];
  } else if (Math.abs(from[0] - to[0]) > ε) {
    var s = (from[0] < to[0] ? 1 : -1) * π;
    φ = direction * s / 2;
    return [
      [-s, φ],
      [ 0, φ],
      [ s, φ]
    ];
  }
  return [to];
}
