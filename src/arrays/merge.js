d3.merge = function(arrays) {
  var n = arrays.length,
      m = 0,
      i,
      j,
      k = -1,
      merged,
      array;

  for (i = 0; i < n; ++i) m += arrays[i].length;
  merged = new Array(m);

  for (i = 0; i < n; ++i) {
    for (array = arrays[i], m = array.length, j = 0; j < m; ++j) {
      merged[++k] = array[j];
    }
  }

  return merged;
};
