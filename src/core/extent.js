d3.extent = function() {
  return [d3.min.apply(d3, arguments), d3.max.apply(d3, arguments)];
};
