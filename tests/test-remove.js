require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

d3.select("body").append("svg:svg");
d3.select("body").append("div");

console.log("initialize:");
console.log("  ", document.body.outerHTML);
console.log("");

d3.select("svg").remove();

console.log("remove svg:");
console.log("  ", document.body.outerHTML);
console.log("");

d3.select("body").selectAll("div").remove();

console.log("removeAll div:");
console.log("  ", document.body.outerHTML);
console.log("");
