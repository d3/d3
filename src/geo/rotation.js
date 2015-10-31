import "../math/trigonometry";
import "compose";
import "equirectangular";
import "geo";

d3.geo.rotation = function(rotate) {
  rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
    return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
    return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
  };

  return forward;
};

function d3_geo_identityRotation(lambda, phi) {
  return [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
}

d3_geo_identityRotation.invert = d3_geo_equirectangular;

// Note: |deltalambda| must be < 2pi
function d3_geo_rotation(deltalambda, deltaphi, deltagamma) {
  return deltalambda ? (deltaphi || deltagamma ? d3_geo_compose(d3_geo_rotationlambda(deltalambda), d3_geo_rotationphigamma(deltaphi, deltagamma))
    : d3_geo_rotationlambda(deltalambda))
    : (deltaphi || deltagamma ? d3_geo_rotationphigamma(deltaphi, deltagamma)
    : d3_geo_identityRotation);
}

function d3_geo_forwardRotationlambda(deltalambda) {
  return function(lambda, phi) {
    return lambda += deltalambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
  };
}

function d3_geo_rotationlambda(deltalambda) {
  var rotation = d3_geo_forwardRotationlambda(deltalambda);
  rotation.invert = d3_geo_forwardRotationlambda(-deltalambda);
  return rotation;
}

function d3_geo_rotationphigamma(deltaphi, deltagamma) {
  var cosdeltaphi = Math.cos(deltaphi),
      sindeltaphi = Math.sin(deltaphi),
      cosdeltagamma = Math.cos(deltagamma),
      sindeltagamma = Math.sin(deltagamma);

  function rotation(lambda, phi) {
    var cosphi = Math.cos(phi),
        x = Math.cos(lambda) * cosphi,
        y = Math.sin(lambda) * cosphi,
        z = Math.sin(phi),
        k = z * cosdeltaphi + x * sindeltaphi;
    return [
      Math.atan2(y * cosdeltagamma - k * sindeltagamma, x * cosdeltaphi - z * sindeltaphi),
      d3_asin(k * cosdeltagamma + y * sindeltagamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosphi = Math.cos(phi),
        x = Math.cos(lambda) * cosphi,
        y = Math.sin(lambda) * cosphi,
        z = Math.sin(phi),
        k = z * cosdeltagamma - y * sindeltagamma;
    return [
      Math.atan2(y * cosdeltagamma + z * sindeltagamma, x * cosdeltaphi + k * sindeltaphi),
      d3_asin(k * cosdeltaphi - x * sindeltaphi)
    ];
  };

  return rotation;
}
