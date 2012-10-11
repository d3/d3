d3_transitionPrototype.transition = function() {
  var id0 = this.id,
      id1 = ++d3_transitionNextId,
      subgroups = [],
      subgroup,
      group,
      node,
      transition;

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      if (node = group[i]) {
        transition = node.__transition__[id0];
        d3_transitionNode(node, id1, transition.delay + transition.duration, transition.duration);
      }
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, id1, this.time).ease(this.ease());
};
