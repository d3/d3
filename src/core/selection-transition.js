d3_selectionPrototype.transition = function() {
  var id = d3_transitionId || ++d3_transitionNextId,
      subgroups = [],
      subgroup,
      node,
      transition;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) d3_transitionNode(node, id, d3_transitionDelay, d3_transitionDuration);
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, id, Date.now());
};
