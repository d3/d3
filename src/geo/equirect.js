d3.geo.equirect = function() {
  var scale = 500, translate = [480, 250];

  function equirect(coordinates) {
    var x = coordinates[0] / 360,
        y = -coordinates[1] / 360;
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  equirect.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return equirect;
  };

  equirect.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return equirect;
  };

  return equirect;
};
