require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3.min");

var vis = d3.select("body").append('svg:svg');

console.log("simple:");
vis.call(function(a, b) {
  console.log("  ", b);
}, "test");
console.log("");
