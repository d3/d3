require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

d3.select("body").append("svg:svg");

console.log("append svg:svg:");
console.log("  ", document.body.innerHTML);
console.log("");

d3.select("body").append("div");

console.log("append div:");
console.log("  ", document.body.innerHTML);
console.log("");

d3.select("body").append("#text").text("hello");

console.log("append text \"hello\":");
console.log("  ", document.body.innerHTML);
console.log("");
