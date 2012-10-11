d3_transitionPrototype.tween = function(name, tween) {
  var id = this.id;
  if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
  return d3_selection_each(this, tween == null
        ? function(node) { node.__transition__[id].tween.remove(name); }
        : function(node) { node.__transition__[id].tween.set(name, tween); });
};
