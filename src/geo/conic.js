// Derived from Tom Carden's Albers implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.conic = function() {
  var origin = [-98, 38],
      parallels = [29.5, 45.5],
      lng0, // d3_geo_radians * origin[0]
      zoom = d3.geo.zoom(),
      n,
      C,
      p0,
      mode = "equalarea"; // or equidistant, or conformal.

  function conic(coordinates) {
    var t = (n || 1) * (d3_geo_radians * coordinates[0] - lng0),
        p = mode === "equalarea" ? n ? Math.sqrt(C - 2 * n * Math.sin(d3_geo_radians * coordinates[1])) / n : C
          : mode === "equidistant" ? C - coordinates[1]
          : 0; // TODO conformal
    var x = n ? p * Math.sin(t) : C * t,
        y = n ? (p * Math.cos(t) - p0) : -Math.sin(d3_geo_radians * coordinates[1]) / C;
    return zoom([
      x / (d3_geo_radians * 360),
      y / (d3_geo_radians * 360)
    ]);
  }

  conic.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    var x = coordinates[0],
        y = coordinates[1],
        p0y = p0 + y,
        t = Math.atan2(x, p0y),
        p = Math.sqrt(x * x + p0y * p0y);
    //Math.asin(-y * c1)
    return [
      (lng0 + t / n) / d3_geo_radians,
      Math.asin((C - p * p * n * n) / (2 * n)) / d3_geo_radians
    ];
  };

  function reload() {
    var phi1 = d3_geo_radians * parallels[0],
        phi2 = d3_geo_radians * parallels[1],
        lat0 = d3_geo_radians * origin[1],
        s = Math.sin(phi1),
        c = Math.cos(phi1);
    lng0 = d3_geo_radians * origin[0];
    n = .5 * (s + Math.sin(phi2));
    C = n ? c * c + 2 * n * s : c;
    p0 = n ? Math.sqrt(C - 2 * n * Math.sin(lat0)) / n : 0;
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

  conic.parallels = function(x) {
    if (!arguments.length) return parallels;
    parallels = typeof x === "number" ? [x, -x] : [+x[0], +x[1]];
    return reload();
  };

  conic.scale = d3.rebind(conic, zoom.scale);
  conic.translate = d3.rebind(conic, zoom.translate);

  return reload();
};
