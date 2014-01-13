import "../core/functor";
import "../math/trigonometry";
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
 * @param vertices [[x1, y1], [x2, y2], ...]
 * @returns polygon [[x1, y1], [x2, y2], ...]
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
        i,
        n = data.length,
        points = [], // of the form [[x0, y0, 0], ..., [xn, yn, n]]
        flippedPoints = [];

    for (i = 0 ; i < n; i++) {
      points.push([+fx.call(this, data[i], i), +fy.call(this, data[i], i), i]);
    }

    // sort ascending by x-coord first, y-coord second
    points.sort(d3_geom_hullOrder);

    // we flip bottommost points across y axis so we can use the upper hull routine on both
    for (i = 0; i < n; i++) flippedPoints.push([points[i][0], -points[i][1]]);

    var upper = d3_geom_hullUpper(points),
        lower = d3_geom_hullUpper(flippedPoints);

    // construct the polygon, removing possible duplicate endpoints
    var skipLeft = lower[0] === upper[0],
        skipRight  = lower[lower.length - 1] === upper[upper.length - 1],
        polygon = [];

    // add upper hull in r->l order
    // then add lower hull in l->r order
    for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
    for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);

    return polygon;
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
function d3_geom_hullUpper(points) {
  var n = points.length,
      hull = [0, 1],
      hs = 2; // hull size

  for (var i = 2; i < n; i++) {
    while (hs > 1 && d3_cross2d(points[hull[hs-2]], points[hull[hs-1]], points[i]) <= 0) --hs;
    hull[hs++] = i;
  }

  // we slice to make sure that the points we 'popped' from hull don't stay behind
  return hull.slice(0, hs);
}

// comparator for ascending sort by x-coord first, y-coord second
function d3_geom_hullOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}
