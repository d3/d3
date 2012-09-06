d3_selectionPrototype.datum =
d3_selectionPrototype.map = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.property("__data__");
};
