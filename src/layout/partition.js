d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
      size = [1, 1]; // width, height

  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children) {
      var i = -1,
          n = children.length,
          c,
          d;
      dx /= node.value;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function depth(node) {
    var children = node.children,
        d = 0;
    if (children) {
      var i = -1,
          n = children.length;
      while (++i < n) d = Math.max(d, depth(children[i]));
    }
    return 1 + d;
  }

  function partition(d, i) {
    var nodes = hierarchy.call(this, d, i);
    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
    return nodes;
  }

  partition.sort = d3.rebind(partition, hierarchy.sort);
  partition.children = d3.rebind(partition, hierarchy.children);
  partition.value = d3.rebind(partition, hierarchy.value);

  partition.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return partition;
  };

  return partition;
};
