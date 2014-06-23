import "transition";
import "tween";

d3_transitionPrototype.text = function(value) {
  if (arguments.length) return d3_transition_tween(this, "text", value, d3_transition_text);

  var node = this.node(),
      tween = node.__transition__[this.id].tween.get("text");
  return tween ? tween.$ : node.textContent;
};

function d3_transition_text(b) {
  if (b == null) b = "";
  f.$ = b;
  return f;
  function f() { this.textContent = b; }
}
