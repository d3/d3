d3_selectionPrototype.transition = function() {
  var subgroups = [],
      subgroup,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      subgroup.push((node = group[i]) ? {node: node, delay: 0, duration: 250} : null);
    }
  }

  return d3_transition(subgroups, d3_transitionInheritId || ++d3_transitionId, Date.now());
};
