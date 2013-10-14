import "../core/functor";
import "geom";
import "point";

/**
 * Computes the 2D convex hull of a set of points using Graham's scanning
 * algorithm. The algorithm has been implemented as described in Cormen,
 * Leiserson, and Rivest's Introduction to Algorithms. The running time of
 * this algorithm is O(n log n), where n is the number of input points.
 *
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.hull = function(vertices) {
  var x = d3_geom_pointX,
      y = d3_geom_pointY;

  if (arguments.length) return hull(vertices);

  function hull(data) {
    if (data.length < 3) return [];

    var fx = d3_functor(x),
        fy = d3_functor(y),
        n = data.length,
        vertices, // TODO use parallel arrays
        plen = n - 1,
        points = [],
        stack = [],
        d,
        i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;

    if (fx === d3_geom_pointX && y === d3_geom_pointY) vertices = data;
    else for (i = 0, vertices = []; i < n; ++i) {
      vertices.push([+fx.call(this, d = data[i], i), +fy.call(this, d, i)]);
    }

    // find the starting ref point: leftmost point with the minimum y coord
    for (i = 1; i < n; ++i) {
      if (vertices[i][1] < vertices[h][1]
          || vertices[i][1] == vertices[h][1]
          && vertices[i][0] < vertices[h][0]) h = i;
    }

    // calculate polar angles from ref point and sort
    for (i = 0; i < n; ++i) {
      if (i === h) continue;
      y1 = vertices[i][1] - vertices[h][1];
      x1 = vertices[i][0] - vertices[h][0];
      points.push({angle: Math.atan2(y1, x1), index: i});
    }
    points.sort(function(a, b) { return a.angle - b.angle; });

    // toss out duplicate angles
    a = points[0].angle;
    v = points[0].index;
    u = 0;
    for (i = 1; i < plen; ++i) {
      j = points[i].index;
      if (a == points[i].angle) {
        // keep angle for point most distant from the reference
        x1 = vertices[v][0] - vertices[h][0];
        y1 = vertices[v][1] - vertices[h][1];
        x2 = vertices[j][0] - vertices[h][0];
        y2 = vertices[j][1] - vertices[h][1];
        if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
          points[i].index = -1;
          continue;
        } else {
          points[u].index = -1;
        }
      }
      a = points[i].angle;
      u = i;
      v = j;
    }

    // initialize the stack
    stack.push(h);
    for (i = 0, j = 0; i < 2; ++j) {
      if (points[j].index > -1) {
        stack.push(points[j].index);
        i++;
      }
    }
    sp = stack.length;

    // do graham's scan
    for (; j < plen; ++j) {
      if (points[j].index < 0) continue; // skip tossed out points
      while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
        --sp;
      }
      stack[sp++] = points[j].index;
    }

    // construct the hull
    var poly = [];
    for (i = sp - 1; i >= 0; --i) poly.push(data[stack[i]]);
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

// are three points in counter-clockwise order?
function d3_geom_hullCCW(i1, i2, i3, v) {
  var t, a, b, c, d, e, f;
  t = v[i1]; a = t[0]; b = t[1];
  t = v[i2]; c = t[0]; d = t[1];
  t = v[i3]; e = t[0]; f = t[1];
  return (f - b) * (c - a) - (d - b) * (e - a) > 0;
}
