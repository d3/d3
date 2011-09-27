d3.geo.cylindrical = function() {
  var scale = 500,
      translate = [480, 250],
      parallel,
      c1,
      mode = "equidistant"; // or equalarea

  function cylindrical(coordinates) {
    var x = coordinates[0] * d3_geo_radians,
        y = coordinates[1] * d3_geo_radians;
    x *= c1;
    y = mode === "equidistant" ? -y : -Math.sin(y) / c1;

    return [
      (scale * x) / (d3_geo_radians * 360) + translate[0],
      (scale * y) / (d3_geo_radians * 360) + translate[1]
    ];
  }

  cylindrical.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      (x / c1) * 360,
      (mode === "equidistant" ? -y : Math.sin(-y * c1)) * 360
    ];
  };

  cylindrical.parallel = function(x) {
    if (!arguments.length) return parallel;
    parallel = +x;
    c1 = Math.cos(parallel * d3_geo_radians);
    return cylindrical;
  };

  cylindrical.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return cylindrical;
  };

  cylindrical.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return cylindrical;
  };

  return cylindrical.parallel(0);
};
