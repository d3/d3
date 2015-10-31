import "../math/trigonometry";
import "geo";

// Length returned in radians; multiply by radius for distance.
d3.geo.distance = function(a, b) {
  var Deltalambda = (b[0] - a[0]) * d3_radians,
      phi0 = a[1] * d3_radians, phi1 = b[1] * d3_radians,
      sinDeltalambda = Math.sin(Deltalambda), cosDeltalambda = Math.cos(Deltalambda),
      sinphi0 = Math.sin(phi0), cosphi0 = Math.cos(phi0),
      sinphi1 = Math.sin(phi1), cosphi1 = Math.cos(phi1),
      t;
  return Math.atan2(Math.sqrt((t = cosphi1 * sinDeltalambda) * t + (t = cosphi0 * sinphi1 - sinphi0 * cosphi1 * cosDeltalambda) * t), sinphi0 * sinphi1 + cosphi0 * cosphi1 * cosDeltalambda);
};
