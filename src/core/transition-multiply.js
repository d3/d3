d3_transitionPrototype.multiply = function(f) {
  var transition = this;
  return this.each(function(d, i, j) {
    f.call(this, d3.select(this), function(selection) {
      var id = d3_transitionInheritId;
      try {
        d3_transitionInheritId = transition.id;
        return selection.transition()
            .delay(transition[j][i].delay)
            .duration(transition[j][i].duration)
            .ease(transition.ease());
      } finally {
        d3_transitionInheritId = id;
      }
    });
  });
};
