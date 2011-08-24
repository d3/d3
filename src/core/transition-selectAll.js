d3_transitionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = selector.call(node.node, node.node.__data__, i));
        for (var k = -1, o = subgroup.length; ++k < o;) {
          subgroup[k] = {node: subgroup[k], delay: node.delay, duration: node.duration};
        }
      }
    }
  }

  return d3_transition(subgroups, this.id).ease(this.ease());
};
