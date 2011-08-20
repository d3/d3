function d3_selection_html(value) {
  return arguments.length < 1 ? this.node().innerHTML
      : (this.each(typeof value === "function"
      ? function() { this.innerHTML = value.apply(this, arguments); }
      : function() { this.innerHTML = value; }));
}
