/**
 * Given a GeoJSON object, returns the corresponding bounding box. The bounding
 * box is represented by a two-dimensional array: [[left, bottom], [right,
 * top]], where left is the minimum longitude, bottom is the minimum latitude,
 * right is maximum longitude, and top is the maximum latitude.
 */
d3.geo.bounds = (function() {
  var left, bottom, right, top,
      recurse = d3_geo_typeRecurse({
    Point: function(o) {
      o = o.coordinates;
      var x = o[0], y = o[1];
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < bottom) bottom = y;
      if (y > top) top = y;
    },
    Polygon: function(o) {
      // Only check bounds of exterior ring.
      recurse({type: "LineString", coordinates: o.coordinates[0]});
    }
  });
  return function(object) {
    left = bottom = Infinity;
    right = top = -Infinity;
    recurse(object);
    return [[left, bottom], [right, top]];
  };
})();
