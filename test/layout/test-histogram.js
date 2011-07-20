require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.layout");

var format = d3.format(".2f");

var histogram = d3.layout.histogram().frequency(true);
console.log("frequency(true):");
console.log("  0,0,0,1,2,2 -> " + log(histogram([0,0,0,1,2,2])));
console.log("");

var histogram = d3.layout.histogram().frequency(false);
console.log("frequency(false):");
console.log("  0,0,0,1,2,2 -> " + log(histogram([0,0,0,1,2,2])));
console.log("");

var histogram = d3.layout.histogram().bins(2);
console.log("bins(4):");
console.log("  0,0,0,1,2,2 -> " + log(histogram([0,0,0,1,2,2])));
console.log("");

var histogram = d3.layout.histogram().bins([0,1,2,3]);
console.log("bins(0,1,2,3):");
console.log("  0,0,0,1,2,2 -> " + log(histogram([0,0,0,1,2,2])));
console.log("");

function log(bins) {
  return bins.map(function(bin) { return format(bin.x) + "-" + format(bin.x + bin.dx) + ":" + format(bin.y); }).join(", ");
}
