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
        j,
        path,
        clipped = [],
        p = null,
        q = null;
    while (++i < n) {
      o.target = d[i];
      distance = d3_geo_clipGreatCircle.distance(o);
      if (distance < r) {
        if (q) {
          path = d3_geo_clipGreatCircle({source: q, target: o.target});
          j = d3_geo_clipClosest(path, o, r);
          if (path.length) clipped.push(path[j]);
        }
        clipped.push(d[i]);
        p = q = null;
      } else {
        q = o.target;
        if (!p && clipped.length) {
          path = d3_geo_clipGreatCircle({source: clipped[clipped.length - 1], target: o.target});
          j = d3_geo_clipClosest(path, o, r);
          if (path.length) clipped.push(path[j]);
          p = o.target;
        }
      }
    }
    if (q && clipped.length) {
      o.target = clipped[0];
      path = d3_geo_clipGreatCircle({source: q, target: o.target});
      j = d3_geo_clipClosest(path, o, r);
      if (path.length) clipped.push(path[j]);
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

function d3_geo_clipClosest(path, o, r) {
  var i = -1,
      n = path.length,
      index = 0,
      best = Infinity;
  while (++i < n) {
    o.target = path[i];
    var d = Math.abs(d3_geo_clipGreatCircle.distance(o) - r);
    if (d < best) {
      best = d;
      index = i;
    }
  }
  o.target = path[index];
  return index;
}
