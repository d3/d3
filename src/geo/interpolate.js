d3.geo.interpolate = function(source, target) {
  return d3_geo_interpolate(
    source[0] * d3_radians, source[1] * d3_radians,
    target[0] * d3_radians, target[1] * d3_radians
  );
}

function d3_geo_interpolate(x0, y0, x1, y1) {
  var cy0 = Math.cos(y0),
      sy0 = Math.sin(y0),
      cy1 = Math.cos(y1),
      sy1 = Math.sin(y1),
      kx0 = cy0 * Math.cos(x0),
      ky0 = cy0 * Math.sin(x0),
      kx1 = cy1 * Math.cos(x1),
      ky1 = cy1 * Math.sin(x1),
      d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))),
      k = 1 / Math.sin(d);

  function interpolate(t) {
    var B = Math.sin(t *= d) * k,
        A = Math.sin(d - t) * k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      Math.atan2(y, x) / d3_radians,
      Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians
    ];
  }

  interpolate.distance = d;

  return interpolate;
};
