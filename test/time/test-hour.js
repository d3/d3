require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

function parse(string) { return new Date(string); }
function format(date) { return date.toString(); }

console.log("hour:");
console.log("  2010-12-31T23:59:59Z -> " + format(d3.time.hour(parse("2010-12-31T23:59:59Z"))));
console.log("  2011-01-01T00:00:00Z -> " + format(d3.time.hour(parse("2011-01-01T00:00:00Z"))));
console.log("  2011-01-01T00:59:00Z -> " + format(d3.time.hour(parse("2011-01-01T00:59:00Z"))));
console.log("  2011-01-01T01:00:00Z -> " + format(d3.time.hour(parse("2011-01-01T01:00:00Z"))));
console.log("  2011-03-13T08:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T08:00:00Z"))));
console.log("  2011-03-13T09:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T09:00:00Z"))));
console.log("  2011-03-13T10:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T10:00:00Z"))));
console.log("  2011-11-06T08:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T08:00:00Z"))));
console.log("  2011-11-06T09:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T09:00:00Z"))));
console.log("  2011-11-06T10:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T10:00:00Z"))));
console.log("");

var tz = process.env.TZ;
try {
  process.env.TZ = "Asia/Kathmandu"; new Date().toString();
  console.log("hour.npt:");
  console.log("  2010-12-31T23:59:59Z -> " + format(d3.time.hour(parse("2010-12-31T23:59:59Z"))));
  console.log("  2011-01-01T00:00:00Z -> " + format(d3.time.hour(parse("2011-01-01T00:00:00Z"))));
  console.log("  2011-01-01T00:59:00Z -> " + format(d3.time.hour(parse("2011-01-01T00:59:00Z"))));
  console.log("  2011-01-01T01:00:00Z -> " + format(d3.time.hour(parse("2011-01-01T01:00:00Z"))));
  console.log("  2011-03-13T08:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T08:00:00Z"))));
  console.log("  2011-03-13T09:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T09:00:00Z"))));
  console.log("  2011-03-13T10:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T10:00:00Z"))));
  console.log("  2011-11-06T08:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T08:00:00Z"))));
  console.log("  2011-11-06T09:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T09:00:00Z"))));
  console.log("  2011-11-06T10:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T10:00:00Z"))));
  console.log("");

  process.env.TZ = "Asia/Calcutta"; new Date().toString();
  console.log("hour.ist:");
  console.log("  2010-12-31T23:59:59Z -> " + format(d3.time.hour(parse("2010-12-31T23:59:59Z"))));
  console.log("  2011-01-01T00:00:00Z -> " + format(d3.time.hour(parse("2011-01-01T00:00:00Z"))));
  console.log("  2011-01-01T00:59:00Z -> " + format(d3.time.hour(parse("2011-01-01T00:59:00Z"))));
  console.log("  2011-01-01T01:00:00Z -> " + format(d3.time.hour(parse("2011-01-01T01:00:00Z"))));
  console.log("  2011-03-13T08:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T08:00:00Z"))));
  console.log("  2011-03-13T09:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T09:00:00Z"))));
  console.log("  2011-03-13T10:00:00Z -> " + format(d3.time.hour(parse("2011-03-13T10:00:00Z"))));
  console.log("  2011-11-06T08:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T08:00:00Z"))));
  console.log("  2011-11-06T09:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T09:00:00Z"))));
  console.log("  2011-11-06T10:00:00Z -> " + format(d3.time.hour(parse("2011-11-06T10:00:00Z"))));
  console.log("");
} finally {
  process.env.TZ = tz;
}

console.log("hour.utc:");
console.log("  2010-12-31T23:59:59Z -> " + format(d3.time.hour.utc(parse("2010-12-31T23:59:59Z"))));
console.log("  2011-01-01T00:00:00Z -> " + format(d3.time.hour.utc(parse("2011-01-01T00:00:00Z"))));
console.log("  2011-01-01T00:59:00Z -> " + format(d3.time.hour.utc(parse("2011-01-01T00:59:00Z"))));
console.log("  2011-01-01T01:00:00Z -> " + format(d3.time.hour.utc(parse("2011-01-01T01:00:00Z"))));
console.log("  2011-03-13T08:00:00Z -> " + format(d3.time.hour.utc(parse("2011-03-13T08:00:00Z"))));
console.log("  2011-03-13T09:00:00Z -> " + format(d3.time.hour.utc(parse("2011-03-13T09:00:00Z"))));
console.log("  2011-03-13T10:00:00Z -> " + format(d3.time.hour.utc(parse("2011-03-13T10:00:00Z"))));
console.log("  2011-11-06T08:00:00Z -> " + format(d3.time.hour.utc(parse("2011-11-06T08:00:00Z"))));
console.log("  2011-11-06T09:00:00Z -> " + format(d3.time.hour.utc(parse("2011-11-06T09:00:00Z"))));
console.log("  2011-11-06T10:00:00Z -> " + format(d3.time.hour.utc(parse("2011-11-06T10:00:00Z"))));
console.log("");
