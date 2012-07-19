d3_transitionPrototype.delay = function(value) {
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.delay = value.call(node = node.node, node.__data__, i, j) | 0; }
      : (value = value | 0, function(node) { node.delay = value; }));
};
