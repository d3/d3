require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("hours(2011-01-01T06:00:00Z, 2011-01-01T10:00:00Z):");
d3.time.hours(parse("2011-01-01T06:00:00Z"), parse("2011-01-01T10:00:00Z")).forEach(log);
console.log("");

console.log("hours(2011-03-13T07:00:00Z, 2011-03-13T11:00:00Z):");
d3.time.hours(parse("2011-03-13T07:00:00Z"), parse("2011-03-13T11:00:00Z")).forEach(log);
console.log("");

console.log("hours(2011-11-06T07:00:00Z, 2011-11-06T11:00:00Z):");
d3.time.hours(parse("2011-11-06T07:00:00Z"), parse("2011-11-06T11:00:00Z")).forEach(log);
console.log("");

console.log("hours(2011-11-06T07:00:00Z, 2011-11-07T11:00:00Z, 3):");
d3.time.hours(parse("2011-11-06T07:00:00Z"), parse("2011-11-07T11:00:00Z"), 3).forEach(log);
console.log("");

console.log("hours.utc(2010-12-31T22:00:00Z, 2011-01-01T02:00:00Z):");
d3.time.hours.utc(parse("2010-12-31T22:00:00Z"), parse("2011-01-01T02:00:00Z")).forEach(log);
console.log("");

console.log("hours.utc(2010-12-31T22:00:00Z, 2011-01-02T02:00:00Z, 3):");
d3.time.hours.utc(parse("2010-12-31T22:00:00Z"), parse("2011-01-02T02:00:00Z"), 3).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
