d3.geo.bonne = function() {
  var origin,
      scale = 200,
      translate = [480, 250],
      parallel, // 90 for Werner, 0 for Sinusoidal
      p0,
      ctp0,
      x0,
      y0;

  function bonne(coordinates) {
    var x1 = coordinates[0] * d3_geo_radians - x0,
        y1 = coordinates[1] * d3_geo_radians - y0,
        p = ctp0 + p0 - y1,
        E = x1 * Math.cos(y1) / p,
        x = p * Math.sin(E),
        y = p * Math.cos(E) - ctp0;
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  bonne.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        c = ctp0 + y,
        p = Math.sqrt(x * x + c * c),
        y1 = (ctp0 + p0 - p);
    return [
      (x0 + p * Math.atan2(x, c) / Math.cos(y1)) / d3_geo_radians,
      y1 / d3_geo_radians
    ];
  };

  bonne.parallel = function(x) {
    if (!arguments.length) return parallel;
    parallel = +x;
    ctp0 = 1 / Math.tan(p0 = parallel * d3_geo_radians);
    return bonne;
  };

  bonne.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    x0 = origin[0] * d3_geo_radians;
    y0 = origin[1] * d3_geo_radians;
    return bonne;
  };

  bonne.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return bonne;
  };

  bonne.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return bonne;
  };

  return bonne.origin([0, 0]).parallel(40);
};
