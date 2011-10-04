d3.geo.mercator = function() {
  var scale = 500,
      translate = [480, 250],
      geotranslate = geotranslate_ = [0, 0];

  function mercator(coordinates) {
    var x = coordinates[0] / 360,
        y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2)) / d3_geo_radians) / 360;
    return [
      scale * x + translate[0] - geotranslate_[0],
      scale * Math.max(-.5, Math.min(.5, y)) + translate[1] - geotranslate_[1]
    ];
  }

  mercator.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0] + geotranslate_[0]) / scale,
        y = (coordinates[1] - translate[1] + geotranslate_[1]) / scale;
    return [
      360 * x,
      2 * Math.atan(Math.exp(-360 * y * d3_geo_radians)) / d3_geo_radians - 90
    ];
  };

  mercator.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    geotranslate_ = [0, 0];
    if(geotranslate[0] != 0 && geotranslate[1] != 0) {
        geotranslate_ = this(geotranslate);
    }
    return mercator;
  };

  mercator.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return mercator;
  };

  mercator.geotranslate = function(x) {
    if (!arguments.length) return geotranslate;
    geotranslate = [+x[0], +x[1]];
    geotranslate_ = [0, 0];
    if(geotranslate[0] != 0 && geotranslate[1] != 0) {
        geotranslate_ = this(geotranslate);
    }
    return mercator;
  };

  return mercator;
};
