require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("months(2010-11-21T06:00:00Z, 2011-02-12T10:00:00Z):");
d3.time.months(parse("2010-11-21T06:00:00Z"), parse("2011-02-12T10:00:00Z")).forEach(log);
console.log("");

console.log("months(2011-01-02T07:00:00Z, 2011-04-24T11:00:00Z):");
d3.time.months(parse("2011-01-02T07:00:00Z"), parse("2011-04-24T11:00:00Z")).forEach(log);
console.log("");

console.log("months(2011-09-25T07:00:00Z, 2011-12-17T11:00:00Z):");
d3.time.months(parse("2011-09-25T07:00:00Z"), parse("2011-12-17T11:00:00Z")).forEach(log);
console.log("");

console.log("months(2011-09-25T07:00:00Z, 2012-12-17T11:00:00Z, 3):");
d3.time.months(parse("2011-09-25T07:00:00Z"), parse("2012-12-17T11:00:00Z"), 3).forEach(log);
console.log("");

console.log("months.utc(2010-11-20T22:00:00Z, 2011-02-12T02:00:00Z):");
d3.time.months.utc(parse("2010-11-20T22:00:00Z"), parse("2011-02-12T02:00:00Z")).forEach(log);
console.log("");

console.log("months.utc(2010-11-20T22:00:00Z, 2012-02-12T02:00:00Z, 3):");
d3.time.months.utc(parse("2010-11-20T22:00:00Z"), parse("2012-02-12T02:00:00Z"), 3).forEach(log);
console.log("");

function log(date) {
  console.log("  " + format(date));
}
