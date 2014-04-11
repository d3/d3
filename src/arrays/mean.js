import "../math/number";

d3.mean = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1,
      j = n;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) s += a; else --j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) s += a; else --j;
  }
  return j ? s / j : undefined;
};
