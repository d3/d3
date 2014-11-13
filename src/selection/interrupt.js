// import "../transition/transition";
import "selection";

// TODO Interrupt transitions for all namespaces?
d3_selectionPrototype.interrupt = function(name) {
  var ns = d3_transitionNamespace(name);
  return this.each(function() {
    var lock = this[ns];
    if (lock) ++lock.active;
  });
};
