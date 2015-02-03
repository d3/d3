import "layout";
import "hierarchy";

/**
 * @see <a href="http://portal.acm.org/citation.cfm?id=1124772.1124851"
 * >"Visualization of large hierarchical data by circle packing"</a> by W. Wang,
 * H. Wang, G. Dai, and H. Wang, ACM CHI 2006.
 */
d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
      padding = 0,
      size = [1, 1],
      radius;

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        w = size[0],
        h = size[1],
        r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() { return radius; };

    // Recursively compute the layout.
    root.x = root.y = 0;
    d3_layout_hierarchyVisitAfter(root, function(d) { d.r = +r(d.value); });
    d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);

    // When padding, recompute the layout using scaled padding.
    if (padding) {
      var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
      d3_layout_hierarchyVisitAfter(root, function(d) { d.r += dr; });
      d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
      d3_layout_hierarchyVisitAfter(root, function(d) { d.r -= dr; });
    }

    // Translate and scale the layout to fit the requested size.
    d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));

    return nodes;
  }

  pack.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return pack;
  };

  pack.radius = function(_) {
    if (!arguments.length) return radius;
    radius = _ == null || typeof _ === "function" ? _ : +_;
    return pack;
  };

  pack.padding = function(_) {
    if (!arguments.length) return padding;
    padding = +_;
    return pack;
  };

  return d3_layout_hierarchyRebind(pack, hierarchy);
};

/**
 * Return the difference between a and b's value property.
 *
 * Default sort callback for the pack layout.
 *
 * @param  {object} a
 * @param  {object} b
 * @return {number}
 */
function d3_layout_packSort(a, b) {
  return a.value - b.value;
}

/**
 * Insert node b after node a in the node chain.
 *
 * @param  {object} a
 * @param  {object} b
 */
function d3_layout_packInsert(a, b) {
  var c = a._pack_next;
  a._pack_next = b;
  b._pack_prev = a;
  b._pack_next = c;
  c._pack_prev = b;
}

function d3_layout_packSplice(a, b) {
  a._pack_next = b;
  b._pack_prev = a;
}

/**
 * Check if two circles intersect.
 *
 * @param  {object} a
 * @param  {object} b
 * @return {bool}
 */
function d3_layout_packIntersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return .999 * dr * dr > dx * dx + dy * dy; // relative error within epsilon
}

/**
 * Layout nodes in the circle pack layout.
 *
 * @param  {object} node
 */
function d3_layout_packSiblings(node) {
  if (!(nodes = node.children) || !(n = nodes.length)) return;

  var nodes,
      xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      a, b, c, i, j, k, n;

  /**
   * Given a node that's been placed, update the max and min bounds of all nodes.
   *
   * @param  {object} node
   */
  function bound(node) {
    xMin = Math.min(node.x - node.r, xMin);
    xMax = Math.max(node.x + node.r, xMax);
    yMin = Math.min(node.y - node.r, yMin);
    yMax = Math.max(node.y + node.r, yMax);
  }

  // Create node links.
  nodes.forEach(d3_layout_packLink);

  // Place the first circle.
  a = nodes[0];
  a.x = -a.r;
  a.y = 0;
  bound(a);


  if (n > 1) {
    // Place the second circle next to the first circle.
    b = nodes[1];
    b.x = b.r;
    b.y = 0;
    bound(b);


    if (n > 2) {
      // Place the third circle in reference to the first two.
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      // Connect the two ends of the node chain.
      d3_layout_packInsert(a, c);
      a._pack_prev = c;
      d3_layout_packInsert(c, b);
      b = a._pack_next;

      // Place the rest of the circles.
      for (i = 3; i < n; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        var isect = 0, s1 = 1, s2 = 1;
        // Loop through circles in the existing chain,
        // checking if the placement of c intersects any previously placed circles.
        for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
          if (d3_layout_packIntersects(j, c)) {
            isect = 1;
            break;
          }
        }

        // If an intersection was found, calculate the node distance from circle a.
        if (isect == 1) {
          for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
            if (d3_layout_packIntersects(k, c)) {
              break;
            }
          }
        }

        if (isect) {
          // If an intersection was found, one of the reference circles (a or b)
          // must be replaced with the intersecting circle.
          //
          // Decide which reference circle to replace by distance in the chain
          // from the current reference circles.
          if (s1 < s2 || (s1 == s2 && b.r < a.r)) {
            d3_layout_packSplice(a, b = j);
          }
          else {
            d3_layout_packSplice(a = k, b);
          }
          i--;
        } else {
          // If no intersection was found, the placement was successful, and the
          // new circle can now take over as a reference circle.
          d3_layout_packInsert(a, c);
          b = c;
          bound(c);
        }
      }
    }
  }

  // Re-center the circles and compute the encompassing radius.
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (i = 0; i < n; i++) {
    c = nodes[i];
    c.x -= cx;
    c.y -= cy;
    cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
  }
  node.r = cr;

  // Remove node links.
  nodes.forEach(d3_layout_packUnlink);
}

/**
 * Initialize the previous and next links for a node.
 *
 * @param  {object} node
 */
function d3_layout_packLink(node) {
  node._pack_next = node._pack_prev = node;
}

/**
 * Remove links from a node.
 *
 * @param  {object} node
 */
function d3_layout_packUnlink(node) {
  delete node._pack_next;
  delete node._pack_prev;
}

function d3_layout_packTransform(node, x, y, k) {
  var children = node.children;
  node.x = x += k * node.x;
  node.y = y += k * node.y;
  node.r *= k;
  if (children) {
    var i = -1, n = children.length;
    while (++i < n) d3_layout_packTransform(children[i], x, y, k);
  }
}

/**
 * Place circle c on tangents of reference circles a and b.
 *
 * @param  {object} a
 * @param  {object} b
 * @param  {object} c
 */
function d3_layout_packPlace(a, b, c) {
  var db = a.r + c.r,
      dx = b.x - a.x,
      dy = b.y - a.y;
  if (db && (dx || dy)) {

    var da = b.r + c.r,
        dc = dx * dx + dy * dy;
    da *= da;
    db *= db;
    var x = .5 + (db - da) / (2 * dc),
        y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
    c.x = a.x + x * dx + y * dy;
    c.y = a.y + x * dy - y * dx;
  } else {
    c.x = a.x + db;
    c.y = a.y;
  }
}
