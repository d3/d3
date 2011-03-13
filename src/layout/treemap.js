// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
      round = Math.round,
      size = [1, 1]; // width, height

  // Recursively compute the node area based on value & scale.
  function scale(node, k) {
    var children = node.children;
    node.area = node.value * k;
    if (children) {
      var i = -1,
          n = children.length;
      while (++i < n) scale(children[i], k);
    }
  }

  // Recursively arranges the specified node's children into squarified rows.
  // Also sorts child nodes by descending value to optimize squarification.
  function squarify(node) {
    if (!node.children) return;
    var rect = {x: node.x, y: node.y, dx: node.dx, dy: node.dy},
        row = [],
        children = node.children.slice(), // copy-on-write
        child,
        best = Infinity, // the best row score so far
        score, // the current row score
        u = Math.min(rect.dx, rect.dy), // initial orientation
        n;
    row.area = 0;
    while ((n = children.length) > 0) {
      row.push(child = children[n - 1]);
      row.area += child.area;
      if ((score = worst(row, u)) <= best) { // continue with this orientation
        children.pop();
        best = score;
      } else { // abort, and try a different orientation
        row.area -= row.pop().area;
        position(row, u, rect, false);
        u = Math.min(rect.dx, rect.dy);
        row.length = row.area = 0;
        best = Infinity;
      }
    }
    if (row.length) {
      position(row, u, rect, true);
      row.length = row.area = 0;
    }
    node.children.forEach(squarify);
  }

  // Computes the score for the specified row, as the worst aspect ratio.
  function worst(row, u) {
    var s = row.area,
        r,
        rmax = 0,
        rmin = Infinity,
        i = -1,
        n = row.length;
    while (++i < n) {
      r = row[i].area;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
    }
    s *= s;
    u *= u;
    return Math.max((u * rmax) / s, s / (u * rmin));
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(row, u, rect, flush) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? round(row.area / u) : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      if (flush || v > rect.dy) v = rect.dy; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = round(o.area / v);
      }
      o.dx += rect.x + rect.dx - x; // rounding error
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      if (flush || v > rect.dx) v = rect.dx; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = round(o.area / v);
      }
      o.dy += rect.y + rect.dy - y; // rounding error
      rect.x += v;
      rect.dx -= v;
    }
  }

  function treemap(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    scale(root, size[0] * size[1] / root.value);
    squarify(root);
    return nodes;
  }

  treemap.sort = d3.rebind(treemap, hierarchy.sort);
  treemap.children = d3.rebind(treemap, hierarchy.children);
  treemap.value = d3.rebind(treemap, hierarchy.value);

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  treemap.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return treemap;
  };

  return treemap;
};
