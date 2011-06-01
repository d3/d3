d3.vector.multiply = function(a, b) {
  var m = a.length,
      n = b[0].length,
      p = b.length,
      i = -1,
      j,
      k;
  if (p !== a[0].length) throw {"error": "columns(a) != rows(b); " + a[0].length + " != " + p};
  var ab = new Array(m);
  while (++i < m) {
    ab[i] = new Array(n);
    j = -1; while(++j < n) {
      var s = 0;
      k = -1; while (++k < p) s += a[i][k] * b[k][j];
      ab[i][j] = s;
    }
  }
  return ab;
};
