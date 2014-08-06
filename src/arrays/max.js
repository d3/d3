d3.max = function(array, f, returnElem ) {
  var i = -1,
      ai = i,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while ((ai = ++i) < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) {
      a = b;
      ai = i;
    }
    a = returnElem ? array[ai] : a;
  }
  return a;
};
