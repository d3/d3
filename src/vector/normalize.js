d3.vector.normalize = function(p) {
  var length = d3.vector.length(p);
  return p.map(function(d) { return d / length; });
};
