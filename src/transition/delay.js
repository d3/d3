import "../selection/each";
import "transition";

d3_transitionPrototype.delay = function(value) {
  var id = this.id;
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.__transition__[id].delay = +value.call(node, node.__data__, i, j); }
      : (value = +value, function(node) { node.__transition__[id].delay = value; }));
};
