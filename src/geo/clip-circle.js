import "../math/trigonometry";
import "cartesian";
import "clip";
import "circle";
import "spherical";

// Clip features against a small circle centered at [0°, 0°].
function d3_geo_clipCircle(radius) {
  var cr = Math.cos(radius),
      smallRadius = cr > 0,
      notHemisphere = Math.abs(cr) > ε, // TODO optimise for this common case
      interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);

  return d3_geo_clip(visible, clipLine, interpolate);

  function visible(λ, φ) {
    return Math.cos(λ) * Math.cos(φ) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for
  // polygon clipping:
  //   0: there were intersections or the line was empty.
  //   1: no intersections.
  //   2: there were intersections, and the first and last segments should be
  //      rejoined.
  function clipLine(listener) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(λ, φ) {
        var point1 = [λ, φ],
            point2,
            v = visible(λ, φ),
            c = smallRadius
              ? v ? 0 : code(λ, φ)
              : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
        if (!point0 && (v00 = v0 = v)) listener.lineStart();
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
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
          if (v) {
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
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              listener.lineStart();
              listener.point(t[0][0], t[0][1]);
              listener.point(t[1][0], t[1][1]);
              listener.lineEnd();
            } else {
              listener.point(t[1][0], t[1][1]);
              listener.lineEnd();
              listener.lineStart();
              listener.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
          listener.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
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
  function intersect(a, b, two) {
    var pa = d3_geo_cartesian(a),
        pb = d3_geo_cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = d3_geo_cartesianCross(pa, pb),
        n2n2 = d3_geo_cartesianDot(n2, n2),
        n1n2 = n2[0], // d3_geo_cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = d3_geo_cartesianCross(n1, n2),
        A = d3_geo_cartesianScale(n1, c1),
        B = d3_geo_cartesianScale(n2, c2);
    d3_geo_cartesianAdd(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = d3_geo_cartesianDot(A, u),
        uu = d3_geo_cartesianDot(u, u),
        t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = Math.sqrt(t2),
        q = d3_geo_cartesianScale(u, (-w - t) / uu);
    d3_geo_cartesianAdd(q, A);
    q = d3_geo_spherical(q);
    if (!two) return q;

    // Two intersection points.
    var λ0 = a[0],
        λ1 = b[0],
        φ0 = a[1],
        φ1 = b[1],
        z;
    if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
    var δλ = λ1 - λ0,
        polar = Math.abs(δλ - π) < ε,
        meridian = polar || δλ < ε;

    if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? φ0 + φ1 > 0 ^ q[1] < (Math.abs(q[0] - λ0) < ε ? φ0 : φ1)
          : φ0 <= q[1] && q[1] <= φ1
        : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
      var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
      d3_geo_cartesianAdd(q1, A);
      return [q, d3_geo_spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(λ, φ) {
    var r = smallRadius ? radius : π - radius,
        code = 0;
    if (λ < -r) code |= 1; // left
    else if (λ > r) code |= 2; // right
    if (φ < -r) code |= 4; // below
    else if (φ > r) code |= 8; // above
    return code;
  }
}
