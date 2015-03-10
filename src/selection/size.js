import "each";

d3_selectionPrototype.size = function() {
  var n = 0;
  d3_selection_each(this, function() { ++n; });
  return n;
};
