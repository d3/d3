require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.time");

var f = d3.time.scale().tickFormat(),
    u = d3.time.format.iso;

console.log("1-second ticks (explicit):");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T12:00:10Z")]).ticks(d3.time.seconds).forEach(log);
console.log("");

console.log("1-second ticks (implicit):");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T12:00:10Z")]).ticks(10).forEach(log);
console.log("");

console.log("5-second ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T12:00:50Z")]).ticks(10).forEach(log);
console.log("");

console.log("15-second ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T12:02:30Z")]).ticks(10).forEach(log);
console.log("");

console.log("30-second ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T12:05:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("1-minute ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T12:10:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("5-minute ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T13:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("15-minute ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T15:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("30-minute ticks:");
d3.time.scale().domain([u.parse("2011-01-01T12:00:00Z"), u.parse("2011-01-01T18:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("1-hour ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-01T18:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("3-hour ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-02T18:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("6-hour ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-04T18:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("12-hour ticks (implicit):");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-07T18:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("12-hour ticks (explicit):");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-07T18:00:00Z")]).ticks(d3.time.hours, 12).forEach(log);
console.log("");

console.log("1-day ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-14T06:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("2-day ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-01-28T06:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("1-week ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-02-28T06:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("1-month ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2011-10-28T06:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("3-month ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2013-02-28T06:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("1-year ticks:");
d3.time.scale().domain([u.parse("2011-01-01T06:00:00Z"), u.parse("2020-02-28T06:00:00Z")]).ticks(10).forEach(log);
console.log("");

console.log("seconds around minute:")
d3.time.seconds(new Date(2011, 01, 02, 01, 02, 56), new Date(2011, 01, 02, 01, 03, 05)).forEach(log);
console.log("");

console.log("seconds around hour:")
d3.time.seconds(new Date(2011, 01, 02, 02, 59, 56), new Date(2011, 01, 02, 03, 00, 05)).forEach(log);
console.log("");

console.log("seconds around day:")
d3.time.seconds(new Date(2011, 01, 01, 23, 59, 56), new Date(2011, 01, 02, 00, 00, 05)).forEach(log);
console.log("");

console.log("seconds around week:")
d3.time.seconds(new Date(2011, 01, 12, 23, 59, 56), new Date(2011, 01, 13, 00, 00, 05)).forEach(log);
console.log("");

console.log("seconds around month:")
d3.time.seconds(new Date(2011, 01, 28, 23, 59, 56), new Date(2011, 02, 01, 00, 00, 05)).forEach(log);
console.log("");

console.log("seconds around year:")
d3.time.seconds(new Date(2010, 11, 31, 23, 59, 56), new Date(2011, 00, 01, 00, 00, 05)).forEach(log);
console.log("");

console.log("minutes around hour:")
d3.time.minutes(new Date(2011, 01, 02, 02, 56), new Date(2011, 01, 02, 03, 05)).forEach(log);
console.log("");

console.log("minutes around day:")
d3.time.minutes(new Date(2011, 01, 01, 23, 56), new Date(2011, 01, 02, 00, 05)).forEach(log);
console.log("");

console.log("minutes around week:")
d3.time.minutes(new Date(2011, 01, 12, 23, 56), new Date(2011, 01, 13, 00, 05)).forEach(log);
console.log("");

console.log("minutes around month:")
d3.time.minutes(new Date(2011, 01, 28, 23, 56), new Date(2011, 02, 01, 00, 05)).forEach(log);
console.log("");

console.log("minutes around year:")
d3.time.minutes(new Date(2010, 11, 31, 23, 56), new Date(2011, 00, 01, 00, 05)).forEach(log);
console.log("");

console.log("hours around day:")
d3.time.hours(new Date(2011, 01, 01, 20), new Date(2011, 01, 02, 05)).forEach(log);
console.log("");

console.log("hours around week:")
d3.time.hours(new Date(2011, 01, 12, 20), new Date(2011, 01, 13, 05)).forEach(log);
console.log("");

console.log("hours around month:")
d3.time.hours(new Date(2011, 01, 28, 20), new Date(2011, 02, 01, 05)).forEach(log);
console.log("");

console.log("hours around year:")
d3.time.hours(new Date(2010, 11, 31, 20), new Date(2011, 00, 01, 05)).forEach(log);
console.log("");

console.log("days around week:")
d3.time.days(new Date(2011, 01, 09), new Date(2011, 01, 18)).forEach(log);
console.log("");

console.log("days around month:")
d3.time.days(new Date(2011, 01, 25), new Date(2011, 02, 06)).forEach(log);
console.log("");

console.log("days around year:")
d3.time.days(new Date(2010, 11, 28), new Date(2011, 00, 06)).forEach(log);
console.log("");

console.log("weeks around month:")
d3.time.weeks(new Date(2011, 03, 01), new Date(2011, 05, 01)).forEach(log);
console.log("");

console.log("weeks around year:")
d3.time.weeks(new Date(2005, 11, 01), new Date(2006, 01, 01)).forEach(log);
console.log("");

console.log("months around year:")
d3.time.months(new Date(2005, 08, 01), new Date(2006, 05, 01)).forEach(log);
console.log("");

function log(date) {
  console.log("  " + f(date));
}
