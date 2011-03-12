require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

d3.select("body").append("svg:svg")
    .attr("width", "960")
    .attr("height", "500");

console.log("constant attr:");
console.log("  ", document.body.innerHTML);
console.log("");

d3.select("body").selectAll("div")
    .data("abcdefghijk".split(""))
  .enter().append("div")
    .attr("value", function(d, i) { return d; })
    .attr("index", function(d, i) { return i; });

console.log("function attr:");
d3.selectAll("div").each(function() {
  var d = d3.select(this);
  console.log("  ", d.attr("value"), d.attr("index"));
});
console.log("");
