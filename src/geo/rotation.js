import "../math/trigonometry";
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

// Note: |δλ| must be < 2π
function d3_geo_rotation(δλ, δφ, δγ) {
  return δλ ? (δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ))
    : d3_geo_rotationλ(δλ))
    : (δφ || δγ ? d3_geo_rotationφγ(δφ, δγ)
    : d3_geo_equirectangular);
}

function d3_geo_forwardRotationλ(δλ) {
  return function(λ, φ) {
    return λ += δλ, [λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ, φ];
  };
}

function d3_geo_rotationλ(δλ) {
  var rotation = d3_geo_forwardRotationλ(δλ);
  rotation.invert = d3_geo_forwardRotationλ(-δλ);
  return rotation;
}

function d3_geo_rotationφγ(δφ, δγ) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ),
      cosδγ = Math.cos(δγ),
      sinδγ = Math.sin(δγ);

  function rotation(λ, φ) {
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ),
        k = z * cosδφ + x * sinδφ;
    return [
      Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ),
      d3_asin(k * cosδγ + y * sinδγ)
    ];
  }

  rotation.invert = function(λ, φ) {
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ),
        k = z * cosδγ - y * sinδγ;
    return [
      Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ),
      d3_asin(k * cosδφ - x * sinδφ)
    ];
  };

  return rotation;
}
