d3.extent = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;
  if (arguments.length === 1) {
    while (++i < n) if ((b = array[i]) != null && b >= b) { a = c = b; break; }
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  } else {
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) { a = c = b; break; }
    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  }
  return [a, c];
};
