require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

d3.select("body").append("div");
d3.select("body").insert("span", "div");

console.log("insert span before div:");
console.log("  ", document.body.innerHTML);
console.log("");

d3.select("body").insert("b", "div");

console.log("insert b before div:");
console.log("  ", document.body.innerHTML);
console.log("");

d3.select("body").insert("a", "span");

console.log("insert a before span:");
console.log("  ", document.body.innerHTML);
console.log("");
