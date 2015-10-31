import "../core/noop";
import "../math/abs";
import "../math/trigonometry";
import "geo";
import "stream";

d3.geo.length = function(object) {
  d3_geo_lengthSum = 0;
  d3.geo.stream(object, d3_geo_length);
  return d3_geo_lengthSum;
};

var d3_geo_lengthSum;

var d3_geo_length = {
  sphere: d3_noop,
  point: d3_noop,
  lineStart: d3_geo_lengthLineStart,
  lineEnd: d3_noop,
  polygonStart: d3_noop,
  polygonEnd: d3_noop
};

function d3_geo_lengthLineStart() {
  var lambda0, sinphi0, cosphi0;

  d3_geo_length.point = function(lambda, phi) {
    lambda0 = lambda * d3_radians, sinphi0 = Math.sin(phi *= d3_radians), cosphi0 = Math.cos(phi);
    d3_geo_length.point = nextPoint;
  };

  d3_geo_length.lineEnd = function() {
    d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
  };

  function nextPoint(lambda, phi) {
    var sinphi = Math.sin(phi *= d3_radians),
        cosphi = Math.cos(phi),
        t = abs((lambda *= d3_radians) - lambda0),
        cosDeltalambda = Math.cos(t);
    d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosphi * Math.sin(t)) * t + (t = cosphi0 * sinphi - sinphi0 * cosphi * cosDeltalambda) * t), sinphi0 * sinphi + cosphi0 * cosphi * cosDeltalambda);
    lambda0 = lambda, sinphi0 = sinphi, cosphi0 = cosphi;
  }
}
