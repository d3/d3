d3_selectionPrototype.map = function(map) {
  return this.each(function() {
    this.__data__ = map.apply(this, arguments);
  });
};
