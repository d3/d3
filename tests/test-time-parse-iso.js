require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.time");

var f = d3.time.format.utc("%c");

console.log("parse:");
console.log("  1990-01-01T00:00:00Z ->", f(d3.time.format.iso.parse("1990-01-01T00:00:00Z")));
console.log("  2011-12-31T23:59:59Z ->", f(d3.time.format.iso.parse("2011-12-31T23:59:59Z")));
console.log("");
