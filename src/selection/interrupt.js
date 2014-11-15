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

function d3_selection_interrupt() {
  var lock = this.__transition__;
  if (lock) ++lock.active;
}
