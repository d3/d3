function d3_selection_map(map) {
  return this.each(function() {
    this.__data__ = map.apply(this, arguments);
  });
}
