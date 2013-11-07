import "../selection/select";
import "transition";

d3_transitionPrototype.selectAll = function(selector) {
  var id = this.id,
      m = this.length,
      subgroups = [],
      subgroup,
      subnodes,
      subnode,
      group,
      node,
      transition,
      j,
      i,
      n,
      o;

  selector = d3_selection_selectorAll(selector);

  for (j = -1; ++j < m;) {
    for (group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        transition = node.__transition__[id];
        subnodes = selector.call(node, node.__data__, i, j);
        subgroups[subgroups.length] = subgroup = new Array(o = subnodes.length);
        while(o--) {
          if (subnode = subnodes[o]) d3_transitionNode(subnode, o, id, transition);
          subgroup[o] = subnode;
        }
      }
    }
  }

  return d3_transition(subgroups, id);
};
