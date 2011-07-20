require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("minute:");
console.log("  2010-12-31T23:59:59Z -> " + format(d3.time.minute(parse("2010-12-31T23:59:59Z"))));
console.log("  2011-01-01T00:00:00Z -> " + format(d3.time.minute(parse("2011-01-01T00:00:00Z"))));
console.log("  2011-01-01T00:00:59Z -> " + format(d3.time.minute(parse("2011-01-01T00:00:59Z"))));
console.log("  2011-01-01T00:01:00Z -> " + format(d3.time.minute(parse("2011-01-01T00:01:00Z"))));
console.log("");

console.log("minute.utc:");
console.log("  2010-12-31T23:59:59Z -> " + format(d3.time.minute.utc(parse("2010-12-31T23:59:59Z"))));
console.log("  2011-01-01T00:00:00Z -> " + format(d3.time.minute.utc(parse("2011-01-01T00:00:00Z"))));
console.log("  2011-01-01T00:00:59Z -> " + format(d3.time.minute.utc(parse("2011-01-01T00:00:59Z"))));
console.log("  2011-01-01T00:01:00Z -> " + format(d3.time.minute.utc(parse("2011-01-01T00:01:00Z"))));
console.log("");
