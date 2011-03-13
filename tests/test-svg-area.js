require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var area = d3.svg.area();

console.log("default:");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", area([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", area([[0, 0], [1, 1], [2, 0]]));
console.log("");

var area = d3.svg.area()
    .y0(-1);

console.log("y0(-1):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", area([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", area([[0, 0], [1, 1], [2, 0]]));
console.log("");

var area = d3.svg.area()
    .x(function(d) { return d.x; })
    .y1(function(d) { return d.y; });

console.log("x(d.x).y1(d.y):");
console.log("                      [{x:0,y:0}]:", area([{x:0,y:0}]));
console.log("            [{x:0,y:0},{x:1,y:1}]:", area([{x:0,y:0},{x:1,y:1}]));
console.log("  [{x:0,y:0},{x:1,y:1},{x:2,y:0}]:", area([{x:0,y:0},{x:1,y:1},{x:2,y:0}]));
console.log("");

var area = d3.svg.area()
    .x(function(d) { return d.x; })
    .y0(function(d) { return -d.y; })
    .y1(function(d) { return d.y; });

console.log("x(d.x).y0(-d.y).y1(d.y):");
console.log("                      [{x:0,y:0}]:", area([{x:0,y:0}]));
console.log("            [{x:0,y:0},{x:1,y:1}]:", area([{x:0,y:0},{x:1,y:1}]));
console.log("  [{x:0,y:0},{x:1,y:1},{x:2,y:0}]:", area([{x:0,y:0},{x:1,y:1},{x:2,y:0}]));
console.log("");

var area = d3.svg.area()
    .interpolate("step-before");

console.log("interpolate(step-before):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", area([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", area([[0, 0], [1, 1], [2, 0]]));
console.log("");

var area = d3.svg.area()
    .interpolate("step-after");

console.log("interpolate(step-after):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", area([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", area([[0, 0], [1, 1], [2, 0]]));
console.log("");

var area = d3.svg.area()
    .interpolate("basis");

console.log("interpolate(basis):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", area([[0, 0], [1, 1]]));
console.log("        [[0, 0], [6, 6], [12, 0]]:", area([[0, 0], [6, 6], [12, 0]]));
console.log("");

var area = d3.svg.area()
    .interpolate("basis-closed");

console.log("interpolate(basis-closed):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [6, 6]]:", area([[0, 0], [6, 6]]));
console.log("        [[0, 0], [6, 6], [12, 0]]:", area([[0, 0], [6, 6], [12, 0]]));
console.log("");

var area = d3.svg.area()
    .interpolate("cardinal");

console.log("interpolate(cardinal):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [5, 5]]:", area([[0, 0], [5, 5]]));
console.log("        [[0, 0], [5, 5], [10, 0]]:", area([[0, 0], [5, 5], [10, 0]]));
console.log("");

var area = d3.svg.area()
    .interpolate("cardinal-closed");

console.log("interpolate(cardinal-closed):");
console.log("                         [[0, 0]]:", area([[0, 0]]));
console.log("                 [[0, 0], [5, 5]]:", area([[0, 0], [5, 5]]));
console.log("        [[0, 0], [5, 5], [10, 0]]:", area([[0, 0], [5, 5], [10, 0]]));
console.log("");
