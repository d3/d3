require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3.min");

var vis = d3.select("body");

console.log("zero arguments:");
vis.call(function(a, b) {
  console.log("  this:", vis === this ? "vis" : this);
  console.log("  a:", vis === a ? "vis" : a);
  console.log("  b:", b);
});
console.log("");

console.log("one argument:");
vis.call(function(a, b) {
  console.log("  this:", vis === this ? "vis" : this);
  console.log("  a:", vis === a ? "vis" : a);
  console.log("  b:", b);
}, "test");
console.log("");
