require("./../lib/env-js/envjs/node");
require("./../d3");

var arc = d3.svg.arc();
console.log("default:");
console.log("  [0, 1] [0, π]:", arc({innerRadius: 0, outerRadius: 1, startAngle: 0, endAngle: Math.PI}));
console.log("");

var arc = d3.svg.arc().innerRadius(0).outerRadius(1).startAngle(0).endAngle(Math.PI);
console.log("[0, 1] [0, π]:");
console.log("  undefined:", arc());
console.log("");
