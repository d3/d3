d3_selectionPrototype.multiply = function(f) {
  return this.each(function() {
    f.call(this, d3.select(this), d3_identity);
  });
};
