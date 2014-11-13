import "../selection/each";
import "transition";

d3_transitionPrototype.tween = function(name, tween) {
  var id = this.id, ns = this.namespace;
  if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
  return d3_selection_each(this, tween == null
        ? function(node) { node[ns][id].tween.remove(name); }
        : function(node) { node[ns][id].tween.set(name, tween); });
};

function d3_transition_tween(groups, name, value, tween) {
  var id = groups.id, ns = groups.namespace;
  return d3_selection_each(groups, typeof value === "function"
      ? function(node, i, j) { node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j))); }
      : (value = tween(value), function(node) { node[ns][id].tween.set(name, value); }));
}
