// Node-link tree diagram using the Reingold-Tilford "tidy" tree layout
// algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy(),
      group = 1,
      breadth = 15,
      depth = 60,
      orient = "top";

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i);

    // vl is the previous sibling of v
    function firstWalk(v, vl) {
      var children = v.children,
          l, r, a;
      if (!children) {
        if (l = vl) {
          v.prelim = l.prelim + distance(v.depth, true);
        }
      } else {
        var childCount = children.length;
        l = children[0];
        r = children[childCount-1];
        a = l; // default ancestor
        var cl = null; // previous sibling
        for (var i=0; i<childCount; i++) {
          var c = children[i];
          firstWalk(c, cl);
          a = apportion(c, cl, a);
          cl = c;
        }
        executeShifts(v);
        var midpoint = .5 * (l.prelim + r.prelim);
        if (l = vl) {
          v.prelim = l.prelim + distance(v.depth, true);
          v.mod = v.prelim - midpoint;
        } else {
          v.prelim = midpoint;
        }
      }
    }

    // TODO: what is "depth" used for here?
    function secondWalk(v, m, depth) {
      v.breadth = v.prelim + m;
      m += v.mod;
      var children = v.children;
      if (children) {
        for (var i=0, ii=children.length; i<ii; i++) {
          secondWalk(children[i], m, depth);
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
            nr = nextRight(vim),
            nl = nextLeft(vip);
        while (nr && nl) {
          vim = nr;
          vip = nl;
          vom = nextLeft(vom);
          vop = nextRight(vop);
          vop.ancestor = v;
          var shift = (vim.prelim + sim) - (vip.prelim + sip) + distance(vim.depth, false);
          if (shift > 0) {
            moveSubtree(ancestor(vim, v, a), v, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim.mod;
          sip += vip.mod;
          som += vom.mod;
          sop += vop.mod;
          nr = nextRight(vim);
          nl = nextLeft(vip);
        }
        if (nr && !nextRight(vop)) {
          vop.thread = nr;
          vop.mod += sim - sop;
        }
        if (nl && !nextLeft(vom)) {
          vom.thread = nl;
          vom.mod += sip - som;
          a = v;
        }
      }
      return a;
    }

    function nextLeft(v) {
      return v.children ? v.children[0] : v.thread;
    }

    function nextRight(v) {
      return v.children ? v.children[v.children.length-1] : v.thread;
    }

    function moveSubtree(wm, wp, shift) {
      var subtrees = wp.number - wm.number;
      wp.change -= shift / subtrees;
      wp.shift += shift;
      wm.change += shift / subtrees;
      wp.prelim += shift;
      wp.mod += shift;
    }

    function executeShifts(v) {
      var shift = 0, change = 0,
          children = v.children;
      for (var i = children.length; --i >= 0;) {
        var c = children[i];
        c.prelim += shift;
        c.mod += shift;
        change += c.change;
        shift += c.shift + change;
      }
    }

    function ancestor(vim, v, a) {
      return (vim.ancestor.parent == v.parent) ? vim.ancestor : a;
    }

    function distance(depth, siblings) {
      return (siblings ? 1 : (group + 1)) / ((orient == "radial") ? depth : 1);
    }

    /* Initialize temporary layout variables. TODO: store separately. */
    var root = nodes[0];
    function visitAfter(n, f) {
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
    visitAfter(root, function(v, vl, i) {
      v.ancestor = v;
      v.prelim = 0;
      v.mod = 0;
      v.change = 0;
      v.shift = 0;
      v.number = vl ? (vl.number + 1) : 0;
      v.depth = i;
    });

    /* Compute the layout using Buchheim et al.'s algorithm. */
    firstWalk(root);
    secondWalk(root, -root.prelim, 0);

    /** Returns the angle of the given node. */
    function midAngle(n) {
      return (orient === "radial") ? n.breadth / depth : 0;
    }

    function x(n) {
      switch (orient) {
        case "left": return n.depth;
        case "right": return w - n.depth;
        case "top":
        case "bottom": return n.breadth + w / 2;
        case "radial": return w / 2 + n.depth * Math.cos(midAngle(n));
      }
    }

    function y(n) {
      switch (orient) {
        case "left":
        case "right": return n.breadth + h / 2;
        case "top": return n.depth;
        case "bottom": return h - n.depth;
        case "radial": return h / 2 + n.depth * Math.sin(midAngle(n));
      }
    }

    /* Clear temporary layout variables; transform depth and breadth. */
    visitAfter(root, function(v) {
      v.breadth *= breadth;
      v.depth *= depth;
      v.midAngle = midAngle(v);
      v.x = x(v);
      v.y = y(v);
      if (v.children) v.midAngle += Math.PI;
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
  tree.value = d3.rebind(tree, hierarchy.value);

  tree.group = function(x) {
    if (!arguments.length) return group;
    group = x;
    return tree;
  };

  tree.breadth = function(x) {
    if (!arguments.length) return breadth;
    breadth = x;
    return tree;
  };

  tree.depth = function(x) {
    if (!arguments.length) return depth;
    depth = x;
    return tree;
  };

  // left, right, top, bottom or radial
  tree.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return tree;
  };

  return tree;
};
