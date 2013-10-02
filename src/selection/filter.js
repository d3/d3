import "selection";

d3_selectionPrototype.filter = function(filter) {
  var m = this.length,
      subgroups = new Array(m),
      subgroup,
      group,
      node
      j,
      i,
      n;

  if (typeof filter !== "function") filter = d3_selection_filter(filter);

  for ( j = 0; j < m; j++) {
    subgroups[j] = subgroup = [];
    subgroup.parentNode = (group = this[j]).parentNode;
    for (i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node, node.__data__, i)) {
        subgroup[subgroup.length] = node;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_filter(selector) {
  return function() {
    return d3_selectMatches(this, selector);
  };
}
