d3.index = function(array, f) {
  var i = -1, 
      n = array.length,
      index = {};
  while (++i < n) index[f.call(array, array[i], i)] = array[i];
  return index;
};
