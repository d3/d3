import "geo";
import "area";
import "cartesian";
import "../math/abs";
import "../math/trigonometry";

function d3_geo_pointInPolygon(point, polygon) {
  var meridian = point[0],
      parallel = point[1],
      meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0],
      polarAngle = 0,
      winding = 0;
  d3_geo_areaRingSum.reset();

  for (var i = 0, n = polygon.length; i < n; ++i) {
    var ring = polygon[i],
        m = ring.length;
    if (!m) continue;
    var point0 = ring[0],
        lambda0 = point0[0],
        phi0 = point0[1] / 2 + pi / 4,
        sinphi0 = Math.sin(phi0),
        cosphi0 = Math.cos(phi0),
        j = 1;

    while (true) {
      if (j === m) j = 0;
      point = ring[j];
      var lambda = point[0],
          phi = point[1] / 2 + pi / 4,
          sinphi = Math.sin(phi),
          cosphi = Math.cos(phi),
          dlambda = lambda - lambda0,
          sdlambda = dlambda >= 0 ? 1 : -1,
          adlambda = sdlambda * dlambda,
          antimeridian = adlambda > pi,
          k = sinphi0 * sinphi;
      d3_geo_areaRingSum.add(Math.atan2(k * sdlambda * Math.sin(adlambda), cosphi0 * cosphi + k * Math.cos(adlambda)));

      polarAngle += antimeridian ? dlambda + sdlambda * tau : dlambda;

      // Are the longitudes either side of the point's meridian, and are the
      // latitudes smaller than the parallel?
      if (antimeridian ^ lambda0 >= meridian ^ lambda >= meridian) {
        var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
        d3_geo_cartesianNormalize(arc);
        var intersection = d3_geo_cartesianCross(meridianNormal, arc);
        d3_geo_cartesianNormalize(intersection);
        var phiarc = (antimeridian ^ dlambda >= 0 ? -1 : 1) * d3_asin(intersection[2]);
        if (parallel > phiarc || parallel === phiarc && (arc[0] || arc[1])) {
          winding += antimeridian ^ dlambda >= 0 ? 1 : -1;
        }
      }
      if (!j++) break;
      lambda0 = lambda, sinphi0 = sinphi, cosphi0 = cosphi, point0 = point;
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a meridian
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (polarAngle < -epsilon || polarAngle < epsilon && d3_geo_areaRingSum < 0) ^ (winding & 1);
}
