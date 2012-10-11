d3_selectionPrototype.transition = function() {
  var id = d3_transitionId || ++d3_transitionNextId,
      time = Date.now(),
      subgroups = [],
      subgroup,
      node,
      transition;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i]) && (transition = d3_transitionNode(node, i, id))) {
        transition.time = time; // TODO inherit automatically?
        transition.ease = d3_transitionEase;
        transition.delay = d3_transitionDelay;
        transition.duration = d3_transitionDuration;
      }
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, id);
};
