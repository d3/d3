// Derived from Tom Carden's Albers implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.albers = function() {
  var origin = [-96, 23],
      parallels = [29.5, 45.5],
      scale = 1000,
      translate = [500, 510],
      lng0, // d3_radians * origin[0]
      n,
      C,
      p0;

  function albers(coordinates) {
    var t = n * (d3_radians * coordinates[0] - lng0),
        p = Math.sqrt(C - 2 * n * Math.sin(d3_radians * coordinates[1])) / n;
    return [
      scale * p * Math.sin(t) + translate[0],
      scale * (p * Math.cos(t) - p0) + translate[1]
    ];
  }

  function reload() {
    var phi1 = d3_radians * parallels[0],
        phi2 = d3_radians * parallels[1],
        lat0 = d3_radians * origin[1],
        s = Math.sin(phi1),
        c = Math.cos(phi1);
    lng0 = d3_radians * origin[0];
    n = .5 * (s + Math.sin(phi2));
    C = c * c + 2 * n * s;
    p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
    return albers;
  }

  albers.origin = function(x, y) {
    origin = [+x, +y];
    return reload();
  };

  albers.parallels = function(x, y) {
    parallels = [+x, +y];
    return reload();
  };

  albers.scale = function(x) {
    scale = +x;
    return albers;
  };

  albers.translate = function(x, y) {
    translate = [+x, +y];
    return albers;
  };

  return reload();
};

var d3_radians = Math.PI / 180;
