function min(array, f) {
  var i = 1,
      n = array.length,
      j = 0,
      v = f(array[0]),
      k;
  for (; i < n; ++i) {
    k = f(array[i]);
    if (k < v) {
      j = i;
      v = k;
    }
  }
  return v;
}
