d3.max = function(array, f) {
  var i = -1,
      n = array.length,
      a = -Infinity,
      b;
  if (arguments.length === 1) {
    while (++i < n) if (a < (b = array[i])) a = b;
  } else {
    while (++i < n) if (a < (b = f.call(array, array[i], i))) a = b;
  }
  return a;
};
