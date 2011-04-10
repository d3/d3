// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy(),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        x0 = 0, // min breadth
        x1 = 0, // max breadth
        y1 = 0; // max depth

    function firstWalk(node, previousSibling) {
      var children = node.children;
      if (!children) {
        if (previousSibling) {
          node.prelim = previousSibling.prelim + separation(node, previousSibling);
        }
      } else {
        var n = children.length,
            firstChild = children[0],
            lastChild = children[n - 1],
            ancestor = firstChild,
            previousChild,
            child,
            i = -1;
        while (++i < n) {
          child = children[i];
          firstWalk(child, previousChild);
          ancestor = apportion(child, previousChild, ancestor);
          previousChild = child;
        }
        d3_layout_treeShift(node);
        var midpoint = .5 * (firstChild.prelim + lastChild.prelim);
        if (previousSibling) {
          node.prelim = previousSibling.prelim + separation(node, previousSibling);
          node.mod = node.prelim - midpoint;
        } else {
          node.prelim = midpoint;
        }
      }
    }

    function secondWalk(v, m, depth) {
      v.breadth = v.prelim + m;
      if (v.breadth < x0) x0 = v.breadth;
      if (v.breadth > x1) x1 = v.breadth;
      if (depth > y1) y1 = depth;
      m += v.mod;
      var children = v.children;
      if (children) {
        for (var i=0, ii=children.length; i<ii; i++) {
          secondWalk(children[i], m, depth + 1);
        }
      }
    }

    // vl is the previous sibling of v
    function apportion(v, vl, a) {
      var w = vl;
      if (w) {
        var vip = v,
            vop = v,
            vim = w,
            vom = v.parent.children[0],
            sip = vip.mod,
            sop = vop.mod,
            sim = vim.mod,
            som = vom.mod,
            nr = d3_tree_layoutRight(vim),
            nl = d3_tree_layoutLeft(vip);
        while (nr && nl) {
          vim = nr;
          vip = nl;
          vom = d3_tree_layoutLeft(vom);
          vop = d3_tree_layoutRight(vop);
          vop.ancestor = v;
          var shift = (vim.prelim + sim) - (vip.prelim + sip) + separation(vim, vip);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, v, a), v, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim.mod;
          sip += vip.mod;
          som += vom.mod;
          sop += vop.mod;
          nr = d3_tree_layoutRight(vim);
          nl = d3_tree_layoutLeft(vip);
        }
        if (nr && !d3_tree_layoutRight(vop)) {
          vop.thread = nr;
          vop.mod += sim - sop;
        }
        if (nl && !d3_tree_layoutLeft(vom)) {
          vom.thread = nl;
          vom.mod += sip - som;
          a = v;
        }
      }
      return a;
    }

    // Initialize temporary layout variables. TODO store separately?
    d3_layout_treeVisitAfter(root, function(v, vl, i) {
      v.ancestor = v;
      v.prelim = 0;
      v.mod = 0;
      v.change = 0;
      v.shift = 0;
      v.number = vl ? vl.number + 1 : 0;
      v.depth = i;
    });

    // Compute the layout using Buchheim et al.'s algorithm.
    firstWalk(root);
    secondWalk(root, -root.prelim, 0);

    // Clear temporary layout variables; transform depth and breadth.
    d3_layout_treeVisitAfter(root, function(v) {
      v.x = ((v.breadth - x0) / (x1 - x0)) * size[0];
      v.y = v.depth / y1 * size[1];
      delete v.breadth;
      delete v.depth;
      delete v.ancestor;
      delete v.prelim;
      delete v.mod;
      delete v.change;
      delete v.shift;
      delete v.number;
      delete v.thread;
    });

    return nodes;
  }

  tree.sort = d3.rebind(tree, hierarchy.sort);
  tree.children = d3.rebind(tree, hierarchy.children);

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return tree;
  };

  return tree;
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_tree_layoutLeft(v) {
  return v.children ? v.children[0] : v.thread;
}

function d3_tree_layoutRight(v) {
  return v.children ? v.children[v.children.length - 1] : v.thread;
}

function d3_layout_treeVisitAfter(n, f) {
  function visit(n, nl, i) {
    var children = n.children;
    if (children) {
      var cl = null;
      for (var j=0, jj=children.length; j<jj; j++) {
        var c = children[j];
        visit(c, cl, i + 1);
        cl = c;
      }
    }
    f(n, nl, i);
  }
  visit(n, null, 0);
}

function d3_layout_treeShift(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      c;
  while (--i >= 0) {
    c = children[i];
    c.prelim += shift;
    c.mod += shift;
    change += c.change;
    shift += c.shift + change;
  }
}

function d3_layout_treeMove(wm, wp, shift) {
  var subtrees = wp.number - wm.number;
  wp.change -= shift / subtrees;
  wp.shift += shift;
  wm.change += shift / subtrees;
  wp.prelim += shift;
  wp.mod += shift;
}

function d3_layout_treeAncestor(vim, v, a) {
  return vim.ancestor.parent == v.parent ? vim.ancestor : a;
}
