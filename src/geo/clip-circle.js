// Clip features against a circle centered at [0°, 0°], with a given radius.
function d3_geo_clipCircle(degrees) {
  var radians = degrees * d3_radians,
      cr = Math.cos(radians),
      interpolate = d3_geo_circleInterpolate(radians, 6 * d3_radians);

  return d3_geo_clip(visible, clipLine, interpolate);

  function visible(λ, φ) {
    return Math.cos(λ) * Math.cos(φ) > cr;
  }

  // TODO handle two invisible endpoints with visible intermediate segment.
  // Takes a line and cuts into visible segments. Return values used for
  // polygon clipping:
  //   0: there were intersections or the line was empty.
  //   1: no intersections.
  //   2: there were intersections, and the first and last segments should be
  //      rejoined.
  function clipLine(listener) {
    var point0,
        v0,
        v00,
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(λ, φ) {
        var point1 = [λ, φ],
            point2,
            v = visible(λ, φ);
        if (!point0 && (v00 = v0 = v)) listener.lineStart();
        // handle degeneracies
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
            point1[0] += ε;
            point1[1] += ε;
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v0 = v) {
            // outside going in
            listener.lineStart();
            point2 = intersect(point1, point0);
            listener.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            listener.point(point2[0], point2[1]);
            listener.lineEnd();
          }
          point0 = point2;
        }
        if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) listener.point(point1[0], point1[1]);
        point0 = point1;
      },
      lineEnd: function() {
        if (v0) listener.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() { return clean | ((v00 && v0) << 1); }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b) {
    var pa = d3_geo_cartesian(a, 0),
        pb = d3_geo_cartesian(b, 0);
    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 x n2).
    var n1 = [1, 0, 0], // normal
        n2 = d3_geo_cartesianCross(pa, pb),
        n2n2 = d3_geo_cartesianDot(n2, n2),
        n1n2 = n2[0], // d3_geo_cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;
    // Two polar points.
    if (!determinant) return a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = d3_geo_cartesianCross(n1, n2),
        A = d3_geo_cartesianScale(n1, c1),
        B = d3_geo_cartesianScale(n2, c2);
    d3_geo_cartesianAdd(A, B);
    // Now solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = d3_geo_cartesianDot(A, u),
        uu = d3_geo_cartesianDot(u, u),
        t = Math.sqrt(w * w - uu * (d3_geo_cartesianDot(A, A) - 1)),
        q = d3_geo_cartesianScale(u, (-w - t) / uu);
    d3_geo_cartesianAdd(q, A);
    return d3_geo_spherical(q);
  }
}
