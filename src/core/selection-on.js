// type can be namespaced, e.g., "click.foo"
// listener can be null for removal
d3_selectionPrototype.on = function(type, listener, capture) {
  if (arguments.length < 3) capture = false;

  // parse the type specifier
  var name = "__on" + type, i = type.indexOf(".");
  if (i > 0) type = type.substring(0, i);

  // if called with only one argument, return the current listener
  if (arguments.length < 2) return (i = this.node()[name]) && i._;

  // remove the old event listener, and add the new event listener
  return this.each(function() {
    var node = this,
        args = arguments,
        o = node[name];

    // remove the old listener, if any (using the previously-set capture)
    if (o) {
      node.removeEventListener(type, o, o.$);
      delete node[name];
    }

    // add the new listener, if any (remembering the capture flag)
    if (listener) {
      node.addEventListener(type, node[name] = l, l.$ = capture);
      l._ = listener; // stash the unwrapped listener for get
    }

    // wrapped event listener that propagates data changes
    function l(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      args[0] = node.__data__;
      try {
        listener.apply(node, args);
      } finally {
        d3.event = o;
      }
    }
  });
};
