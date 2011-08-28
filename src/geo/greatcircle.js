// From http://williams.best.vwh.net/avform.htm#Intermediate
d3.geo.greatcircle = function() {
  // TODO: breakAtDateLine?
  function greatcircle(from, to, n) {
    var x0 = from[0] * d3_radians,
        y0 = from[1] * d3_radians,
        x1 = to[0] * d3_radians,
        y1 = to[1] * d3_radians,
        cx0 = Math.cos(x0),
        sx0 = Math.sin(x0),
        cy0 = Math.cos(y0),
        sy0 = Math.sin(y0),
        cx1 = Math.cos(x1),
        sx1 = Math.sin(x1),
        cy1 = Math.cos(y1),
        sy1 = Math.sin(y1),
        d = Math.acos(sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)),
        sd = Math.sin(d),
        f = d / (n - 1),
        e = -f,
        path = [],
        i = -1;

    while (++i < n) {
      e += f;
      var A = Math.sin(d - e) / sd,
          B = Math.sin(e) / sd,
          x = A * cy0 * cx0 + B * cy1 * cx1,
          y = A * cy0 * sx0 + B * cy1 * sx1,
          z = A * sy0       + B * sy1;
      path[i] = [
        Math.atan2(y, x) / d3_radians,
        Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians
      ];
    }

    return path;
  }

  greatcircle.distance = d3_geo_greatcircleDistance;

  return greatcircle;
};

// Haversine formula for great-circle distance.
function d3_geo_greatcircleDistance(from, to, radius) {
  if (arguments.length < 3) radius = 6371;
  var x0 = from[0] * d3_radians,
      y0 = from[1] * d3_radians,
      x1 = to[0] * d3_radians,
      y1 = to[1] * d3_radians,
      sy = Math.sin((y1 - y0) / 2),
      sx = Math.sin((x1 - x0) / 2),
      a = sy * sy + Math.cos(y0) * Math.cos(y1) * sx * sx;

  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
