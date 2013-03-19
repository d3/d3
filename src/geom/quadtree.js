import "../core/functor";
import "../svg/line";
import "geom";

d3.geom.quadtree = function(points, x1, y1, x2, y2) {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      compat;

  // For backwards-compatibility.
  if (compat = arguments.length) {
    x = d3_geom_quadtreeCompatX;
    y = d3_geom_quadtreeCompatY;
    if (compat === 3) {
      y2 = y1;
      x2 = x1;
      y1 = x1 = 0;
    }
    return quadtree.apply(this, arguments);
  }

  function quadtree(data) {
    var d,
        fx = d3_functor(x),
        fy = d3_functor(y),
        points = [],
        i = -1,
        n = data.length;

    if (x1 != null) {
      while (++i < n) {
        points.push({x: +fx.call(this, d = data[i], i), y: +fy.call(this, d, i)});
      }
    } else {
      // Compute bounds.
      x1 = y1 = Infinity;
      x2 = y2 = -Infinity;
      while (++i < n) {
        points.push(d = {x: +fx.call(this, d = data[i], i), y: +fy.call(this, d, i)});
        if (d.x < x1) x1 = d.x;
        if (d.y < y1) y1 = d.y;
        if (d.x > x2) x2 = d.x;
        if (d.y > y2) y2 = d.y;
      }
    }

    // Squarify the bounds.
    var dx = x2 - x1,
        dy = y2 - y1;
    if (dx > dy) y2 = y1 + dx;
    else x2 = x1 + dy;

    // Recursively inserts the specified point p at the node n or one of its
    // descendants. The bounds are defined by [x1, x2] and [y1, y2].
    function insert(n, p, x1, y1, x2, y2) {
      if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid points
      if (n.leaf) {
        var v = n.point;
        if (v) {
          // If the point at this leaf node is at the same position as the new
          // point we are adding, we leave the point associated with the
          // internal node while adding the new point to a child node. This
          // avoids infinite recursion.
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

    // Recursively inserts the specified point p into a descendant of node n. The
    // bounds are defined by [x1, x2] and [y1, y2].
    function insertChild(n, p, x1, y1, x2, y2) {
      // Compute the split point, and the quadrant in which to insert p.
      var sx = (x1 + x2) * .5,
          sy = (y1 + y2) * .5,
          right = p.x >= sx,
          bottom = p.y >= sy,
          i = (bottom << 1) + right;

      // Recursively insert into the child node.
      n.leaf = false;
      n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());

      // Update the bounds as we recurse.
      if (right) x1 = sx; else x2 = sx;
      if (bottom) y1 = sy; else y2 = sy;
      insert(n, p, x1, y1, x2, y2);
    }

    // Create the root node.
    var root = d3_geom_quadtreeNode();

    root.add = function(p) {
      insert(root, p, x1, y1, x2, y2);
    };

    root.visit = function(f) {
      d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
    };

    // Insert all points.
    points.forEach(root.add);
    return root;
  }

  quadtree.x = function(_) {
    return arguments.length ? (x = _, quadtree) : x;
  };

  quadtree.y = function(_) {
    return arguments.length ? (y = _, quadtree) : y;
  };

  quadtree.size = function(_) {
    if (!arguments.length) return x1 == null ? null : [[x1, y1], [x2, y2]];
    if (_ == null) {
      x1 = y1 = x2 = y2 = null;
    } else if (Array.isArray(_[0])) {
      x1 = +_[0][0], y1 = +_[0][1];
      x2 = +_[1][0], y2 = +_[1][1];
    } else {
      x1 = y1 = 0;
      x2 = +_[0], y2 = +_[1];
    }
    return quadtree;
  };

  return quadtree;
};

function d3_geom_quadtreeCompatX(d) { return d.x; }
function d3_geom_quadtreeCompatY(d) { return d.y; }

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
