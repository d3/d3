require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.stats");

var data = [1, 2, 3, 4];

console.log("nrd0:");
console.log("  ", d3.stats.bandwidth.nrd0(data));
console.log("");

console.log("nrd:");
console.log("  ", d3.stats.bandwidth.nrd(data));
console.log("");
