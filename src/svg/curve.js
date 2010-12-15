d3["svg"]["path"] = function(points) {
  return "M" + points.join("L") + "Z";
}

d3["svg"]["cardinal"] = function(points, tension) {
  if (points.length <= 2) return "";
  if (tension == undefined) tension = 0.8;
  return "M" + points[0] + d3_svg_curveHermite(points,
    d3_svg_curveCardinalTangents(points, tension));
}

function d3_svg_curveCardinalTangents(points, tension) {
  var pts = points,
      N = pts.length-1;

  // if closed shape, adjust endpoints to get all tangents
  if (pts[0][0] == pts[N][0] && pts[0][1] == pts[N][1]) {
    pts = [points[N-1]].concat(points);
    pts.push(points[1]);
  }

  var tangents = [],
      a = (1 - tension) / 2,
      p0 = pts[0],
      p1 = pts[1],
      p2 = pts[2];

  for (var i = 3; i < pts.length; i++) {
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
    p0 = p1;
    p1 = p2;
    p2 = pts[i];
  }

  tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  return tangents;
}

function d3_svg_curveHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) return "";
  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + ","  + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + ","  + (p[1] + t[1] * 2 / 3) + ","
        + lp[0] + "," + lp[1];
  }

  return path;
}