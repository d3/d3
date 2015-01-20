// import "../transition/transition";
import "selection";

// TODO Interrupt transitions for all namespaces?
d3_selectionPrototype.interrupt = function(name) {
  return this.each(name == null
      ? d3_selection_interrupt
      : d3_selection_interruptNS(d3_transitionNamespace(name)));
};

var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());

function d3_selection_interruptNS(ns) {
  return function() {
    var lock, active;
    if ((lock = this[ns]) && (active = lock[lock.active])) {
      if (--lock.count) delete lock[lock.active];
      else delete this[ns];
      lock.active += .5;
      active.event && active.event.interrupt.call(this, this.__data__, active.index);
    }
  };
}
