// type can be namespaced, e.g., "click.foo"
// listener can be null for removal
d3_selectionPrototype.on = function(type, listener, capture) {
  if (arguments.length < 3) capture = false;

  // parse the type specifier
  var i = type.indexOf("."),
      typo = i === -1 ? type : type.substring(0, i),
      name = "__on" + type;

  // remove the old event listener, and add the new event listener
  return this.each(function(d, i) {
    if (this[name]) this.removeEventListener(typo, this[name], capture);
    if (listener) this.addEventListener(typo, this[name] = l, capture);

    // wrapped event listener that preserves i
    var node = this;
    function l(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      try {
        listener.call(this, node.__data__, i);
      } finally {
        d3.event = o;
      }
    }
  });
};
