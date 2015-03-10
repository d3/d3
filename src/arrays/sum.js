import "../math/number";

d3.sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;
  if (arguments.length === 1) {
    while (++i < n) if (d3_numeric(a = +array[i])) s += a; // zero and null are equivalent
  } else {
    while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
  }
  return s;
};
