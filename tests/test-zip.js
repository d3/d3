require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("zip [1, 2] [3, 4]:");
console.log("  " + d3.zip([1, 2], [3, 4]));
console.log("");

console.log("zip [1, 2] [3, 4] [5, 6, 7]:");
console.log("  " + d3.zip([1, 2], [3, 4], [5, 6, 7]));
console.log("");
