d3_selectionPrototype.on = function(type, listener, capture) {
  var n = arguments.length;
  if (n < 3) {

    // For on(object) or on(object, boolean), the object specifies the event
    // types and listeners to add or remove. The optional boolean specifies
    // whether the listener captures events.
    if (typeof type !== "string") {
      if (n < 2) listener = false;
      for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
      return this;
    }

    // For on(string), return the listener for the first node.
    if (n < 2) return (n = this.node()["__on" + type]) && n._;

    // For on(string, function), use the default capture.
    capture = false;
  }

  // Otherwise, a type, listener and capture are specified, and handled as below.
  return this.each(d3_selection_on(type, listener, capture));
};

function d3_selection_on(type, listener, capture) {
  var name = "__on" + type, i = type.indexOf(".");
  if (i > 0) type = type.substring(0, i);

  function onRemove() {
    var wrapper = this[name];
    if (wrapper) {
      this.removeEventListener(type, wrapper, wrapper.$);
      delete this[name];
    }
  }

  function onAdd() {
    var node = this,
        args = d3_array(arguments);

    onRemove.call(this);
    this.addEventListener(type, this[name] = wrapper, wrapper.$ = capture);
    wrapper._ = listener;

    function wrapper(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      args[0] = node.__data__;
      try {
        listener.apply(node, args);
      } finally {
        d3.event = o;
      }
    }
  }

  return listener ? onAdd : onRemove;
}
