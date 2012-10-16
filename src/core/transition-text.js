d3_transitionPrototype.text = function(value) {
  return d3_transition_tween(this, "text", d3_transition_text, value);
};

function d3_transition_text(b) {
  if (b == null) b = "";
  return function() { this.textContent = b; };
}
