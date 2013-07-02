import "selection";
import "enter";

d3_selection_enterPrototype.insert = function(name, before) {
  if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
  return d3_selectionPrototype.insert.call(this, name, before);
};

function d3_selection_enterInsertBefore(enter) {
  return function(d, i, j) {
    var group = enter[j].update,
        n = group.length,
        node;
    while (++i < n && !(node = group[i]));
    return node;
  };
}
