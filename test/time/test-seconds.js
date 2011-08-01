require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("seconds(2011-01-01T07:59:58Z, 2011-01-01T08:00:02Z):");
d3.time.seconds(parse("2011-01-01T07:59:58Z"), parse("2011-01-01T08:00:02Z")).forEach(log);
console.log("");

console.log("seconds(2011-03-13T09:59:58Z, 2011-03-13T10:00:02Z):");
d3.time.seconds(parse("2011-03-13T09:59:58Z"), parse("2011-03-13T10:00:02Z")).forEach(log);
console.log("");

console.log("seconds(2011-03-13T09:59:58Z, 2011-03-13T10:02:02Z, 15):");
d3.time.seconds(parse("2011-03-13T09:59:58Z"), parse("2011-03-13T10:02:02Z"), 15).forEach(log);
console.log("");

console.log("seconds.utc(2010-12-31T23:59:58Z, 2011-01-01T00:00:02Z):");
d3.time.seconds.utc(parse("2010-12-31T23:59:58Z"), parse("2011-01-01T00:00:02Z")).forEach(log);
console.log("");

console.log("seconds.utc(2010-12-31T23:59:58Z, 2011-01-01T00:02:02Z, 15):");
d3.time.seconds.utc(parse("2010-12-31T23:59:58Z"), parse("2011-01-01T00:02:02Z"), 15).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
