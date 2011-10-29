d3.dispatch = function() {
  var dispatch = new d3_dispatch(),
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event();
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  this[type].on(name, listener);
};

function d3_dispatch_event() {
  var listeners = [],
      listenerByName = {};

  function dispatch() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if ((l = z[i])._on) l.apply(this, arguments);
  }

  dispatch.on = function(name, listener) {
    var l, i;

    // remove the old listener, if any
    if (l = listenerByName[name]) {
      l._on = false;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      delete listenerByName[name];
    }

    // add the new listener, if any
    if (listener) {
      listener._on = true;
      listeners.push(listener);
      listenerByName[name] = listener;
    }

    return dispatch;
  };

  return dispatch;
};
