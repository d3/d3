function d3_call(callback) {
  var f = callback;
  arguments[0] = this;
  f.apply(this, arguments);
  return this;
}
