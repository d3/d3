// An instrumented version of quadtree.find that shows the visited nodes.
export default function quadtree_findVisited(x, y, radius) {
  var visited = [],
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3, 1, 1, -1, -1));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while ((q = quads.pop())) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    visited.push(q);

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      // 0 1
      // 2 3
      quads.push(
        new Quad(node[3], xm, ym, x2, y2, 1, 1, q.dx1 - 1, q.dy1 - 1),
        new Quad(node[2], x1, ym, xm, y2, q.dx0 + 1, 1, -1, q.dy1 - 1),
        new Quad(node[1], xm, y1, x2, ym, 1, q.dy0 + 1, q.dx1 - 1, -1),
        new Quad(node[0], x1, y1, xm, ym, q.dx0 + 1, q.dy0 + 1, -1, -1)
      );

      // Visit the closest quadrant first.
      if ((i = (y >= ym) << 1 | (x >= xm))) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
      }
    }
  }

  return visited;
}

function Quad(node, x0, y0, x1, y1, dx0, dy0, dx1, dy1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
  this.dx0 = dx0;
  this.dy0 = dy0;
  this.dx1 = dx1;
  this.dy1 = dy1;
}
