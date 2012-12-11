d3.geo.rotation = function(δλ, δφ, δγ) {
  var rotate = d3_geo_rotation(δλ * d3_radians, δφ * d3_radians, δγ * d3_radians);

  return d3_geo_type({
    point: function(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees;
      return coordinates;
    }
  });
};

// Note: |δλ| and |δφ| must be < 2π
function d3_geo_rotation(δλ, δφ, δγ) {
  return δλ ? (δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ))
    : d3_geo_rotationλ(δλ))
    : (δφ || δγ ? d3_geo_rotationφγ(δφ, δγ)
    : d3_geo_identityRotation);
}

function d3_geo_identityRotation(λ, φ) {
  return [
    λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ,
    φ
  ];
}

d3_geo_identityRotation.invert = function(x, y) { return [x, y]; };

function d3_geo_forwardRotationλ(δλ) {
  return function(λ, φ) {
    return [
      (λ += δλ) > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ,
      φ
    ];
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
      Math.asin(Math.max(-1, Math.min(1, k * cosδγ + y * sinδγ)))
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
      Math.asin(Math.max(-1, Math.min(1, k * cosδφ - x * sinδφ)))
    ];
  };

  return rotation;
}
