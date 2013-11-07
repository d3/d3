import "selection";

d3_selectionPrototype.select = function(selector) {
  var m = this.length,
      subgroups = new Array(m),
      subgroup,
      subnode,
      group,
      node,
      j,
      i,
      n;

  selector = d3_selection_selector(selector);

  for (j = -1, ; ++j < m;) {
    subgroups[i] = subgroup = new Array(n = group.length);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (i = -1; ++i < n;) {
      if (node = group[i]) {
        subgroup[i] = subnode = selector.call(node, node.__data__, i, j);
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup[i] = null;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selector(selector) {
  return typeof selector === "function" ? selector : function() {
    return d3_select(selector, this);
  };
}
