// TODO composite invert

// A composite projection for the United States, 960x500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();

  var alaska = d3.geo.albers()
      .rotate([160, 0])
      .center([0, 60])
      .parallels([55, 65]);

  var hawaii = d3.geo.albers()
      .rotate([160, 0])
      .center([0, 20])
      .parallels([8, 18]);

  var puertoRico = d3.geo.albers()
      .rotate([60, 0])
      .center([0, 10])
      .parallels([8, 18]);

  function albersUsa(coordinates) {
    return projection(coordinates)(coordinates);
  }

  function projection(point) {
    var lon = point[0],
        lat = point[1];
    return lat > 50 ? alaska
        : lon < -140 ? hawaii
        : lat < 21 ? puertoRico
        : lower48;
  }

  albersUsa.scale = function(x) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(x);
    alaska.scale(x * .6);
    hawaii.scale(x);
    puertoRico.scale(x * 1.5);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(x) {
    if (!arguments.length) return lower48.translate();
    var dz = lower48.scale(),
        dx = x[0],
        dy = x[1];
    lower48.translate(x);
    alaska.translate([dx - .40 * dz, dy + .17 * dz]);
    hawaii.translate([dx - .19 * dz, dy + .20 * dz]);
    puertoRico.translate([dx + .58 * dz, dy + .43 * dz]);
    return albersUsa;
  };

  return albersUsa.scale(lower48.scale());
};
