d3.extent = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  return [d3.min(array), d3.max(array)];
};
