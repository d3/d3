import "../selection/select";
import "transition";

d3_transitionPrototype.select = function(selector) {
  var id = this.id,
      m = this.length,
      subgroups = new Array(m),
      subgroup,
      subnode,
      group,
      node,
      j,
      i;

  selector = d3_selection_selector(selector);

  for (var j = -1; ++j < m;) {
    subgroups[j] = subgroup = new Array(n = (group = this[j]).length);
    for (i = -1; ++i < n;) {
      if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        d3_transitionNode(subnode, i, id, node.__transition__[id]);
        subgroup[i] = subnode;
      } else {
        subgroup[i] = null;
      }
    }
  }

  return d3_transition(subgroups, id);
};
