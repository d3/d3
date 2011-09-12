// From http://williams.best.vwh.net/avform.htm#Intermediate
d3.geo.greatCircle = function() {
  var coordinates = Object,
      precision = 1,
      radius = d3_geo_earthRadius;
  // TODO: breakAtDateLine?

  function greatCircle(d, i) {
    return d3_geo_greatCirclePath(coordinates.call(this, d, i), precision);
  }

  greatCircle.coordinates = function(x) {
    if (!arguments.length) return coordinates;
    coordinates = x;
    return greatCircle;
  };

  greatCircle.precision = function(x) {
    if (!arguments.length) return precision;
    precision = +x;
    return greatCircle;
  };

  greatCircle.radius = function(x) {
    if (!arguments.length) return radius;
    radius = +x;
    return greatCircle;
  };

  // Haversine formula for great-circle distance.
  greatCircle.distance = function(d, i) {
    d = coordinates.call(this, d, i);
    if (d.length < 2) return NaN;

    var from = d[0],
        to,
        x0 = from[0] * d3_radians,
        y0 = from[1] * d3_radians,
        n = d.length,
        i = 0,
        s = 0;

    while (++i < n) {
      to = d[i];
      var x1 = to[0] * d3_radians,
          y1 = to[1] * d3_radians,
          sy = Math.sin((y1 - y0) / 2),
          sx = Math.sin((x1 - x0) / 2),
          a = sy * sy + Math.cos(y0) * Math.cos(y1) * sx * sx;
      x0 = x1;
      y0 = y1;
      s += radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
    return s;
  };

  return greatCircle;
};

function d3_geo_greatCirclePath(coordinates, precision) {
  var m = coordinates.length;
  if (m < 2) return coordinates;

  var i = 0,
      p = precision * d3_radians,
      from = coordinates[0],
      to,
      x0 = from[0] * d3_radians,
      y0 = from[1] * d3_radians,
      cx0 = Math.cos(x0), sx0 = Math.sin(x0),
      cy0 = Math.cos(y0), sy0 = Math.sin(y0),
      path = [from];

  while (++i < m) {
    to = coordinates[i];
    var x1 = to[0] * d3_radians,
        y1 = to[1] * d3_radians,
        cx1 = Math.cos(x1), sx1 = Math.sin(x1),
        cy1 = Math.cos(y1), sy1 = Math.sin(y1),
        d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))),
        sd = Math.sin(d),
        n = Math.ceil(d / p),
        f = d / n,
        e = 0,
        j = 0;

    while (++j < n) {
      e += f;
      var A = Math.sin(d - e) / sd,
          B = Math.sin(e) / sd,
          x = A * cy0 * cx0 + B * cy1 * cx1,
          y = A * cy0 * sx0 + B * cy1 * sx1,
          z = A * sy0       + B * sy1;
      path.push([
        Math.atan2(y, x) / d3_radians,
        Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians
      ]);
    }
    path.push(to);
    x0 = x1;
    y0 = y1;
    cx0 = cx1; sx0 = sx1;
    cy0 = cy1; sy0 = sy1;
  }

  return path;
}
