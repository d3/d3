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
    var lock,
        activeId,
        active;
    if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
      active.timer.c = null;
      active.timer.t = NaN;
      if (--lock.count) delete lock[activeId];
      else delete this[ns];
      lock.active += 0.5;
      active.event && active.event.interrupt.call(this, this.__data__, active.index);
    }
  };
}
