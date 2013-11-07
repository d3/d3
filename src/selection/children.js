import "selection";

d3_selectionPrototype.children = function(selector) {
  var children = this.selectAll(function() {
    return [].filter.call(this.childNodes, function(node) {
      return node.nodeType === 1;
    });
  });
  return selector
    ? children.filter(selector)
    : children;
};
