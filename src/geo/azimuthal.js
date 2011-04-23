d3.geo.azimuthal = function() {
  var scale = 200,
      translate = [480, 250],
      pole = 1;

  function azimuthal(coordinates) {
    var p = p < 0 ? 0 :
      p > 1 ? 1 :
      1 - pole * coordinates[1] / 90,
        t = coordinates[0] * d3_radians,
        x = p * Math.cos(t),
        y = p * Math.sin(t);
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  // 1 or -1 means N or S hemisphere
  azimuthal.hemisphere = function(x) {
    if (!arguments.length) return pole;
    pole = +x;
    return azimuthal;
  };

  azimuthal.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return azimuthal;
  };

  azimuthal.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return azimuthal;
  };

  return azimuthal;
};
