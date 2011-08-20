function d3_transition_remove() {
  return this.each("end", function() {
    var t = this.__transition__, p;
    if ((t.owner === t.active) && (p = this.parentNode)) p.removeChild(this);
  });
}
