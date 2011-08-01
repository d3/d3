require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("years(2009-11-21T06:00:00Z, 2012-02-12T10:00:00Z):");
d3.time.years(parse("2009-11-21T06:00:00Z"), parse("2012-02-12T10:00:00Z")).forEach(log);
console.log("");

console.log("years(2009-01-02T07:00:00Z, 2012-04-24T11:00:00Z):");
d3.time.years(parse("2009-01-02T07:00:00Z"), parse("2012-04-24T11:00:00Z")).forEach(log);
console.log("");

console.log("years(2009-09-25T07:00:00Z, 2012-12-17T11:00:00Z):");
d3.time.years(parse("2009-09-25T07:00:00Z"), parse("2012-12-17T11:00:00Z")).forEach(log);
console.log("");

console.log("years(2009-09-25T07:00:00Z, 2042-12-17T11:00:00Z, 5):");
d3.time.years(parse("2009-09-25T07:00:00Z"), parse("2042-12-17T11:00:00Z"), 5).forEach(log);
console.log("");

console.log("years.utc(2009-11-20T22:00:00Z, 2012-02-12T02:00:00Z):");
d3.time.years.utc(parse("2009-11-20T22:00:00Z"), parse("2012-02-12T02:00:00Z")).forEach(log);
console.log("");

console.log("years.utc(2009-11-20T22:00:00Z, 2012-02-42T02:00:00Z, 5):");
d3.time.years.utc(parse("2009-11-20T22:00:00Z"), parse("2042-02-12T02:00:00Z"), 5).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
