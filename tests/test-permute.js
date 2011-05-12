require("./../lib/env-js/envjs/node");
require("./../d3");

var array = [0,1,2];

console.log("permute reverses:");
console.log("    2,1,0:", d3.permute(array, [2,1,0]) + "");
console.log("");

console.log("permute does not modify input array:");
console.log("    0,1,2:", array + "");
console.log("");

console.log("permute does nothing:");
console.log("    0,1,2:", d3.permute(array, [0,1,2]) + "");
console.log("");

console.log("permute duplicates:");
console.log("    0,0,0:", d3.permute(array, [0,0,0]) + "");
console.log("");

console.log("permute returns fewer elements:");
console.log("      2,1:", d3.permute(array, [2,1]) + "");
console.log("        1:", d3.permute(array, [1]) + "");
console.log("        0:", d3.permute(array, [0]) + "");
console.log("         :", d3.permute(array, []) + "");
console.log("");

console.log("permute returns undefined elements:");
console.log("       10:", d3.permute(array, [10]) + "");
console.log("       -1:", d3.permute(array, [-1]) + "");
console.log("     0,-1:", d3.permute(array, [0,-1]) + "");
console.log("");

console.log("permute returns more elements:");
console.log("  0,0,1,2:", d3.permute(array, [0,0,1,2]) + "");
console.log("  0,1,1,1:", d3.permute(array, [0,1,1,1]) + "");
console.log("");
