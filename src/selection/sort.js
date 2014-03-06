import "../arrays/ascending";
import "selection";

d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
  return this.order();
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3_ascending;
  return function(a, b) {
    return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
  };
}
