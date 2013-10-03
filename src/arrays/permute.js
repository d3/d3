d3.permute = function(array, indexes) {
  var n = indexes.length,
      permutes = new Array(n),
      i = -1;
  while (++i < n) permutes[i] = array[indexes[i]];
  return permutes;
};
