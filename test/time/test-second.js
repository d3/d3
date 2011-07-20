require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("second:");
console.log("  2010-12-31T23:59:59.999Z -> " + format(d3.time.second(parse("2010-12-31T23:59:59.999Z"))));
console.log("  2011-01-01T00:00:00.000Z -> " + format(d3.time.second(parse("2011-01-01T00:00:00.000Z"))));
console.log("  2011-01-01T00:00:00.456Z -> " + format(d3.time.second(parse("2011-01-01T00:00:00.456Z"))));
console.log("  2011-01-01T00:00:00.999Z -> " + format(d3.time.second(parse("2011-01-01T00:00:00.999Z"))));
console.log("  2011-01-01T00:00:59.999Z -> " + format(d3.time.second(parse("2011-01-01T00:00:59.999Z"))));
console.log("");

console.log("second.utc:");
console.log("  2010-12-31T23:59:59.999Z -> " + format(d3.time.second.utc(parse("2010-12-31T23:59:59.999Z"))));
console.log("  2011-01-01T00:00:00.000Z -> " + format(d3.time.second.utc(parse("2011-01-01T00:00:00.000Z"))));
console.log("  2011-01-01T00:00:00.456Z -> " + format(d3.time.second.utc(parse("2011-01-01T00:00:00.456Z"))));
console.log("  2011-01-01T00:00:00.999Z -> " + format(d3.time.second.utc(parse("2011-01-01T00:00:00.999Z"))));
console.log("  2011-01-01T00:00:59.999Z -> " + format(d3.time.second.utc(parse("2011-01-01T00:00:59.999Z"))));
console.log("");
