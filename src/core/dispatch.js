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

  return arguments.length < 2
      ? this[type].on(name)
      : (this[type].on(name, listener), this);
};

function d3_dispatch_event() {
  var listeners = [],
      listenerByName = {};

  function dispatch() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
  }

  dispatch.on = function(name, listener) {
    var l, i;

    // return the current listener, if any
    if (arguments.length < 2) return (l = listenerByName[name]) && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l = listenerByName[name]) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      delete listenerByName[name];
    }

    // add the new listener, if any
    if (listener) {
      listeners.push(listenerByName[name] = {on: listener});
    }

    return dispatch;
  };

  return dispatch;
};
