require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.time");

console.log("format:");
console.log("  01/01/1990 00:00:00 ->", d3.time.format.iso(new Date(Date.UTC(1990, 0, 1))));
console.log("  12/31/2011 23:59:59 ->", d3.time.format.iso(new Date(Date.UTC(2011, 11, 31, 23, 59, 59))));
console.log("");
