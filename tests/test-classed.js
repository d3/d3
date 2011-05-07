require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var div = d3.select("body").append("div");

div.classed("foo", true);
console.log("constant classed:");
console.log("  ", document.body.innerHTML);
console.log("");

div.classed("foo", true);
console.log("add existing class:");
console.log("  ", document.body.innerHTML);
console.log("  ", div.classed("foo"));
console.log("");

div.classed("bar", function() { return true; });
console.log("function classed:");
console.log("  ", document.body.innerHTML);
console.log("  ", div.classed("bar"));
console.log("");

div.classed("foo", false);
console.log("remove constant class:");
console.log("  ", document.body.innerHTML);
console.log("  ", div.classed("foo"));
console.log("");

div.classed("foo", false);
console.log("remove missing class:");
console.log("  ", document.body.innerHTML);
console.log("  ", div.classed("foo"));
console.log("");

div.classed("bar", function() { return false; });
console.log("remove function class:");
console.log("  ", document.body.innerHTML);
console.log("  ", div.classed("bar"));
console.log("");
