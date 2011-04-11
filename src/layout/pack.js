d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy(),
      separation = 1, // spacing
      size = [1, 1];
      radius = d3_layout_packRadius;

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    d3_layout_packRadii(nodes, radius);

    /* Recursively compute the layout. */
    root.x = 0;
    root.y = 0;
    root.radius = d3_layout_packTree(root, separation);

    var w = size[0],
        h = size[1],
        k = 1 / Math.max(2 * root.radius / w, 2 * root.radius / h);
    d3_layout_packTransform(root, w / 2, h / 2, k);
    return nodes;
  }

  pack.sort = d3.rebind(pack, hierarchy.sort);
  pack.children = d3.rebind(pack, hierarchy.children);
  pack.value = d3.rebind(pack, hierarchy.value);

  pack.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return pack;
  };

  pack.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return pack;
  };

  pack.radius = function(x) {
    if (!arguments.length) return radius;
    radius = x;
    return pack;
  };

  return pack;
};

function d3_layout_packRadius(d) {
  return d.radius;
}

function d3_layout_packCircle(nodes, spacing) {
  var xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      a, b, c, j, k;

  function bound(n) {
    xMin = Math.min(n.x - n.radius, xMin);
    xMax = Math.max(n.x + n.radius, xMax);
    yMin = Math.min(n.y - n.radius, yMin);
    yMax = Math.max(n.y + n.radius, yMax);
  }

  function insert(a, b) {
    var c = a.n;
    a.n = b;
    b.p = a;
    b.n = c;
    c.p = b;
  }

  function splice(a, b) {
    a.n = b;
    b.p = a;
  }

  function intersects(a, b) {
    var dx = b.x - a.x,
        dy = b.y - a.y,
        dr = a.radius + b.radius;
    return (dr * dr - dx * dx - dy * dy) > .001; // within epsilon
  }

  /* Create first node. */
  a = nodes[0];
  a.x = -a.radius;
  a.y = 0;
  bound(a);

  /* Create second node. */
  if (nodes.length > 1) {
    b = nodes[1];
    b.x = b.radius;
    b.y = 0;
    bound(b);

    /* Create third node and build chain. */
    if (nodes.length > 2) {
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      insert(a, c);
      a.p = c;
      insert(c, b);
      b = a.n;

      /* Now iterate through the rest. */
      for (var i = 3; i < nodes.length; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        /* Search for the closest intersection. */
        var isect = 0, s1 = 1, s2 = 1;
        for (j = b.n; j != b; j = j.n, s1++) {
          if (intersects(j, c)) {
            isect = 1;
            break;
          }
        }
        if (isect == 1) {
          for (k = a.p; k != j.p; k = k.p, s2++) {
            if (intersects(k, c)) {
              if (s2 < s1) {
                isect = -1;
                j = k;
              }
              break;
            }
          }
        }

        /* Update node chain. */
        if (isect == 0) {
          insert(a, c);
          b = c;
          bound(c);
        } else if (isect > 0) {
          splice(a, j);
          b = j;
          i--;
        } else if (isect < 0) {
          splice(j, b);
          a = j;
          i--;
        }
      }
    }
  }

  /* Re-center the circles and return the encompassing radius. */
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    n.x -= cx;
    n.y -= cy;
    cr = Math.max(cr, n.radius + Math.sqrt(n.x * n.x + n.y * n.y));
  }
  return cr + spacing;
}

function d3_layout_packTree(n, spacing) {
  var nodes = [],
      children = n.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      if (c.children) c.radius = d3_layout_packTree(c, spacing);
      c.n = c.p = c;
      nodes.push(c);
    }
  }
  return d3_layout_packCircle(nodes, spacing);
}

function d3_layout_packTransform(n, x, y, k) {
  var children = n.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var c = children[i];
      c.x += n.x;
      c.y += n.y;
      d3_layout_packTransform(c, x, y, k);
    }
  }
  n.x = x + k * n.x;
  n.y = y + k * n.y;
  n.radius *= k;
}

function d3_layout_packPlace(a, b, c) {
  var da = b.radius + c.radius,
      db = a.radius + c.radius,
      dx = b.x - a.x,
      dy = b.y - a.y,
      dc = Math.sqrt(dx * dx + dy * dy),
      cos = (db * db + dc * dc - da * da) / (2 * db * dc),
      theta = Math.acos(cos),
      x = cos * db,
      h = Math.sin(theta) * db;
  dx /= dc;
  dy /= dc;
  c.x = a.x + x * dx + h * dy;
  c.y = a.y + x * dy - h * dx;
}

// Computes the radii of the leaf nodes.
// TODO (from Protovis version):
// Is it possible for spacing to operate in pixel space?
// Right now it appears to be multiples of the smallest radius.
function d3_layout_packRadii(nodes, radius) {
  for (var i = 0, n = nodes.length; i < n; i++) {
    var c = nodes[i];
    if (!c.children) {
      c.radius = radius.call(this, c, i);
    }
  }
}
