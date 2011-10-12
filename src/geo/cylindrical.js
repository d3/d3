d3.geo.cylindrical = function() {
  var scale = 500,
      translate = [480, 250],
      parallel,
      c1,
      mode = "equidistant"; // or equalarea, mercator

  function cylindrical(coordinates) {
    var x = coordinates[0] * d3_geo_radians,
        y = coordinates[1] * d3_geo_radians;
    x *= c1;
    y = mode === "equidistant" ? -y
      : mode === "mercator" ? -Math.log(Math.tan(Math.PI / 4 + y / 2))
      : -Math.sin(y) / c1;

    return [
      (scale * x) / (d3_geo_radians * 360) + translate[0],
      (scale * y) / (d3_geo_radians * 360) + translate[1]
    ];
  }

  cylindrical.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale * d3_geo_radians * 360,
        y = (coordinates[1] - translate[1]) / scale * d3_geo_radians * 360;
    x /= c1;
    y = mode === "equidistant" ? -y
      : mode === "mercator" ? 2 * Math.atan(Math.exp(-y)) - Math.PI / 2
      : Math.asin(-y * c1);
    return [
      x / d3_geo_radians,
      y / d3_geo_radians
    ];
  };

  cylindrical.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return cylindrical;
  };

  // Equidistant: 0° for plate carrée.
  // Equalarea: 0° for Lambert, 30° for Behrmann, 45° for Gall–Peters.
  // Mercator: TODO make this set the "latitude of true scale".
  cylindrical.parallel = function(x) {
    if (!arguments.length) return parallel;
    c1 = Math.cos((parallel = +x) * d3_geo_radians);
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
