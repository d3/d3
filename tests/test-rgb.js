require("./../lib/env-js/envjs/node");
require("./../d3");

var color = d3.rgb(100, 100, 0);

console.log("rgb:");
console.log("  " + color);
console.log("");

console.log("rgb brighter:");
console.log("  " + color.brighter());
console.log("");

console.log("rgb darker:");
console.log("  " + color.darker());
console.log("");
