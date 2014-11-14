// import "../transition/transition";
import "selection";

d3_selectionPrototype.transition = function(name) {
  var id = d3_transitionInheritId || ++d3_transitionId,
      ns = d3_transitionNamespace(name),
      subgroups = [],
      subgroup,
      node,
      transition = d3_transitionInherit || {time: Date.now(), ease: d3_ease_cubicInOut, delay: 0, duration: 250};

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) d3_transitionNode(node, i, ns, id, transition);
      subgroup.push(node);
    }
  }

  return d3_transition(subgroups, ns, id);
};
