d3.geo.equirectangular = function() {
  var scale = 500,
      translate = [480, 250],
      parallel,
      c1;

  function equirectangular(coordinates) {
    var x = coordinates[0] / 360,
        y = coordinates[1] / 360;
    x *= c1;
    y *= -1;

    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  equirectangular.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      (x / c1) * 360,
      -y * 360
    ];
  };

  equirectangular.parallel = function(x) {
    if (!arguments.length) return parallel;
    parallel = +x;
    c1 = Math.cos(parallel * d3_radians);
    return equirectangular;
  };

  equirectangular.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return equirectangular;
  };

  equirectangular.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return equirectangular;
  };

  return equirectangular.parallel(0);
};
