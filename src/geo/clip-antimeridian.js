import "../core/true";
import "../math/abs";
import "../math/trigonometry";
import "clip";

var d3_geo_clipAntimeridian = d3_geo_clip(
    d3_true,
    d3_geo_clipAntimeridianLine,
    d3_geo_clipAntimeridianInterpolate,
    [-pi, -pi / 2]);

// Takes a line and cuts into visible segments. Return values:
//   0: there were intersections or the line was empty.
//   1: no intersections.
//   2: there were intersections, and the first and last segments should be
//      rejoined.
function d3_geo_clipAntimeridianLine(listener) {
  var lambda0 = NaN,
      phi0 = NaN,
      slambda0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      listener.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var slambda1 = lambda1 > 0 ? pi : -pi,
          dlambda = abs(lambda1 - lambda0);
      if (abs(dlambda - pi) < epsilon) { // line crosses a pole
        listener.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfpi : -halfpi);
        listener.point(slambda0, phi0);
        listener.lineEnd();
        listener.lineStart();
        listener.point(slambda1, phi0);
        listener.point(lambda1, phi0);
        clean = 0;
      } else if (slambda0 !== slambda1 && dlambda >= pi) { // line crosses antimeridian
        // handle degeneracies
        if (abs(lambda0 - slambda0) < epsilon) lambda0 -= slambda0 * epsilon;
        if (abs(lambda1 - slambda1) < epsilon) lambda1 -= slambda1 * epsilon;
        phi0 = d3_geo_clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        listener.point(slambda0, phi0);
        listener.lineEnd();
        listener.lineStart();
        listener.point(slambda1, phi0);
        clean = 0;
      }
      listener.point(lambda0 = lambda1, phi0 = phi1);
      slambda0 = slambda1;
    },
    lineEnd: function() {
      listener.lineEnd();
      lambda0 = phi0 = NaN;
    },
    // if there are intersections, we always rejoin the first and last segments.
    clean: function() { return 2 - clean; }
  };
}

function d3_geo_clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosphi0,
      cosphi1,
      sinlambda0_lambda1 = Math.sin(lambda0 - lambda1);
  return abs(sinlambda0_lambda1) > epsilon
      ? Math.atan((Math.sin(phi0) * (cosphi1 = Math.cos(phi1)) * Math.sin(lambda1)
                 - Math.sin(phi1) * (cosphi0 = Math.cos(phi0)) * Math.sin(lambda0))
                 / (cosphi0 * cosphi1 * sinlambda0_lambda1))
      : (phi0 + phi1) / 2;
}

function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
  var phi;
  if (from == null) {
    phi = direction * halfpi;
    listener.point(-pi,  phi);
    listener.point( 0,  phi);
    listener.point( pi,  phi);
    listener.point( pi,  0);
    listener.point( pi, -phi);
    listener.point( 0, -phi);
    listener.point(-pi, -phi);
    listener.point(-pi,  0);
    listener.point(-pi,  phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var s = from[0] < to[0] ? pi : -pi;
    phi = direction * s / 2;
    listener.point(-s, phi);
    listener.point( 0, phi);
    listener.point( s, phi);
  } else {
    listener.point(to[0], to[1]);
  }
}
