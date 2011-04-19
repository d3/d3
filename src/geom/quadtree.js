/**
 * Constructs a new quadtree for the specified array of points. A quadtree is a
 * two-dimensional recursive spatial subdivision. This implementation uses
 * square partitions, dividing each square into four equally-sized squares. Each
 * point exists in a unique node; if multiple points are in the same position,
 * some points may be stored on internal nodes rather than leaf nodes. Quadtrees
 * can be used to accelerate various spatial operations, such as the Barnes-Hut
 * approximation for computing n-body forces, or collision detection.
 *
 * @param points [{x: x1, y: y1}, {x: x2, y: y2}, …]
 * @return quadtree root {left: boolean, nodes: […], point: {x: x, y: y}}
 */
d3.geom.quadtree = function(points) {
  var p,
      i = -1,
      n = points.length;

  /* Type conversion for deprecated API. */
  if (n && isNaN(points[0].x)) points = points.map(d3_geom_quadtreePoint);

  /* Compute bounds. */
  var x1 = Infinity, y1 = x1,
      x2 = -Infinity, y2 = x2;
  while (++i < n) {
    p = points[i];
    if (p.x < x1) x1 = p.x;
    if (p.y < y1) y1 = p.y;
    if (p.x > x2) x2 = p.x;
    if (p.y > y2) y2 = p.y;
  }

  /* Squarify the bounds. */
  var dx = x2 - x1,
      dy = y2 - y1;
  if (dx > dy) y2 = y1 + dx;
  else x2 = x1 + dy;

  /**
   * @ignore Recursively inserts the specified point <i>p</i> at the node
   * <i>n</i> or one of its descendants. The bounds are defined by [<i>x1</i>,
   * <i>x2</i>] and [<i>y1</i>, <i>y2</i>].
   */
  function insert(n, p, x1, y1, x2, y2) {
    if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid points
    if (n.leaf) {
      var v = n.point;
      if (v) {
        /*
         * If the point at this leaf node is at the same position as the new
         * point we are adding, we leave the point associated with the
         * internal node while adding the new point to a child node. This
         * avoids infinite recursion.
         */
        if ((Math.abs(v.x - p.x) + Math.abs(v.y - p.y)) < .01) {
          insertChild(n, p, x1, y1, x2, y2);
        } else {
          n.point = null;
          insertChild(n, v, x1, y1, x2, y2);
          insertChild(n, p, x1, y1, x2, y2);
        }
      } else {
        n.point = p;
      }
    } else {
      insertChild(n, p, x1, y1, x2, y2);
    }
  }

  /**
   * @ignore Recursively inserts the specified point <i>p</i> into a
   * descendant of node <i>n</i>. The bounds are defined by [<i>x1</i>,
   * <i>x2</i>] and [<i>y1</i>, <i>y2</i>].
   */
  function insertChild(n, p, x1, y1, x2, y2) {
    /* Compute the split point, and the quadrant in which to insert p. */
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy,
        i = (bottom << 1) + right;

    /* Recursively insert into the child node. */
    n.leaf = false;
    n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());

    /* Update the bounds as we recurse. */
    if (right) x1 = sx; else x2 = sx;
    if (bottom) y1 = sy; else y2 = sy;
    insert(n, p, x1, y1, x2, y2);
  }

  /* Create the root node. */
  var root = d3_geom_quadtreeNode();

  /* Insert all points. */
  i = -1;
  while (++i < n) insert(root, points[i], x1, y1, x2, y2);

  /* Register a visitor function for the root. */
  root.visit = function(f) {
    d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
  };

  return root;
};

function d3_geom_quadtreeNode() {
  return {
    leaf: true,
    nodes: [],
    point: null
  };
}

function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
  if (!f(node, x1, y1, x2, y2)) {
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        children = node.nodes;
    if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
    if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
    if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
    if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
  }
}

function d3_geom_quadtreePoint(p) {
  return {
    x: p[0],
    y: p[1]
  };
}
