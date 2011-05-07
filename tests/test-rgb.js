require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("constructor:");
console.log("  " + d3.rgb(102, 102, 0));
console.log("  " + d3.rgb(102.4, 102.4, 0.4));
console.log("  " + d3.rgb(102.6, 102.6, 0.6));
console.log("  " + JSON.stringify(d3.rgb(102, 102, 0)));
console.log("");

console.log("parse rgb:");
console.log("  " + d3.rgb("#660"));
console.log("  " + d3.rgb("#666600"));
console.log("  " + d3.rgb("rgb(102, 102, 0)"));
console.log("  " + JSON.stringify(d3.rgb("#660")));
console.log("");

console.log("parse hsl:");
console.log("  " + d3.rgb("hsl(60, 100%, 20%)"));
console.log("  " + d3.rgb(d3.hsl(60, 1, .2)));
console.log("  " + JSON.stringify(d3.rgb("hsl(60, 100%, 20%)")));
console.log("");

console.log("parse names:");
console.log("  " + d3.rgb("aliceblue"));
console.log("  " + d3.rgb("moccasin"));
console.log("  " + d3.rgb("yellow"));
console.log("");

console.log("convert to hsl:");
console.log("  " + d3.rgb("#660").hsl());
console.log("  " + d3.rgb("#666600").hsl());
console.log("  " + d3.rgb(102, 102, 0).hsl());
console.log("  " + JSON.stringify(d3.rgb("#660").hsl()));
console.log("");

console.log("brighter:");
console.log("  " + d3.rgb(102, 102, 0).brighter());
console.log("  " + d3.rgb("#660").brighter(1));
console.log("  " + d3.rgb("hsl(60, 100%, 20%)").brighter(.5));
console.log("  " + d3.rgb(d3.hsl(60, 1, .2)).brighter(2));
console.log("  " + JSON.stringify(d3.rgb("#660").brighter()));
console.log("");

console.log("darker:");
console.log("  " + d3.rgb(102, 102, 0).darker());
console.log("  " + d3.rgb("#660").darker(1));
console.log("  " + d3.rgb("hsl(60, 100%, 20%)").darker(.5));
console.log("  " + d3.rgb(d3.hsl(60, 1, .2)).darker(2));
console.log("  " + JSON.stringify(d3.rgb("#660").darker()));
console.log("");
