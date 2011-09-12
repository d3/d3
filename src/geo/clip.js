d3.geo.clip = function() {
  var origin = [0, 0],
      angle = 90,
      r = d3_geo_earthRadius * angle / 180 * Math.PI;

  function clip(d) {
    var o = {source: origin, target: null},
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
          if (p) {
            clipped.push.apply(clipped, d3_geo_clipGreatCircle({source: p, target: o.target}));
          }
          clipped.push.apply(clipped, path.slice(j));
          p = q = null;
        } else {
          clipped.push(o.target);
        }
      } else {
        q = o.target;
        if (!p && clipped.length) {
          path = d3_geo_clipGreatCircle({source: clipped[clipped.length - 1], target: o.target});
          j = d3_geo_clipClosest(path, o, r);
          clipped.push.apply(clipped, path.slice(0, j));
          p = o.target;
        }
      }
    }
    if (q && clipped.length) {
      o.target = clipped[0];
      path = d3_geo_clipGreatCircle({source: q, target: o.target});
      j = d3_geo_clipClosest(path, o, r);
      if (p) {
        clipped.push.apply(clipped, d3_geo_clipGreatCircle({source: p, target: o.target}));
      }
      clipped.push.apply(clipped, path.slice(j));
    }
    return clipped;
  }

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

var d3_geo_clipGreatCircle = d3.geo.greatCircle().n(100);

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
