import "selection";

d3_selectionPrototype.ancestor = function(selector) {
  if (!selector) return this.parent();
  var matches = (typeof selector === "function")
    ? selector
    : function() { return d3_selectMatches(this, selector); };
  return this.select(function(d, i) {
    var node = this.parentNode;
    while (node) {
      // XXX should we use d here instead of node.__data__?
      if (matches.call(node, node.__data__, i)) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  });
};
