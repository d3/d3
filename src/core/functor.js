function d3_functor(v) {
  return typeof v == "function" ? v : function() { return v; };
}
