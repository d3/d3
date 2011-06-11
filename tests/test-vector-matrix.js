require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.vector");

var s = JSON.stringify;

console.log("determinant:");

console.log("  " + d3.vector.determinant([
  [12,  3,  3,  6],
  [ 2,  3,  6,  7],
  [21, 82,  0,  3],
  [ 2, 23,  1,  1]
]));

// From http://mathforum.org/library/drmath/view/51968.html
console.log("  " + d3.vector.determinant([
  [ 3,  2, -1,  4],
  [ 2,  1,  5,  7],
  [ 0,  5,  2, -6],
  [-1,  2,  1,  0]
]));
console.log("");

console.log("multiply:");
console.log("  " + s(d3.vector.multiply([
  [14,  9,  3],
  [ 2, 11, 15],
  [ 0, 12, 17],
  [ 5,  2,  3]
], [
  [12, 25],
  [ 9, 10],
  [ 8,  5]
])));
console.log("");

console.log("transpose:");
console.log("  " + s(d3.vector.transpose([
  [1, 2, 3]
])));
console.log("  " + s(d3.vector.transpose([
  [1, 2, 3],
  [4, 5, 6]
])));
console.log("  " + s(d3.vector.transpose([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])));
console.log("  " + s(d3.vector.transpose([
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8]
])));
console.log("");

console.log("inverse:");
console.log("  " + s(d3.vector.inverse([
  [1, 2],
  [3, 4]
])));
console.log("");
