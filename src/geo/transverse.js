import "projection";

function d3_geo_transverseProjection(project) {

  function transverse(x, y) {
    x = project(x, y);
    y = x[0], x[0] = x[1], x[1] = -y;
    return x;
  }

  if (project.invert) transverse.invert = function(x, y) {
    return project.invert(-y, x);
  };

  var projection = d3_geo_projection(transverse),
      center = projection.center,
      rotate = projection.rotate;

  projection.center = function(_) {
    return _
        ? center([-_[1], _[0]])
        : ((_ = center()), [-_[1], _[0]]);
  };

  projection.rotate = function(_) {
    return _
        ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90])
        : ((_ = rotate()), [_[0], _[1], _[2] - 90]);
  };

  return projection.rotate([0, 0]);
}
