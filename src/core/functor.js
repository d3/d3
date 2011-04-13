d3.functor = function(v) {
  return typeof v == "function" ? v : function() { return v; };
};
