// From http://williams.best.vwh.net/avform.htm#Intermediate
d3.geo.greatCircle = function() {
  var source = d3_geo_greatCircleSource,
      target = d3_geo_greatCircleTarget,
      n = 100,
      radius = 6371; // Mean radius of Earth, in km.
  // TODO: breakAtDateLine?

  function greatCircle(d, i) {
    var from = source.call(this, d, i),
        to = target.call(this, d, i),
        x0 = from[0] * d3_radians,
        y0 = from[1] * d3_radians,
        x1 = to[0] * d3_radians,
        y1 = to[1] * d3_radians,
        cx0 = Math.cos(x0), sx0 = Math.sin(x0),
        cy0 = Math.cos(y0), sy0 = Math.sin(y0),
        cx1 = Math.cos(x1), sx1 = Math.sin(x1),
        cy1 = Math.cos(y1), sy1 = Math.sin(y1),
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

  greatCircle.source = function(x) {
    if (!arguments.length) return source;
    source = x;
    return greatCircle;
  };

  greatCircle.target = function(x) {
    if (!arguments.length) return target;
    target = x;
    return greatCircle;
  };

  greatCircle.n = function(x) {
    if (!arguments.length) return n;
    n = +x;
    return greatCircle;
  };

  greatCircle.radius = function(x) {
    if (!arguments.length) return radius;
    radius = +x;
    return greatCircle;
  };

  // Haversine formula for great-circle distance.
  greatCircle.distance = function(d, i) {
    var from = source.call(this, d, i),
        to = target.call(this, d, i),
        x0 = from[0] * d3_radians,
        y0 = from[1] * d3_radians,
        x1 = to[0] * d3_radians,
        y1 = to[1] * d3_radians,
        sy = Math.sin((y1 - y0) / 2),
        sx = Math.sin((x1 - x0) / 2),
        a = sy * sy + Math.cos(y0) * Math.cos(y1) * sx * sx;

    return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return greatCircle;
};

function d3_geo_greatCircleSource(d) {
  return d.source;
}

function d3_geo_greatCircleTarget(d) {
  return d.target;
}
