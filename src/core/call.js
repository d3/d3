function d3_call(callback) {
  var f = callback;
  f.apply(this, (arguments[0] = this) && arguments);
  return this;
}
