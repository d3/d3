require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("days(2010-12-31T06:00:00Z, 2011-01-02T10:00:00Z):");
d3.time.days(parse("2010-12-31T06:00:00Z"), parse("2011-01-02T10:00:00Z")).forEach(log);
console.log("");

console.log("days(2011-03-12T07:00:00Z, 2011-03-14T11:00:00Z):");
d3.time.days(parse("2011-03-12T07:00:00Z"), parse("2011-03-14T11:00:00Z")).forEach(log);
console.log("");

console.log("days(2011-11-05T07:00:00Z, 2011-11-07T11:00:00Z):");
d3.time.days(parse("2011-11-05T07:00:00Z"), parse("2011-11-07T11:00:00Z")).forEach(log);
console.log("");

console.log("days(2011-11-05T07:00:00Z, 2011-11-17T11:00:00Z, 5):");
d3.time.days(parse("2011-11-05T07:00:00Z"), parse("2011-11-17T11:00:00Z"), 5).forEach(log);
console.log("");

console.log("days.utc(2010-12-30T22:00:00Z, 2011-01-02T02:00:00Z):");
d3.time.days.utc(parse("2010-12-30T22:00:00Z"), parse("2011-01-02T02:00:00Z")).forEach(log);
console.log("");

console.log("days.utc(2010-12-30T22:00:00Z, 2011-01-12T02:00:00Z, 5):");
d3.time.days.utc(parse("2010-12-30T22:00:00Z"), parse("2011-01-12T02:00:00Z"), 5).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
