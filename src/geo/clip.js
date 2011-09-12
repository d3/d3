d3.geo.clip = function() {
  var origin = [0, 0],
      angle = 90,
      r = d3_geo_earthRadius * angle / 180 * Math.PI,
      coordinates = Object;

  function clip(d, i) {
    var d = coordinates.call(this, d, i),
        o = {source: origin, target: null},
        n = d.length,
        i = -1,
        path,
        clipped = [],
        p = null,
        q = null,
        distance,
        oldDistance;
    while (++i < n) {
      o.target = d[i];
      distance = d3_geo_clipGreatCircle.distance(o);
      if (distance < r) {
        if (q) clipped.push(d3_geo_clipIntersect(q, o.target, (oldDistance - r) / (oldDistance - distance)));
        clipped.push(d[i]);
        p = q = null;
      } else {
        q = o.target;
        if (!p && clipped.length) {
          clipped.push(d3_geo_clipIntersect(clipped[clipped.length - 1], q, (r - oldDistance) / (distance - oldDistance)));
          p = q;
        }
      }
      oldDistance = distance;
    }
    if (q && clipped.length) {
      o.target = clipped[0];
      distance = d3_geo_clipGreatCircle.distance(o);
      clipped.push(d3_geo_clipIntersect(q, o.target, (oldDistance - r) / (oldDistance - distance)));
    }
    return clipped;
  }

  clip.coordinates = function(x) {
    if (!arguments.length) return coordinates;
    coordinates = x;
    return clip;
  };

  clip.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return clip;
  };

  clip.angle = function(x) {
    if (!arguments.length) return angle;
    angle = +x;
    r = d3_geo_earthRadius * angle / 180 * Math.PI;
    return clip;
  };

  return clip;
}

var d3_geo_clipGreatCircle = d3.geo.greatCircle().coordinates(function(d) {
  return [d.source, d.target];
});

function d3_geo_clipIntersect(from, to, f) {
  var x0 = from[0] * d3_radians,
      y0 = from[1] * d3_radians,
      x1 = to[0] * d3_radians,
      y1 = to[1] * d3_radians,
      cx0 = Math.cos(x0), sx0 = Math.sin(x0),
      cy0 = Math.cos(y0), sy0 = Math.sin(y0),
      cx1 = Math.cos(x1), sx1 = Math.sin(x1),
      cy1 = Math.cos(y1), sy1 = Math.sin(y1),
      d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))),
      e = f * d,
      sd = Math.sin(d),
      A = Math.sin(d - e) / sd,
      B = Math.sin(e) / sd,
      x = A * cy0 * cx0 + B * cy1 * cx1,
      y = A * cy0 * sx0 + B * cy1 * sx1,
      z = A * sy0       + B * sy1;

  return [
    Math.atan2(y, x) / d3_radians,
    Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians
  ];
}
