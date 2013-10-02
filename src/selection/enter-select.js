import "selection";
import "enter";

d3_selection_enterPrototype.select = function(selector) {
  var m = this.length,
      subgroups = new Array(m),
      subgroup,
      subnode,
      upgroup,
      group,
      node,
      j,
      i;

  for (j = -1; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups[i] = subgroup = new Array(n = group.length);
    subgroup.parentNode = group.parentNode;
    for (i = -1; ++i < n;) {
      if (node = group[i]) {
        subgroup[i] = upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j);
        subnode.__data__ = node.__data__;
      } else {
        subgroup[i] = null;
      }
    }
  }

  return d3_selection(subgroups);
};
