// Albers derived from Tom Carden's implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.conic = function() {
  var origin = [-98, 38],
      parallels = [29.5, 45.5],
      lng0, // d3_geo_radians * origin[0]
      zoom = d3.geo.zoom().scale(1000),
      n,
      C,
      p0,
      mode = "equalarea"; // or equidistant, or conformal.

  function conic(coordinates) {
    var t = (n || 1) * (d3_geo_radians * coordinates[0] - lng0),
        p = mode === "equalarea" ? (n ? Math.sqrt(C - 2 * n * Math.sin(d3_geo_radians * coordinates[1])) / n : C)
          : mode === "equidistant" ? d3_geo_radians * -coordinates[1]
          : n ? C / Math.pow(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2), n) : C;
    return zoom([
      n ? p * Math.sin(t) : C * t,
      mode === "equalarea" ? n ? (p * Math.cos(t) - p0) : -Math.sin(d3_geo_radians * coordinates[1]) / C
      : mode === "equidistant" ? p
      : n ? p0 - p * Math.cos(t) : -Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2))
    ]);
  }

  conic.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    var x = coordinates[0],
        y = coordinates[1],
        p0y = p0 + y,
        t = Math.atan2(x, p0y),
        p = Math.sqrt(x * x + p0y * p0y);
    return [
      (lng0 + (n ? t / n : x / C)) / d3_geo_radians,
      (mode === "equalarea" ? Math.asin(n ? (C - p * p * n * n) / (2 * n) : -y * C)
      : mode === "equidistant" ? -y
      : 2 * (n
        ? Math.atan2(Math.pow(C, 1 / n), Math.pow((n < 0 ? -1 : 1) * p, 1 / n))
        : Math.atan(Math.exp(-y))) - Math.PI / 2
      ) / d3_geo_radians
    ];
  };

  function reload() {
    var phi1 = d3_geo_radians * parallels[0],
        phi2 = d3_geo_radians * parallels[1],
        lat0 = d3_geo_radians * origin[1],
        c1 = Math.cos(phi1);
    lng0 = d3_geo_radians * origin[0];
    switch(mode) {
      case "equalarea":
        var s = Math.sin(phi1);
        n = .5 * (s + Math.sin(phi2));
        C = n ? c1 * c1 + 2 * n * s : c1;
        p0 = n ? Math.sqrt(C - 2 * n * Math.sin(lat0)) / n : 0;
        break;
      case "equidistant":
        n = (c1 - Math.cos(phi2)) / (phi2 - phi1);
        C = n ? c1 / n + phi1 : c1;
        p0 = C - lat0;
        break;
      case "conformal":
        n = Math.log(Math.cos(phi1) / Math.cos(phi2))
            / Math.log(Math.tan(Math.PI / 4 + phi2 / 2)
              / Math.tan(Math.PI / 4 + phi1 / 2));
        C = n ? Math.cos(phi1) * Math.pow(Math.tan(Math.PI / 4 + phi1 / 2), n) / n : 1;
        p0 = n ? C / Math.pow(Math.tan(Math.PI / 4 + lat0 / 2), n) : 0;
        break;
    }
    return conic;
  }

  conic.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return conic;
  };

  conic.origin = function(x) {
    if (!arguments.length) return origin;
    origin = [+x[0], +x[1]];
    return reload();
  };

  // Cylindrical:
  // * Equidistant: 0° for plate carrée.
  // * Equalarea: 0° for Lambert, 30° for Behrmann, 45° for Gall–Peters.
  // * Mercator: TODO make this set the "latitude of true scale".
  conic.parallels = function(x) {
    if (!arguments.length) return parallels;
    parallels = typeof x === "number" ? [x, -x] : [+x[0], +x[1]];
    return reload();
  };

  d3_geo_zoomRebind(conic, zoom);

  return reload();
};
