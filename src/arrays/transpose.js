import "min";

d3.transpose = function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
};

function d3_transposeLength(d) {
  return d.length;
}
