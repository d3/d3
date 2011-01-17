d3.min = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length == 1) {
    while (++i < n) if (a > (b = array[i])) a = b;
  } else {
    a = f(array[0]);
    while (++i < n) if (a > (b = f(array[i]))) a = b;
  }
  return a;
};
