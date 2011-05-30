require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("max:");
console.log("  " + d3.max([1, 2, 3, 4, 5]));
console.log("");

console.log("max with accessor function:");
console.log("  " + d3.max([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) {
  return d3.max(d);
}));
console.log("");

console.log("max index:");
console.log("  " + d3.max([1, 2, 3, 4, 5], function(d, i) {
  return i;
}));
console.log("");
