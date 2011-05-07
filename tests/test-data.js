require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var vis = d3.select("body").selectAll("span")
    .data(d3.range(10));

vis.enter().append("span")
    .text(String);

console.log("data bind:");
console.log("  ", document.body.innerHTML);
console.log("");

console.log("data retrieve (old selection):");
console.log("  ", vis.data().join(","));
console.log("");

console.log("data retrieve (reselection):");
console.log("  ", d3.selectAll("span").data().join(","));
console.log("");
