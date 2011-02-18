function d3_call(callback, var_args) {
  var_args = d3_arrayArguments(arguments);
  var_args[0] = this;
  callback.apply(this, var_args);
  return this;
}
