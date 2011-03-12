require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var body = d3.select("body")
    .style("background-color", "white");

console.log("transition start:");
console.log("  ", body.style("background-color"));
console.log("");

body.transition()
    .style("background-color", "red")
    .each("end", function() {
      console.log("transition end:");
      console.log("  ", body.style("background-color"));
      console.log("");
    });
