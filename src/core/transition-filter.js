d3_transitionPrototype.filter = function(filter) {
  return d3_transition(d3_selectionFilterSubgroups.call(this, filter),
      d3_transitionId || ++d3_transitionNextId, Date.now());
};
