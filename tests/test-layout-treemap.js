require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.layout");

var treemap = d3.layout.treemap();

console.log("zero, negative and NaN values:");
console.log("{value: 0}   ", treemap({value: 0})[0].area);
console.log("{value: -1}  ", treemap({value: -1})[0].area);
console.log("{value: NaN} ", treemap({value: NaN})[0].area);
console.log("");

treemap.size([0, 0]);
console.log("size([0, 0]):");
console.log("{value: 0}   ", treemap({value: 0})[0].area);
console.log("{value: -1}  ", treemap({value: -1})[0].area);
console.log("{value: NaN} ", treemap({value: NaN})[0].area);
console.log("{value: 1}   ", treemap({value: 1})[0].area);
console.log("");

treemap.size([-1, -1]);
console.log("size([-1, -1]):");
console.log("{value: 0}   ", treemap({value: 0})[0].area);
console.log("{value: -1}  ", treemap({value: -1})[0].area);
console.log("{value: NaN} ", treemap({value: NaN})[0].area);
console.log("{value: 1}   ", treemap({value: 1})[0].area);
console.log("");

treemap.size([-1, 1]);
console.log("size([-1, 1]):");
console.log("{value: 0}   ", treemap({value: 0})[0].area);
console.log("{value: -1}  ", treemap({value: -1})[0].area);
console.log("{value: NaN} ", treemap({value: NaN})[0].area);
console.log("{value: 1}   ", treemap({value: 1})[0].area);
console.log("");

treemap.size([NaN, NaN]);
console.log("size([NaN, NaN]):");
console.log("{value: 0}   ", treemap({value: 0})[0].area);
console.log("{value: -1}  ", treemap({value: -1})[0].area);
console.log("{value: NaN} ", treemap({value: NaN})[0].area);
console.log("{value: 1}   ", treemap({value: 1})[0].area);
console.log("");
