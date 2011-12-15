d3_selectionPrototype.text = function(value) {
  return arguments.length < 1 ? this.node().textContent
      : (this.each(typeof value === "function"
      ? function() {
        var v = value.apply(this, arguments);
        this.textContent = v != null ? v : null;
      } : typeof value === "undefined"
      ? function() { this.textContent = null; }
      : function() { this.textContent = value; }));
};
