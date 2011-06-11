require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var svg = d3.select("body").append("svg:svg")
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

d3.select("body").selectAll("div").remove();

svg.attr({
  width: null,
  height: null,
  left: "10",
  top: function() { return 20; }
});

console.log("map attr:");
console.log("  ", document.body.innerHTML);
console.log("");

svg.attr(function() {
  return {
    foo: "foo",
    bar: 42,
    left: null,
    top: null
  };
});

console.log("map function attr:");
console.log("  ", document.body.innerHTML);
console.log("");
