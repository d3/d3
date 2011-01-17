d3.max = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length == 1) {
    while (++i < n) if (a < (b = array[i])) a = b;
  } else {
    a = f(a);
    while (++i < n) if (a < (b = f(array[i]))) a = b;
  }
  return a;
};
