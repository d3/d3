d3.merge = function(arrays) {
  var n = arrays.length;
  return n ? n > 1
      ? Array.prototype.concat.apply([], arrays)
      : arrays[0]
      : [];
};
