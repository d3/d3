import "transform";

function d3_geo_transverse(projection) {
  var center = projection.center,
      rotate = projection.rotate,
      stream = projection.stream;

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

  projection.stream = function(output) {
    var t = projection.translate(),
        dx = t[0] + t[1],
        dy = t[0] - t[1];
    return stream(d3_geo_transformPoint(output, function(x, y) { output.point(dx - y, x - dy); }));
  };

  return projection.rotate(rotate());
}
