import "transition";

d3_transitionPrototype.transition = function() {
  var id0 = this.id,
      id1 = ++d3_transitionId,
      m = this.length,
      subgroups = new Array(m),
      subgroup,
      group,
      node,
      transition,
      j,
      i,
      n;

  for (j = 0; j < m; j++) {
    subgroups[j] = subgroup = new Array(n = (group = this[j]).length);
    for (i = 0; i < n; i++) {
      if (node = group[i]) {
        transition = Object.create(node.__transition__[id0]);
        transition.delay += transition.duration;
        d3_transitionNode(node, i, id1, transition);
      }
      subgroup[i] = node;
    }
  }

  return d3_transition(subgroups, id1);
};
