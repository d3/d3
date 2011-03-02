d3.geo.stereographic = function() {
  var scale = 200,
      translate = [480, 250],
      pole = 1;

  function stereographic(coordinates) {
    var p = 1 - pole * coordinates[1] / 90,
        t = coordinates[0] * d3_radians;
    if (p < 0) p = 0;
    else if (p > 1) p = 1;
    var x = p * Math.cos(t),
        y = p * Math.sin(t);
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  // 1 or -1 means N or S hemisphere
  stereographic.hemisphere = function(x) {
    if (!arguments.length) return pole;
    pole = +x;
    return stereographic;
  };

  stereographic.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return stereographic;
  };

  stereographic.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return stereographic;
  };

  return stereographic;
};
