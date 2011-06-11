require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.vector");

console.log("length:");
console.log("  " + d3.vector.length([]));
console.log("  " + d3.vector.length([undefined, null]));
console.log("  " + d3.vector.length([1.5, 1.5, 1.5, 1.5]));
console.log("  " + d3.vector.length([3, 4]));
console.log("  " + d3.vector.length([2, 3, 6]));
console.log("  " + d3.vector.length([2, 3, 6, 9.1]));
console.log("");

console.log("normalize:");
console.log("  " + d3.vector.normalize([]));
console.log("  " + d3.vector.normalize([undefined, null]));
console.log("  " + d3.vector.normalize([1.5, 1.5, 1.5, 1.5]));
console.log("  " + d3.vector.normalize([3, 4]));
console.log("  " + d3.vector.normalize([2, 3, 6]));
console.log("  " + d3.vector.normalize([2, 3, 6, 9.1]));
console.log("");

console.log("dot:");
console.log("  " + d3.vector.dot([], [1]));
console.log("  " + d3.vector.dot([3], [4]));
console.log("  " + d3.vector.dot([1, 4, 2], [9, 1.2, 0]));
console.log("");

console.log("cross:");
console.log("  " + d3.vector.cross([1, 4, 2], [9, 1.2, 0]));
console.log("  " + d3.vector.cross([1, 4, 2, 2], [9, 1.2, 0]));
console.log("");
