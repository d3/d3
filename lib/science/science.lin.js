(function(){science.lin = {};
/**
 * Solves tridiagonal systems of linear equations.
 *
 * Source: http://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm
 *
 * @param {number[]} a
 * @param {number[]} b
 * @param {number[]} c
 * @param {number[]} d
 * @param {number[]} x
 * @param {number} n
 */
science.lin.tridag = function(a, b, c, d, x, n) {
  var i,
      m;
  for (i = 1; i < n; i++) {
    m = a[i] / b[i - 1];
    b[i] -= m * c[i - 1];
    d[i] -= m * d[i - 1];
  }
  x[n - 1] = d[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; i--) {
    x[i] = (d[i] - c[i] * x[i + 1]) / b[i];
  }
};
})()