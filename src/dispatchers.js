/** @param {...string} types */
function d3_dispatchers(types) {
  var dispatchers = {},
      type;
  for (var i = 0, n = arguments.length; i < n; i++) {
    type = arguments[i];
    dispatchers[type] = d3_dispatcher(type);
  }
  return dispatchers;
}
