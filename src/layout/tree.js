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
    d3_layout_treeVisitAfter(root1, firstWalk), root1.parent.mod = -root1.prelim;
    d3_layout_treeVisitBefore(root1, secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) {
      d3_layout_treeVisitBefore(root1, function(node) {
        node.node.x *= size[0];
        node.node.y = node.node.depth * size[1];
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
      d3_layout_treeVisitBefore(root1, function(node) {
        node.node.x = (node.node.x - x0) / (x1 - x0) * size[0];
        node.node.y = node.node.depth / y1 * size[1];
      });
    }

    return nodes;
  }

  function wrapTree(root0) {
    var root1 = {defaultAncestor: null, children: [root0]},
        queue = [root1],
        node1;

    while ((node1 = queue.pop()) != null) {
      for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
        queue.push((children[i] = child = {
          node: children[i],
          parent: node1,
          children: (child = children[i].children) && child.slice() || [],
          defaultAncestor: null,
          ancestor: null,
          prelim: 0,
          mod: 0,
          change: 0,
          shift: 0,
          number: i
        }).ancestor = child);
      }
    }

    return root1.children[0];
  }

  // FIRST WALK
  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.number ? siblings[v.number - 1] : null;
    if (children.length) {
      d3_layout_treeShift(v);
      var midpoint = (children[0].prelim + children[children.length - 1].prelim) / 2;
      if (w) {
        v.prelim = w.prelim + separation(v.node, w.node);
        v.mod = v.prelim - midpoint;
      } else {
        v.prelim = midpoint;
      }
    } else if (w) {
      v.prelim = w.prelim + separation(v.node, w.node);
    }
    v.parent.defaultAncestor = apportion(v, w, v.parent.defaultAncestor || siblings[0]);
  }

  // SECOND WALK
  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v.node.x = v.prelim + v.parent.mod;
    v.mod += v.parent.mod;
  }

  // APPORTION
  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.mod,
          sop = vop.mod,
          sim = vim.mod,
          som = vom.mod,
          shift;
      while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
        vom = d3_layout_treeLeft(vom);
        vop = d3_layout_treeRight(vop);
        vop.ancestor = v;
        shift = vim.prelim + sim - vip.prelim - sip + separation(vim.node, vip.node);
        if (shift > 0) {
          d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.mod;
        sip += vip.mod;
        som += vom.mod;
        sop += vop.mod;
      }
      if (vim && !d3_layout_treeRight(vop)) {
        vop.thread = vim;
        vop.mod += sim - sop;
      }
      if (vip && !d3_layout_treeLeft(vom)) {
        vom.thread = vip;
        vom.mod += sip - som;
        ancestor = v;
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

function d3_layout_treeVisitBefore(node, callback) {
  var nodes = [node];
  while ((node = nodes.pop()) != null) {
    callback(node);
    if ((children = node.children) && (n = children.length)) {
      var i = -1, n, children;
      while (++i < n) nodes.push(children[i]);
    }
  }
}

function d3_layout_treeVisitAfter(node, callback) {
  var nodes = [];
  d3_layout_treeVisitBefore(node, function(node) { nodes.push(node); });
  while ((node = nodes.pop()) != null) callback(node);
}

// NEXT LEFT
// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function d3_layout_treeLeft(v) {
  var children = v.children;
  return children.length ? children[0] : v.thread;
}

// NEXT RIGHT
// This function works analogously to NEXT LEFT.
function d3_layout_treeRight(v) {
  var children = v.children, n;
  return (n = children.length) ? children[n - 1] : v.thread;
}

// MOVE SUBTREE
// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function d3_layout_treeMove(wm, wp, shift) {
  var change = shift / (wp.number - wm.number);
  wp.change -= change;
  wp.shift += shift;
  wm.change += change;
  wp.prelim += shift;
  wp.mod += shift;
}

// EXECUTE SHIFTS
// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function d3_layout_treeShift(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.prelim += shift;
    w.mod += shift;
    shift += w.shift + (change += w.change);
  }
}

// ANCESTOR
// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function d3_layout_treeAncestor(vim, v, ancestor) {
  return vim.ancestor.parent === v.parent ? vim.ancestor : ancestor;
}
