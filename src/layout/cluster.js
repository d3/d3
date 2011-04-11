// Implements a hierarchical layout using the cluster (or dendogram) algorithm.
d3.layout.cluster = function() {
  var hierarchy = d3.layout.hierarchy(),
      group = 0;

  function cluster(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        leafCount = 0,
        leafIndex = .5 - group / 2;

    /* Count the leaf nodes and compute the depth of descendants. */
    var p = undefined;
    d3_layout_clusterVisitAfter(root, function(n) {
      if (n.children) {
        n.depth = 1 + d3.max(n.children, function(n) { return n.depth; });
      } else {
        if (group && (p != n.parent)) {
          p = n.parent;
          leafCount += group;
        }
        leafCount++;
        n.depth = 0;
      }
    });
    var breadth = 1 / leafCount;
    var depth = 1 / root.depth;

    /* Compute the unit breadth and depth of each node. */
    var p = undefined;
    d3_layout_clusterVisitAfter(root, function(n) {
      if (n.children) {
        n.breadth = d3_layout_clusterMean(n.children, function(n) { return n.breadth; });
      } else {
        if (group && (p != n.parent)) {
          p = n.parent;
          leafIndex += group;
        }
        n.breadth = breadth * leafIndex++;
      }
      n.depth = 1 - n.depth * depth;
    });

    /* Compute breadth and depth ranges for space-filling layouts. */
    d3_layout_clusterVisitAfter(root, function(n) {
      n.minBreadth = n.children
          ? n.children[0].minBreadth
          : (n.breadth - breadth / 2);
      n.maxBreadth = n.children
          ? n.children[n.children.length - 1].maxBreadth
          : (n.breadth + breadth / 2);
    });
    d3_layout_clusterVisitBefore(root, function(n) {
      n.minDepth = n.parent
          ? n.parent.maxDepth
          : 0;
      n.maxDepth = n.parent
          ? (n.depth + root.depth)
          : (n.minDepth + 2 * root.depth);
    });
    root.minDepth = -depth;

    return nodes;
  }

  cluster.sort = d3.rebind(cluster, hierarchy.sort);
  cluster.children = d3.rebind(cluster, hierarchy.children);
  cluster.value = d3.rebind(cluster, hierarchy.value);

  cluster.group = function(x) {
    if (!arguments.length) return group;
    group = x;
    return cluster;
  };

  return cluster;
};

d3_layout_clusterVisitAfter = d3_layout_treeVisitAfter;

function d3_layout_clusterVisitBefore(node, callback) {
  function visit(node, previousSibling) {
    callback(node, previousSibling);
    var children = node.children;
    if (children) {
      var child,
          previousChild = null,
          i = -1,
          n = children.length;
      while (++i < n) {
        child = children[i];
        visit(child, previousChild);
        previousChild = child;
      }
    }
  }
  visit(node, null);
}

function d3_layout_clusterSum(array, f) {
  var o = {};
  return array.reduce(f
      ? function(p, d, i) { o.index = i; return p + f.call(o, d); }
      : function(p, d) { return p + d; }, 0);
}

function d3_layout_clusterMean(array, f) {
  return d3_layout_clusterSum(array, f) / array.length;
}
