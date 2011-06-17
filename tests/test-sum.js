require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("sum:");
console.log("                                 [] -> " + d3.sum([]));
console.log("                                [1] -> " + d3.sum([1]));
console.log("                    [5, 1, 2, 3, 4] -> " + d3.sum([5, 1, 2, 3, 4]));
console.log("                    [\"a\", \"b\", \"c\"] -> " + d3.sum(["c", "a", "b"]));
console.log("                        [\"20\", \"3\"] -> " + d3.sum(["20", "3"]));
console.log("                        [\"3\", \"20\"] -> " + d3.sum(["3", "20"]));
console.log("                            [20, 3] -> " + d3.sum([20, 3]));
console.log("                            [3, 20] -> " + d3.sum([3, 20]));
console.log("");

console.log("sum ignores null, undefined, and NaN:");
console.log("               [NaN, 1, 2, 3, 4, 5] -> " + d3.sum([NaN, 1, 2, 3, 4, 5]));
console.log("               [1, 2, 3, 4, 5, NaN] -> " + d3.sum([1, 2, 3, 4, 5, NaN]));
console.log("   [10, null, 3, undefined, 5, NaN] -> " + d3.sum([10, null, 3, undefined, 5, NaN]));
console.log("");

console.log("sum treats heterogenous types as numbers:");
console.log("                          [20, \"3\"] -> " + d3.sum([20, "3"]));
console.log("                          [\"20\", 3] -> " + d3.sum(["20", 3]));
console.log("                          [3, \"20\"] -> " + d3.sum([3, "20"]));
console.log("                          [\"3\", 20] -> " + d3.sum(["3", 20]));
console.log("");

console.log("sum applies accessor function:");
console.log("  [1, 2, 3, 4, 5], [2, 4, 6, 8, 10] -> " + d3.sum([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.sum(d); }));
console.log("                    [1, 2, 3, 4, 5] -> " + d3.sum([1, 2, 3, 4, 5], function(d, i) { return i; }));
console.log("");
