// A getter-setter method that preserves the appropriate `this` context.
function d3_rebind(object, method) {
  return function() {
    var x = method.apply(object, arguments);
    return arguments.length ? object : x;
  };
}
