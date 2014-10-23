import "transition";

d3_transitionPrototype.transition = function() {
  var id0 = this.id,
      id1 = ++d3_transitionId,
      ns = this.namespace,
      subgroups = [],
      subgroup,
      group,
      node,
      transition;

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      if (node = group[i]) {
        transition = Object.create(node[ns][id0]);
        transition.delay += transition.duration;
        d3_transitionNode(node, i, ns, id1, transition);
      }
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, ns, id1);
};
