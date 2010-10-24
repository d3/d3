/** @param {...string} types */
d3.dispatch = function(types) {
  var dispatch = {},
      type;
  for (var i = 0, n = arguments.length; i < n; i++) {
    type = arguments[i];
    dispatch[type] = d3_dispatch(type);
  }
  return dispatch;
};

function d3_dispatch(type) {
  var dispatch = {},
      listeners = [];

  dispatch.add = function(listener) {
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i].listener == listener) return dispatch; // already registered
    }
    listeners.push({listener: listener, on: true});
    return dispatch;
  };

  dispatch.remove = function(listener) {
    for (var i = 0; i < listeners.length; i++) {
      var l = listeners[i];
      if (l.listener == listener) {
        l.on = false;
        listeners = listeners.slice(0, i).concat(listeners.slice(i + 1));
        break;
      }
    }
    return dispatch;
  };

  dispatch.dispatch = function() {
    var ls = listeners; // defensive reference
    for (var i = 0, n = ls.length; i < n; i++) {
      var l = ls[i];
      if (l.on) l.listener.apply(this, arguments);
    }
  };

  return dispatch;
};
