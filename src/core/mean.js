d3.mean = function(array, f) {
  var n = array.length,
      a,
      m = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = array[i]) && a != null) m += (a - m) / ++j;
  } else {
    while (++i < n) if (!isNaN(a = f.call(array, array[i], i)) && a != null) m += (a - m) / ++j;
  }
  return j ? m : undefined;
};
