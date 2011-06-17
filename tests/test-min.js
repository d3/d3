require("./../lib/env-js/envjs/node");
require("./../d3");

function min(array) {
  var min = d3.min(array);
  return typeof min === "string" ? "\"" + min + "\"" : min;
}

console.log("min:");
console.log("                                [1] -> " + min([1]));
console.log("                    [5, 1, 2, 3, 4] -> " + min([5, 1, 2, 3, 4]));
console.log("                    [\"a\", \"b\", \"c\"] -> " + min(["c", "a", "b"]));
console.log("                        [\"20\", \"3\"] -> " + min(["20", "3"]));
console.log("                        [\"3\", \"20\"] -> " + min(["3", "20"]));
console.log("                            [20, 3] -> " + min([20, 3]));
console.log("                            [3, 20] -> " + min([3, 20]));
console.log("");

console.log("min of empty array is undefined:");
console.log("                                 [] -> " + min([]));
console.log("                             [null] -> " + min([null]));
console.log("                        [undefined] -> " + min([undefined]));
console.log("                              [NaN] -> " + min([NaN]));
console.log("                         [NaN, NaN] -> " + min([NaN, NaN]));
console.log("");

console.log("min ignores null, undefined, and NaN:");
console.log("               [NaN, 1, 2, 3, 4, 5] -> " + min([NaN, 1, 2, 3, 4, 5]));
console.log("               [1, 2, 3, 4, 5, NaN] -> " + min([1, 2, 3, 4, 5, NaN]));
console.log("   [10, null, 3, undefined, 5, NaN] -> " + min([10, null, 3, undefined, 5, NaN]));
console.log("");

console.log("min compares heterogenous types as numbers:");
console.log("                          [20, \"3\"] -> " + min([20, "3"]));
console.log("                          [\"20\", 3] -> " + min(["20", 3]));
console.log("                          [3, \"20\"] -> " + min([3, "20"]));
console.log("                          [\"3\", 20] -> " + min(["3", 20]));
console.log("");

console.log("min applies accessor function:");
console.log("  [1, 2, 3, 4, 5], [2, 4, 6, 8, 10] -> " + d3.min([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.max(d); }));
console.log("                    [1, 2, 3, 4, 5] -> " + d3.min([1, 2, 3, 4, 5], function(d, i) { return i; }));
console.log("");
