require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("weeks(2010-12-21T06:00:00Z, 2011-01-12T10:00:00Z):");
d3.time.weeks(parse("2010-12-21T06:00:00Z"), parse("2011-01-12T10:00:00Z")).forEach(log);
console.log("");

console.log("weeks(2011-03-02T07:00:00Z, 2011-03-24T11:00:00Z):");
d3.time.weeks(parse("2011-03-02T07:00:00Z"), parse("2011-03-24T11:00:00Z")).forEach(log);
console.log("");

console.log("weeks(2011-10-25T07:00:00Z, 2011-11-17T11:00:00Z):");
d3.time.weeks(parse("2011-10-25T07:00:00Z"), parse("2011-11-17T11:00:00Z")).forEach(log);
console.log("");

console.log("weeks(2011-10-25T07:00:00Z, 2012-11-17T11:00:00Z, 4):");
d3.time.weeks(parse("2011-10-25T07:00:00Z"), parse("2012-11-17T11:00:00Z"), 4).forEach(log);
console.log("");

console.log("weeks.utc(2010-12-20T22:00:00Z, 2011-01-12T02:00:00Z):");
d3.time.weeks.utc(parse("2010-12-20T22:00:00Z"), parse("2011-01-12T02:00:00Z")).forEach(log);
console.log("");

console.log("weeks.utc(2010-12-20T22:00:00Z, 2011-01-12T02:00:00Z, 4):");
d3.time.weeks.utc(parse("2010-12-20T22:00:00Z"), parse("2012-01-12T02:00:00Z"), 4).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
