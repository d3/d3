d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j].sort(comparator), i = 1, n = group.length, prev = group[0]; i < n; i++) {
      var node = group[i];
      if (node) {
        if (prev) prev.parentNode.insertBefore(node, prev.nextSibling);
        prev = node;
      }
    }
  }
  return this;
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}
