import "transition";

d3_transitionPrototype.remove = function() {
  var ns = this.namespace;
  return this.each("end.transition", function() {
    var lock = this[ns];
    var p;
    if (lock.count > 1) {
        for (var n in lock) {
            if (n.match(/^\d+$/) && parseInt(n) > lock.active) return;
        }
    }
    if (p = this.parentNode) p.removeChild(this);
  });
};
