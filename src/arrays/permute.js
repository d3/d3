d3.permute = function(array, indexes) {
  var i = indexes.length,
      permutes = Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};
