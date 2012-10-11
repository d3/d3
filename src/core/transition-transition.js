d3_transitionPrototype.transition = function() {
  var id0 = this.id,
      id1 = ++d3_transitionNextId,
      subgroups = [],
      subgroup,
      group,
      node,
      transition0,
      transition1;

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      if (node = group[i]) {
        transition0 = node.__transition__[id0];
        transition1 = d3_transitionNode(node, i, id1);
        transition1.time = transition0.time; // TODO inherit automatically?
        transition1.ease = transition0.ease;
        transition1.delay = transition0.delay + transition0.duration;
        transition1.duration = transition0.duration;
      }
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, id1);
};
