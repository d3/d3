import "../math/number";

d3.variance = function(array, f) {
  var n = array.length,
      m = 0,
      a,
      d,
      s = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) {
      if (d3_numeric(a = d3_number(array[i]))) {
        d = a - m;
        m += d / ++j;
        s += d * (a - m);
      }
    }
  } else {
    while (++i < n) {
      if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
        d = a - m;
        m += d / ++j;
        s += d * (a - m);
      }
    }
  }
  if (j > 1) return s / (j - 1);
};
