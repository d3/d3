import "zip";

d3.transpose = function(matrix) {
  return d3.zip.apply(d3, matrix);
};
