d3_selectionPrototype.html = function(value) {
  return arguments.length < 1 ? this.node().innerHTML
      : (this.each(typeof value === "function"
      ? function() { this.innerHTML = value.apply(this, arguments); }
      : function() { this.innerHTML = value; }));
};
