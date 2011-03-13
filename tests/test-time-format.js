require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.time");

var formats = [
  "a",  "A",  "b",  "B",  "c",  "d",  "e",  "H", "I",  "j",  "m",  "M",
  "p",  "S",  "U",  "w",  "W",  "x",  "X",  "y", "Y",  "Z",  "%"
];

var now = new Date(1990, 0, 1);
console.log("format 01/01/1990 00:00:00:");
formats.forEach(function(f) {
   console.log("  " + f + ":", d3.time.format("%" + f)(now));
});
console.log("");

var now = new Date(2011, 11, 31, 23, 59, 59);
console.log("format 12/31/2011 23:59:59:");
formats.forEach(function(f) {
   console.log("  " + f + ":", d3.time.format("%" + f)(now));
});
console.log("");
