require("./../lib/env-js/envjs/node");
require("./../d3");

function max(array) {
  var max = d3.max(array);
  return typeof max === "string" ? "\"" + max + "\"" : max;
}

console.log("max:");
console.log("                                [1] -> " + max([1]));
console.log("                    [5, 1, 2, 3, 4] -> " + max([5, 1, 2, 3, 4]));
console.log("                    [\"a\", \"b\", \"c\"] -> " + max(["c", "a", "b"]));
console.log("                        [\"20\", \"3\"] -> " + max(["20", "3"]));
console.log("                        [\"3\", \"20\"] -> " + max(["3", "20"]));
console.log("                            [20, 3] -> " + max([20, 3]));
console.log("                            [3, 20] -> " + max([3, 20]));
console.log("");

console.log("max of empty array is undefined:");
console.log("                                 [] -> " + max([]));
console.log("                             [null] -> " + max([null]));
console.log("                        [undefined] -> " + max([undefined]));
console.log("                              [NaN] -> " + max([NaN]));
console.log("                         [NaN, NaN] -> " + max([NaN, NaN]));
console.log("");

console.log("max ignores null, undefined, and NaN:");
console.log("               [NaN, 1, 2, 3, 4, 5] -> " + max([NaN, 1, 2, 3, 4, 5]));
console.log("               [1, 2, 3, 4, 5, NaN] -> " + max([1, 2, 3, 4, 5, NaN]));
console.log("   [10, null, 3, undefined, 5, NaN] -> " + max([10, null, 3, undefined, 5, NaN]));
console.log("");

console.log("max compares heterogenous types as numbers:");
console.log("                          [20, \"3\"] -> " + max([20, "3"]));
console.log("                          [\"20\", 3] -> " + max(["20", 3]));
console.log("                          [3, \"20\"] -> " + max([3, "20"]));
console.log("                          [\"3\", 20] -> " + max(["3", 20]));
console.log("");

console.log("max applies accessor function:");
console.log("  [1, 2, 3, 4, 5], [2, 4, 6, 8, 10] -> " + d3.max([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.min(d); }));
console.log("                    [1, 2, 3, 4, 5] -> " + d3.max([1, 2, 3, 4, 5], function(d, i) { return i; }));
console.log("");
