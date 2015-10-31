import "../core/noop";
import "../math/adder";
import "../math/trigonometry";
import "geo";
import "stream";

d3.geo.area = function(object) {
  d3_geo_areaSum = 0;
  d3.geo.stream(object, d3_geo_area);
  return d3_geo_areaSum;
};

var d3_geo_areaSum,
    d3_geo_areaRingSum = new d3_adder;

var d3_geo_area = {
  sphere: function() { d3_geo_areaSum += 4 * pi; },
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,

  // Only count area for polygon rings.
  polygonStart: function() {
    d3_geo_areaRingSum.reset();
    d3_geo_area.lineStart = d3_geo_areaRingStart;
  },
  polygonEnd: function() {
    var area = 2 * d3_geo_areaRingSum;
    d3_geo_areaSum += area < 0 ? 4 * pi + area : area;
    d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
  }
};

function d3_geo_areaRingStart() {
  var lambda00, phi00, lambda0, cosphi0, sinphi0; // start point and previous point

  // For the first point, …
  d3_geo_area.point = function(lambda, phi) {
    d3_geo_area.point = nextPoint;
    lambda0 = (lambda00 = lambda) * d3_radians, cosphi0 = Math.cos(phi = (phi00 = phi) * d3_radians / 2 + pi / 4), sinphi0 = Math.sin(phi);
  };

  // For subsequent points, …
  function nextPoint(lambda, phi) {
    lambda *= d3_radians;
    phi = phi * d3_radians / 2 + pi / 4; // half the angular distance from south pole

    // Spherical excess E for a spherical triangle with vertices: south pole,
    // previous point, current point.  Uses a formula derived from Cagnoli’s
    // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
    var dlambda = lambda - lambda0,
        sdlambda = dlambda >= 0 ? 1 : -1,
        adlambda = sdlambda * dlambda,
        cosphi = Math.cos(phi),
        sinphi = Math.sin(phi),
        k = sinphi0 * sinphi,
        u = cosphi0 * cosphi + k * Math.cos(adlambda),
        v = k * sdlambda * Math.sin(adlambda);
    d3_geo_areaRingSum.add(Math.atan2(v, u));

    // Advance the previous points.
    lambda0 = lambda, cosphi0 = cosphi, sinphi0 = sinphi;
  }

  // For the last point, return to the start.
  d3_geo_area.lineEnd = function() {
    nextPoint(lambda00, phi00);
  };
}
