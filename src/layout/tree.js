import "layout";
import "hierarchy";

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1], // width, height
      nodeSize = false;

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root0 = nodes[0],
        root1 = wrapTree(root0);

    // Compute the layout using Buchheim et al.'s algorithm.
    // Temporary variables are stored on the wrapped tree.
    firstWalk(root1);
    secondWalk(root1, -root1.z);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) {
      d3_layout_treeVisitAfter(root0, function(node) {
        node.x *= size[0];
        node.y = node.depth * size[1];
      });
    }

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = d3_layout_treeSearch(root0, d3_layout_treeLeftmost),
          right = d3_layout_treeSearch(root0, d3_layout_treeRightmost),
          x0 = left.x - separation(left, right) / 2,
          x1 = right.x + separation(right, left) / 2,
          y1 = d3_layout_treeSearch(root0, d3_layout_treeDeepest).depth || 1;
      d3_layout_treeVisitAfter(root0, function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = node.depth / y1 * size[1];
      });
    }

    return nodes;
  }

  function wrapTree(root0) {
    var root1 = {c: [root0]},
        queue = [root1],
        node1;

    while ((node1 = queue.pop()) != null) {
      for (var children = node1.c, child, i = 0, n = children.length; i < n; ++i) {
        queue.push((children[i] = child = {
          _: children[i], // source node
          p: node1, // parent
          c: (child = children[i].children) && child.slice() || [], // children
          a: null, // ancestor
          z: 0, // prelim
          m: 0, // mod
          d: 0, // change
          s: 0, // shift
          i: i
        }).a = child);
      }
    }

    root1 = root1.c[0];
    root1.p = null;
    return root1;
  }

  function firstWalk(node, previousSibling) {
    if (n = (children = node.c).length) {
      var n,
          children,
          firstChild = children[0],
          previousChild,
          ancestor = firstChild,
          child,
          i = -1;
      while (++i < n) {
        child = children[i];
        firstWalk(child, previousChild);
        ancestor = apportion(child, previousChild, ancestor);
        previousChild = child;
      }
      d3_layout_treeShift(node);
      var midpoint = .5 * (firstChild.z + child.z);
      if (previousSibling) {
        node.z = previousSibling.z + separation(node._, previousSibling._);
        node.m = node.z - midpoint;
      } else {
        node.z = midpoint;
      }
    } else if (previousSibling) {
      node.z = previousSibling.z + separation(node._, previousSibling._);
    }
  }

  function secondWalk(node, x) {
    node._.x = node.z + x;
    var children = node.c;
    if (n = children.length) {
      var i = -1,
          n;
      x += node.m;
      while (++i < n) {
        secondWalk(children[i], x);
      }
    }
  }

  function apportion(node, previousSibling, ancestor) {
    if (previousSibling) {
      var vip = node,
          vop = node,
          vim = previousSibling,
          vom = node.p.c[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
        vom = d3_layout_treeLeft(vom);
        vop = d3_layout_treeRight(vop);
        vop.a = node;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !d3_layout_treeRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !d3_layout_treeLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = node;
      }
    }
    return ancestor;
  }

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return nodeSize ? null : size;
    nodeSize = (size = x) == null;
    return tree;
  };

  tree.nodeSize = function(x) {
    if (!arguments.length) return nodeSize ? size : null;
    nodeSize = (size = x) != null;
    return tree;
  };

  return d3_layout_hierarchyRebind(tree, hierarchy);
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_layout_treeLeft(node) {
  var children = node.c;
  return children.length ? children[0] : node.t;
}

function d3_layout_treeRight(node) {
  var children = node.c, n;
  return (n = children.length) ? children[n - 1] : node.t;
}

function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children && (n = children.length)) {
    var child,
        n,
        i = -1;
    while (++i < n) {
      if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
        node = child;
      }
    }
  }
  return node;
}

function d3_layout_treeRightmost(a, b) {
  return a.x - b.x;
}

function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x;
}

function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth;
}

function d3_layout_treeVisitAfter(node, callback) {
  (function visit(node) {
    var children = node.children;
    if (children && (n = children.length)) {
      var i = -1, n;
      while (++i < n) visit(children[i]);
    }
    callback(node);
  })(node);
}

function d3_layout_treeShift(node) {
  var shift = 0,
      change = 0,
      children = node.c,
      i = children.length,
      child;
  while (--i >= 0) {
    child = children[i];
    child.z += shift;
    child.m += shift;
    shift += child.s + (change += child.d);
  }
}

function d3_layout_treeMove(ancestor, node, shift) {
  var change = shift / (node.i - ancestor.i);
  ancestor.d += change;
  node.d -= change;
  node.s += shift;
  node.z += shift;
  node.m += shift;
}

function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim.a.p === node.p
      ? vim.a
      : ancestor;
}
