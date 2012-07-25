d3_transitionPrototype.filter = function(filter) {
  return d3_transition(d3_selectionFilterSubgroups.call(this, filter),
      this.id, this.time).ease(this.ease());
};
