function d3_selection_map(map) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length, node; i < n; i++) {
      if (node = group[i]) node.__data__ = map.call(node, node.__data__, i);
    }
  }
  return this;
}
