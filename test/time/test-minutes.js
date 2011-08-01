require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("minutes(2011-01-01T07:58:00Z, 2011-01-01T08:02:00Z):");
d3.time.minutes(parse("2011-01-01T07:58:00Z"), parse("2011-01-01T08:02:00Z")).forEach(log);
console.log("");

console.log("minutes(2011-03-13T09:58:00Z, 2011-03-13T10:02:00Z):");
d3.time.minutes(parse("2011-03-13T09:58:00Z"), parse("2011-03-13T10:02:00Z")).forEach(log);
console.log("");

console.log("minutes(2011-03-13T09:58:00Z, 2011-03-13T11:02:00Z, 15):");
d3.time.minutes(parse("2011-03-13T09:58:00Z"), parse("2011-03-13T11:02:00Z"), 15).forEach(log);
console.log("");

console.log("minutes.utc(2010-12-31T23:58:00Z, 2011-01-01T00:02:00Z):");
d3.time.minutes.utc(parse("2010-12-31T23:58:00Z"), parse("2011-01-01T00:02:00Z")).forEach(log);
console.log("");

console.log("minutes.utc(2010-12-31T23:58:00Z, 2011-01-01T01:02:00Z, 15):");
d3.time.minutes.utc(parse("2010-12-31T23:58:00Z"), parse("2011-01-01T01:02:00Z"), 15).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
