require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("constructor:");
console.log("  " + d3.hsl(60, 1, .2));
console.log("  " + d3.hsl(60.4, .994, .204));
console.log("  " + d3.hsl(60.6, .996, .216));
console.log("  " + JSON.stringify(d3.hsl(60, 1, .2)));
console.log("");

console.log("parse rgb:");
console.log("  " + d3.hsl("#660"));
console.log("  " + d3.hsl("#666600"));
console.log("  " + d3.hsl("rgb(102, 102, 0)"));
console.log("  " + JSON.stringify(d3.hsl("#660")));
console.log("");

console.log("parse hsl:");
console.log("  " + d3.hsl("hsl(60, 100%, 20%)"));
console.log("  " + d3.hsl(d3.hsl(60, 1, .2)));
console.log("  " + JSON.stringify(d3.hsl("hsl(60, 100%, 20%)")));
console.log("");

console.log("parse names:");
console.log("  " + d3.hsl("red"));
console.log("  " + d3.hsl("yellow"));
console.log("  " + d3.hsl("blue"));
console.log("");

console.log("convert to rgb:");
console.log("  " + d3.hsl("#660").rgb());
console.log("  " + d3.hsl("hsl(60, 100%, 20%)").rgb());
console.log("  " + d3.hsl(60, 1, .2).rgb());
console.log("  " + JSON.stringify(d3.hsl("#660").rgb()));
console.log("");

console.log("brighter:");
console.log("  " + d3.hsl(60, 1, .2).brighter());
console.log("  " + d3.hsl("#660").brighter(1));
console.log("  " + d3.hsl("hsl(60, 100%, 20%)").brighter(.5));
console.log("  " + d3.hsl(d3.rgb(102, 102, 0)).brighter(2));
console.log("  " + JSON.stringify(d3.hsl("hsl(60, 100%, 20%)").brighter()));
console.log("");

console.log("darker:");
console.log("  " + d3.hsl(60, 1, .2).darker());
console.log("  " + d3.hsl("#660").darker(1));
console.log("  " + d3.hsl("hsl(60, 100%, 20%)").darker(.5));
console.log("  " + d3.hsl(d3.rgb(102, 102, 0)).darker(2));
console.log("  " + JSON.stringify(d3.hsl("hsl(60, 100%, 20%)").darker()));
console.log("");
