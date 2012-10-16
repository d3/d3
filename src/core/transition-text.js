d3_transitionPrototype.text = function(value) {
  var id = this.id;
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.__transition__[id].tween.set("text", d3_transition_text(value.call(node, node.__data__, i, j))); }
      : (value = d3_transition_text(value), function(node) { node.__transition__[id].tween.set("text", value); }));
};

function d3_transition_text(value) {
  if (value == null) value = "";
  return function() { this.textContent = value; };
}
