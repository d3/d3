d3.geo.zoom = function() {
  var scale = 500,
      translate = [480, 250];

  function zoom(coordinates) {
    return [
      scale * coordinates[0] + translate[0],
      scale * coordinates[1] + translate[1]
    ];
  }

  zoom.invert = function(coordinates) {
    return [
      (coordinates[0] - translate[0]) / scale,
      (coordinates[1] - translate[1]) / scale
    ];
  };

  zoom.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return zoom;
  };

  zoom.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return zoom;
  };

  return zoom;
};
