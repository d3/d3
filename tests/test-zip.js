require("./../lib/env-js/envjs/node");
require("./../d3");

var s = JSON.stringify;

console.log("zip [1, 2] [3, 4]:");
console.log("  " + s(d3.zip([1, 2], [3, 4])));
console.log("");

console.log("zip [1, 2] [3, 4] [5, 6, 7]:");
console.log("  " + s(d3.zip([1, 2], [3, 4], [5, 6, 7])));
console.log("");

console.log("zip [1, 2, 3, 4, 5] [2, 4, 6, 8, 10]:");
console.log("  " + s(d3.zip([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])));
console.log("");

console.log("zip [1, 2, 3, 4, 5]:");
console.log("  " + s(d3.zip([1, 2, 3, 4, 5])));
console.log("");

console.log("zip (no arguments):");
console.log("  " + s(d3.zip()));
console.log("");
