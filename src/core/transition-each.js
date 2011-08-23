function d3_transition_each(callback) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) callback.call(node = node.node, node.__data__, i, j);
    }
  }
  return this;
}
