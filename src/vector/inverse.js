// Find matrix inverse using Gauss-Jordan.
d3.vector.inverse = function(m) {
  var n = m.length
      i = -1;

  // Check if the matrix is square.
  if (n !== m[0].length) return;

  // Augment with identity matrix I to get AI.
  m = m.map(function(row, i) {
    var identity = new Array(n),
        j = -1;
    while (++j < n) identity[j] = i === j ? 1 : 0;
    return row.concat(identity);
  });

  // Compute IA^-1.
  d3.vector.gaussjordan(m);

  // Remove identity matrix I to get A^-1.
  while (++i < n) {
    m[i] = m[i].slice(n);
  }

  return m;
};
