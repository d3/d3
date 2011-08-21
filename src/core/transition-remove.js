function d3_transition_remove() {
  return this.each("end", function() {
    var p;
    if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
  });
}
