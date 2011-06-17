// Implements hierarchical edge bundling using Holten's algorithm. For each
// edge, an open uniform b-spline is computed that travels through the tree, up
// the parent hierarchy to the least common ancestor, and then back down to the
// destination node.
d3.layout.bundle = function() {
  var hierarchy = d3.layout.cluster(), // or tree?
      beta = .85,
      outgoing = d3_layout_bundleOutgoing,
      nodeMap;

  function bundle(d, i) {
    return hierarchy.call(this, d, i);
  }

  bundle.bundles = function(nodes) {
    var splines = [],
        i = -1,
        n = nodes.length;
    while (++i < n) {
      var node = nodes[i],
          // TODO cache outgoing?
          targets = outgoing.call(this, node, i);
      for (var j = 0; j < targets.length; j++) {
        splines.push(d3_layout_bundleSpline(node, targets[j]));
      }
    }
    return splines;
  };

  bundle.outgoing = function(x) {
    if (!arguments.length) return outgoing;
    outgoing = x;
    return bundle;
  };

  bundle.size = d3.rebind(bundle, hierarchy.size);

  return d3_layout_hierarchyRebind(bundle, hierarchy);
};

function d3_layout_bundleSpline(start, end) {
  var lca = d3_layout_bundleLeastCommonAncestor(start, end),
      points = [start];
  while (start != lca) {
    start = start.parent;
    points.push(start);
  }
  var k = points.length;
  while (end != lca) {
    points.splice(k, 0, end);
    end = end.parent;
  }
  return points;
}

function d3_layout_bundleAncestors(node) {
  var ancestors = [],
      parent = node.parent;
  while (parent != null) {
    ancestors.push(node);
    node = parent;
    parent = parent.parent;
  }
  ancestors.push(node);
  return ancestors;
}

function d3_layout_bundleLeastCommonAncestor(a, b) {
  if (a == b) {
    return a;
  }
  var aNodes = d3_layout_bundleAncestors(a),
      bNodes = d3_layout_bundleAncestors(b),
      aNode = aNodes.pop(),
      bNode = bNodes.pop(),
      sharedNode = null;

  while (aNode == bNode) {
    sharedNode = aNode;
    aNode = aNodes.pop();
    bNode = bNodes.pop();
  }
  return sharedNode;
}

function d3_layout_bundleOutgoing(d, i) {
  return d.outgoing;
}
