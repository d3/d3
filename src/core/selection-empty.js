import "selection";

d3_selectionPrototype.empty = function() {
  return !this.node();
};
