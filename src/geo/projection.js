d3.geo.projection = d3_geo_projection;

function d3_geo_projection(project) {
  return d3_geo_projectionMutator(function() { return project; })();
}

// TODO Expose this API? Not that happy with it.
function d3_geo_projectionMutator(projectAt) {
  var project,
      projectRotate,
      k = 150,
      x = 480,
      y = 250,
      λ = 0,
      φ = 0,
      δλ = 0,
      δφ = 0,
      δγ = 0,
      δx = x,
      δy = y;

  function p(coordinates) {
    coordinates = projectRotate(coordinates[0] * π / 180, coordinates[1] * π / 180);
    return [coordinates[0] * k + δx, δy - coordinates[1] * k];
  }

  function i(coordinates) {
    coordinates = projectRotate.invert((coordinates[0] - δx) / k, (δy - coordinates[1]) / k);
    return [coordinates[0] * 180 / π, coordinates[1] * 180 / π];
  }

  p.scale = function(_) {
    if (!arguments.length) return k;
    k = +_;
    return reset();
  };

  p.translate = function(_) {
    if (!arguments.length) return [x, y];
    x = +_[0];
    y = +_[1];
    return reset();
  };

  p.center = function(_) {
    if (!arguments.length) return [λ * 180 / π, φ * 180 / π];
    λ = _[0] % 360 * π / 180;
    φ = _[1] % 360 * π / 180;
    return reset();
  };

  p.rotate = function(_) {
    if (!arguments.length) return [δλ * 180 / π, δφ * 180 / π, δγ * 180 / π];
    δλ = _[0] % 360 * π / 180;
    δφ = _[1] % 360 * π / 180;
    δγ = _.length > 2 ? _[2] % 360 * π / 180 : 0;
    return reset();
  };

  function reset() {
    projectRotate = d3_geo_compose(d3_geo_rotation(δλ, δφ, δγ), project);
    var center = project(λ, φ);
    δx = x - center[0] * k;
    δy = y + center[1] * k;
    return p;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    p.invert = project.invert && i;
    return reset();
  };
}
