import "conic-equal-area";
import "geo";

// A composite projection for the United States, 960×500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.conicEqualArea()
      .rotate([98, 0])
      .center([0, 38])
      .parallels([29.5, 45.5]);

  var alaska = d3.geo.conicEqualArea()
      .rotate([160, 0])
      .center([0, 60])
      .parallels([55, 65]);

  var hawaii = d3.geo.conicEqualArea()
      .rotate([160, 0])
      .center([0, 20])
      .parallels([8, 18]);

  var puertoRico = d3.geo.conicEqualArea()
      .rotate([60, 0])
      .center([0, 10])
      .parallels([8, 18]);

  var alaskaInvert,
      hawaiiInvert,
      puertoRicoInvert;

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

  albersUsa.invert = function(coordinates) {
    return alaskaInvert(coordinates) || hawaiiInvert(coordinates) || puertoRicoInvert(coordinates) || lower48.invert(coordinates);
  };

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

    alaskaInvert = d3_geo_albersUsaInvert(alaska, [[-180, 50], [-130, 72]]);
    hawaiiInvert = d3_geo_albersUsaInvert(hawaii, [[-164, 18], [-154, 24]]);
    puertoRicoInvert = d3_geo_albersUsaInvert(puertoRico, [[-67.5, 17.5], [-65, 19]]);

    return albersUsa;
  };

  return albersUsa.scale(1000);
};

function d3_geo_albersUsaInvert(projection, extent) {
  var a = projection(extent[0]),
      b = projection([.5 * (extent[0][0] + extent[1][0]), extent[0][1]]),
      c = projection([extent[1][0], extent[0][1]]),
      d = projection(extent[1]);

  var dya = b[1]- a[1],
      dxa = b[0]- a[0],
      dyb = c[1]- b[1],
      dxb = c[0]- b[0];

  var ma = dya / dxa,
      mb = dyb / dxb;

  // Find center of circle going through points [a, b, c].
  var cx = .5 * (ma * mb * (a[1] - c[1]) + mb * (a[0] + b[0]) - ma * (b[0] + c[0])) / (mb - ma),
      cy = (.5 * (a[0] + b[0]) - cx) / ma + .5 * (a[1] + b[1]);

  // Radial distance² from center.
  var dx0 = d[0] - cx,
      dy0 = d[1] - cy,
      dx1 = a[0] - cx,
      dy1 = a[1] - cy,
      r0 = dx0 * dx0 + dy0 * dy0,
      r1 = dx1 * dx1 + dy1 * dy1;

  // Angular extent.
  var a0 = Math.atan2(dy0, dx0),
      a1 = Math.atan2(dy1, dx1);

  return function(coordinates) {
    var dx = coordinates[0] - cx,
        dy = coordinates[1] - cy,
        r = dx * dx + dy * dy,
        a = Math.atan2(dy, dx);
    if (r0 < r && r < r1 && a0 < a && a < a1) return projection.invert(coordinates);
  };
}
