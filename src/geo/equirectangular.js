d3.geo.equirectangular = function() {
  var scale = 500,
      translate = [480, 250],
      geotranslate = geotranslate_ = [0, 0];

  function equirectangular(coordinates) {
    var x = coordinates[0] / 360,
        y = -coordinates[1] / 360;
    return [
      scale * x + translate[0] - geotranslate_[0],
      scale * y + translate[1] - geotranslate_[1]
    ];
  }

  equirectangular.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0] + geotranslate_[0]) / scale,
        y = (coordinates[1] - translate[1] + geotranslate_[1]) / scale;
    return [
      360 * x,
      -360 * y
    ];
  };

  equirectangular.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    geotranslate_ = [0, 0];
    if(geotranslate[0] != 0 && geotranslate[1] != 0) {
        geotranslate_ = this(geotranslate);
    }
    return equirectangular;
  };

  equirectangular.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return equirectangular;
  };

  equirectangular.geotranslate = function(x) {
    if (!arguments.length) return geotranslate;
    geotranslate = [+x[0], +x[1]];
    geotranslate_ = [0, 0];
    if(geotranslate[0] != 0 && geotranslate[1] != 0) {
        geotranslate_ = this(geotranslate);
    }
    return equirectangular;
  };

  return equirectangular;
};
