import "../core/functor";
import "geom";
import "point";

/**
 * Computes the 2D convex hull of a set of points using the monotone chain
 * algorithm:
 * http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain)
 *
 * The runtime of this algorithm is O(n log n), where n is the number of input
 * points. However in practice it outperforms other O(n log n) hulls.
 *
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.hull = function(vertices) {
  var x = d3_geom_pointX,
      y = d3_geom_pointY;

  if (arguments.length) return hull(vertices);

  function hull(data) {
    // Hull of < 3 points is not well-defined
    if (data.length < 3) return [];

    var fx = d3_functor(x),
        fy = d3_functor(y),
        n = data.length;

    for (i = 0, points = []; i < n; i++) {
      points.push([+fx.call(this, d = data[i], i), +fy.call(this, d, i), i]);
    }

    // sort ascending by x-coord first, y-coord second
    points.sort(function(a, b) { return (a[0] - b[0]|| a[1] - b[1]); });

    // we flip bottommost points across y axis so we can use the upper hull routine on both
    var flipped_points = [];
    for (var i = 0; i < n; i++) flipped_points.push([points[i][0], -points[i][1]]);

    var uhull = d3_geom_hull_find_upper_hull(points);
    var lhull = d3_geom_hull_find_upper_hull(flipped_points);

    // construct the poly, removing possible duplicate endpoints
    var skip_l = (lhull[0] === uhull[0]),
        skip_r  = (lhull[lhull.length - 1] === uhull[uhull.length - 1]),
        poly = [];

    for (var i=uhull.length - 1; i >= 0; i--)
      poly.push(data[points[uhull[i]][2]]);  // add upper hull in r->l order
    for (var i = +skip_l; i < lhull.length - skip_r; i++)
      poly.push(data[points[lhull[i]][2]]);  // add lower hull in l->r order

    return poly;
  }

  hull.x = function(_) {
    return arguments.length ? (x = _, hull) : x;
  };

  hull.y = function(_) {
    return arguments.length ? (y = _, hull) : y;
  };

  return hull;
};

// finds the 'upper convex hull' (see wiki link above)
// assumes points arg has >=3 elements, is sorted by x, unique in y
// returns array of indices into points in left to right order
function d3_geom_hull_find_upper_hull(points) {
  var n = points.length,
      hull = [0, 1],
      hs = 2;  // hull size

  for (var i = 2; i < n; i++) {
    while (hs > 1 && !d3_geom_hull_CW(points[hull[hs-2]], points[hull[hs-1]], points[i])) {
      hs --;
    }
    hull[hs++] = i;
  }
  // we slice to make sure that the points we 'popped' from hull don't stay behind
  return hull.slice(0, hs);
}

// are three points a, b, c in clockwise order?
// i.e. is the sign of (b-a)x(c-a) positive?
function d3_geom_hull_CW(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0;
}
