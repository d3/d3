require("./../../lib/env-js/envjs/node");
require("./../../d3");
require("./../../d3.layout");

var treemap = d3.layout.treemap();

console.log("zero, negative and NaN values:");
console.log("  {value: 0}   ", treemap.nodes({value: 0})[0].area);
console.log("  {value: -1}  ", treemap.nodes({value: -1})[0].area);
console.log("  {value: NaN} ", treemap.nodes({value: NaN})[0].area);
console.log("");

treemap.size([0, 0]);
console.log("size([0, 0]):");
console.log("  {value: 0}   ", treemap.nodes({value: 0})[0].area);
console.log("  {value: -1}  ", treemap.nodes({value: -1})[0].area);
console.log("  {value: NaN} ", treemap.nodes({value: NaN})[0].area);
console.log("  {value: 1}   ", treemap.nodes({value: 1})[0].area);
console.log("");

treemap.size([-1, -1]);
console.log("size([-1, -1]):");
console.log("  {value: 0}   ", treemap.nodes({value: 0})[0].area);
console.log("  {value: -1}  ", treemap.nodes({value: -1})[0].area);
console.log("  {value: NaN} ", treemap.nodes({value: NaN})[0].area);
console.log("  {value: 1}   ", treemap.nodes({value: 1})[0].area);
console.log("");

treemap.size([-1, 1]);
console.log("size([-1, 1]):");
console.log("  {value: 0}   ", treemap.nodes({value: 0})[0].area);
console.log("  {value: -1}  ", treemap.nodes({value: -1})[0].area);
console.log("  {value: NaN} ", treemap.nodes({value: NaN})[0].area);
console.log("  {value: 1}   ", treemap.nodes({value: 1})[0].area);
console.log("");

treemap.size([NaN, NaN]);
console.log("size([NaN, NaN]):");
console.log("  {value: 0}   ", treemap.nodes({value: 0})[0].area);
console.log("  {value: -1}  ", treemap.nodes({value: -1})[0].area);
console.log("  {value: NaN} ", treemap.nodes({value: NaN})[0].area);
console.log("  {value: 1}   ", treemap.nodes({value: 1})[0].area);
console.log("");

treemap.size([10, 10]);
var tree = {children: [{value: 1}]};

console.log("padding:");
console.log("  default                  ", log(treemap.nodes(tree)[1]));
console.log("  1                        ", log(treemap.padding(1).nodes(tree)[1]));
console.log("  10                       ", log(treemap.padding(10).nodes(tree)[1]));
console.log("  [1, 1, 1, 1]             ", log(treemap.padding([1, 1, 1, 1]).nodes(tree)[1]));
console.log("  [10, 1, 10, 1]           ", log(treemap.padding([10, 1, 10, 1]).nodes(tree)[1]));
console.log("  [1, 10, 1, 10]           ", log(treemap.padding([1, 10, 1, 10]).nodes(tree)[1]));
console.log("  function(x) 1            ", log(treemap.padding(function(x) { return 1; }).nodes(tree)[1]));
console.log("  function(x) 10           ", log(treemap.padding(function(x) { return 10; }).nodes(tree)[1]));
console.log("  function(x) [1, 1, 1, 1] ", log(treemap.padding(function(x) { return [1, 1, 1, 1]; }).nodes(tree)[1]));
console.log("  function(x) [1, 10, 1, 1]", log(treemap.padding(function(x) { return [1, 10, 1, 1]; }).nodes(tree)[1]));
console.log("  function(x) null         ", log(treemap.padding(function(x) { return null; }).nodes(tree)[1]));
console.log("  null                     ", log(treemap.padding(null).nodes(tree)[1]));
console.log("");

treemap.size([1000, 1000]);
var tree = {children: [{value: 2}, {value: 260}, {value: 180}, {value: 2}, {value: 1}, {value: 0}]};
console.log("zero-sized node:");
treemap.nodes(tree).forEach(function(node) { console.log(new Array(node.depth + 2).join("  ") + log(node)); });
console.log("");

function log(node) {
  return node.x + "," + node.y + "," + node.dx + "," + node.dy;
}
