// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
function layout_treemap() {
  var children = layout_treemapChildren,
      value = layout_treemapValue,
      size = [1, 1]; // width, height

  // Recursively compute the node depth and value.
  // Also converts the data representation into a standard tree structure.
  // Also sorts child nodes by descending value to optimize squarification.
  function sum(data, depth, nodes) {
    var datas = children.call(treemap, data, depth),
        node = {depth: depth, data: data};
    nodes.push(node);
    if (datas) {
      var i = -1,
          n = datas.length,
          c = node.children = [],
          v = 0,
          j = depth + 1;
      while (++i < n) {
        d = sum(datas[i], j, nodes);
        if (d.value > 0) { // ignore NaN, negative, etc.
          c.push(d);
          v += d.value;
        }
      }
      node.value = v;
    } else {
      node.value = value.call(treemap, data, depth);
    }
    if (!depth) scale(node, size[0] * size[1] / node.value); // root
    return node;
  }

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

  // Arranges the specified children into squarified rows.
  function squarify(children, node) {
    var rect = {x: node.x, y: node.y, dx: node.dx, dy: node.dy},
        row = [],
        child,
        best = Infinity, // the best row score so far
        score, // the current row score
        u = Math.min(rect.dx, rect.dy), // initial orientation
        n;
    children = children.slice(); // copy-on-write
    children.sort(function(a, b) { return b.area - a.area; });
    row.area = 0;
    while ((n = children.length) > 0) {
      row.push(child = children[n - 1]);
      row.area += child.area;
      if ((score = worst(row, u)) <= best) { // continue with this orientation
        children.pop();
        best = score;
      } else { // abort, and try a different orientation
        row.area -= row.pop().area;
        position(row, u, rect);
        u = Math.min(rect.dx, rect.dy);
        row.length = row.area = 0;
        best = Infinity;
      }
    }
    if (row.length) {
      position(row, u, rect);
      row.length = row.area = 0;
    }
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
  function position(row, u, rect) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? row.area / u : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = o.area / v;
      }
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = o.area / v;
      }
      rect.x += v;
      rect.dx -= v;
    }
  }

  // Recursively computes the treemap layout for the node and its children.
  function layout(node) {
    var children = node.children;
    if (children) {
      squarify(children, node);
      children.forEach(layout);
    }
  }

  function treemap(d) {
    var nodes = [],
        root = sum(d, 0, nodes);
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    layout(root);
    return nodes;
  }

  treemap.children = function(x) {
    if (!arguments.length) return children;
    children = x;
    return treemap;
  };

  treemap.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return treemap;
  };

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  return treemap;
}

function layout_treemapChildren(d) {
  return d.children;
}

function layout_treemapValue(d) {
  return d.value;
}
