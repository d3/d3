d3.geo.projection = d3_geo_projection;
d3.geo.projectionMutator = d3_geo_projectionMutator;

function d3_geo_projection(project) {
  return d3_geo_projectionMutator(function() { return project; })();
}

function d3_geo_projectionMutator(projectAt) {
  var project,
      projectRotate,
      k = 150, // scale
      x = 480, // translate
      y = 250,
      λ = 0, // center
      φ = 0,
      δλ = 0, // rotate
      δφ = 0,
      δγ = 0,
      δx, // center
      δy,
      clip = d3_geo_cut, // TODO rename: it's often cutting, not clipping!
                         // Although cutting is a special case of clipping with
                         // an infinitesimally small "outside".
      clipAngle = null,
      projectResample = d3_geo_resample(projectPoint);

  function projection(coordinates) {
    coordinates = projectRotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
    return [coordinates[0] * k + δx, δy - coordinates[1] * k];
  }

  function invert(coordinates) {
    coordinates = projectRotate.invert((coordinates[0] - δx) / k, (δy - coordinates[1]) / k);
    return [coordinates[0] * d3_degrees, coordinates[1] * d3_degrees];
  }

  projection.stream = function(listener) {
    return d3_geo_streamRadians(d3_geo_streamRotate(rotate, clip(projectResample(listener))));
  };

  projection.clipAngle = function(_) {
    if (!arguments.length) return clipAngle;
    clip = _ == null
        ? (clipAngle = _, d3_geo_cut)
        : d3_geo_circleClip(clipAngle = +_);
    return projection;
  };

  projection.scale = function(_) {
    if (!arguments.length) return k;
    k = +_;
    return reset();
  };

  projection.translate = function(_) {
    if (!arguments.length) return [x, y];
    x = +_[0];
    y = +_[1];
    return reset();
  };

  projection.center = function(_) {
    if (!arguments.length) return [λ * d3_degrees, φ * d3_degrees];
    λ = _[0] % 360 * d3_radians;
    φ = _[1] % 360 * d3_radians;
    return reset();
  };

  projection.rotate = function(_) {
    if (!arguments.length) return [δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees];
    δλ = _[0] % 360 * d3_radians;
    δφ = _[1] % 360 * d3_radians;
    δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
    return reset();
  };

  d3.rebind(projection, projectResample, "precision");

  function reset() {
    projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
    var center = project(λ, φ);
    δx = x - center[0] * k;
    δy = y + center[1] * k;
    return projection;
  }

  // TODO rename: this is not just projection, it also transforms!
  // TODO rename: how does projectPoint disambiguate this method from project?
  // TODO remove redundant code with p(coordinates)?
  function projectPoint(λ, φ) {
    var point = project(λ, φ);
    return [point[0] * k + δx, δy - point[1] * k];
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return reset();
  };
}
