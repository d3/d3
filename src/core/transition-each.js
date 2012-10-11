d3_transitionPrototype.each = function(type, listener) {
  if (arguments.length < 2) {
    var id = d3_transitionId,
        ease = d3_transitionEase,
        delay = d3_transitionDelay,
        duration = d3_transitionDuration;

    d3_transitionId = this.id;
    d3_selection_each(this, function(node, i, j) {
      var transition = node.__transition__[d3_transitionId];
      d3_transitionEase = transition.ease;
      d3_transitionDelay = transition.delay;
      d3_transitionDuration = transition.duration;
      type.call(node, node.__data__, i, j);
    });

    d3_transitionId = id;
    d3_transitionEase = ease;
    d3_transitionDelay = delay;
    d3_transitionDuration = duration;
  } else {
    var id = this.id;
    d3_selection_each(this, function(node) {
      node.__transition__[id].event.on(type, listener);
    });
  }
  return this;
};
