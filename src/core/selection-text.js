d3_selectionPrototype.text = function(value) {
  return arguments.length < 1 ? this.node().textContent
      : (this.each(typeof value === "function"
      ? function() { this.textContent = value.apply(this, arguments); }
      : function() { this.textContent = value; }));
};
