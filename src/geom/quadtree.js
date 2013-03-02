d3.geom.quadtree = function(points, x1, y1, x2, y2) {
  var p,
      i = -1,
      n = points.length;

  // Allow bounds to be specified explicitly.
  if (arguments.length < 5) {
    if (arguments.length === 3) {
      y2 = y1;
      x2 = x1;
      y1 = x1 = 0;
    } else {
      x1 = y1 = Infinity;
      x2 = y2 = -Infinity;

      // Compute bounds.
      while (++i < n) {
        p = points[i];
        if (p.x < x1) x1 = p.x;
        if (p.y < y1) y1 = p.y;
        if (p.x > x2) x2 = p.x;
        if (p.y > y2) y2 = p.y;
      }
    }
  }

  // Squarify the bounds.
  var dx = x2 - x1,
      dy = y2 - y1;
  if (dx > dy) y2 = y1 + dx;
  else x2 = x1 + dy;

  // Recursively inserts the specified point p at the node n or one of its
  // descendants. The bounds are defined by [x1, x2] and [y1, y2].
  function insert(n, p) {
    if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid points
    if (n.leaf) {
      var v = n.point;
      if (v) {
        // If the point at this leaf node is at the same position as the new
        // point we are adding, we leave the point associated with the
        // internal node while adding the new point to a child node. This
        // avoids infinite recursion.
        if ((Math.abs(v.x - p.x) + Math.abs(v.y - p.y)) < .01) {
          insertChild(n, p);
        } else {
          n.point = null;
          insertChild(n, v);
          insertChild(n, p);
        }
      } else {
        n.point = p;
      }
    } else {
      insertChild(n, p);
    }
  }

  // Recursively inserts the specified point p into a descendant of node n. 
  function insertChild(n, p) {
    // Compute the split point, and the quadrant in which to insert p.
    var sx = (n.x1 + n.x2) * .5,
        sy = (n.y1 + n.y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy,
        i = (bottom << 1) + right;
        
    // Update the bounds as we recurse.
    var x1 = right ? sx : n.x1,
        x2 = right ? n.x2 : sx,
        y1 = bottom ? sy : n.y1,
        y2 = bottom ? n.y2 : sy;

    // Recursively insert into the child node.
    n.leaf = false;
    n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode(x1,y1,x2,y2));
    insert(n, p, x1, y1, x2, y2);
  }

  // Create the root node.
  var root = d3_geom_quadtreeNode(x1,y1,x2,y2);

  root.add = function(p) {
    insert(root, p, x1, y1, x2, y2);
  };

  root.visit = function(f) {
    d3_geom_quadtreeVisit(f, root);
  };

  // Insert all points.
  points.forEach(root.add);
  return root;
};

function d3_geom_quadtreeNode(x1,y1,x2,y2) {
  return {
    x1 : x1,
    x2 : x2,
    y1 : y1,
    y2 : y2,
    leaf: true,
    nodes: [],
    point: null
  };
}

function d3_geom_quadtreeVisit(f, node) {
  if (!f(node, node.x1, node.y1, node.x2, node.y2)) {
    node.nodes.forEach(function(child) {
      d3_geom_quadtreeVisit(f, child);
    });    
  }
}