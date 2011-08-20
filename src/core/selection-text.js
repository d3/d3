function d3_selection_text(value) {
  return arguments.length < 1 ? this.node().textContent
      : (this.each(typeof value === "function"
      ? function() { this.textContent = value.apply(this, arguments); }
      : function() { this.textContent = value; }));
}
