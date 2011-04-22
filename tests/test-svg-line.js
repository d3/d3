require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var line = d3.svg.line();

console.log("default:");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", line([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", line([[0, 0], [1, 1], [2, 0]]));
console.log("");

var line = d3.svg.line()
    .y(-1);

console.log("y(-1):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", line([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", line([[0, 0], [1, 1], [2, 0]]));
console.log("");

var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

console.log("x(d.x).y(d.y):");
console.log("                      [{x:0,y:0}]:", line([{x:0,y:0}]));
console.log("            [{x:0,y:0},{x:1,y:1}]:", line([{x:0,y:0},{x:1,y:1}]));
console.log("  [{x:0,y:0},{x:1,y:1},{x:2,y:0}]:", line([{x:0,y:0},{x:1,y:1},{x:2,y:0}]));
console.log("");

var line = d3.svg.line()
    .interpolate("step-before");

console.log("interpolate(step-before):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", line([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", line([[0, 0], [1, 1], [2, 0]]));
console.log("");

var line = d3.svg.line()
    .interpolate("step-after");

console.log("interpolate(step-after):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", line([[0, 0], [1, 1]]));
console.log("         [[0, 0], [1, 1], [2, 0]]:", line([[0, 0], [1, 1], [2, 0]]));
console.log("");

var line = d3.svg.line()
    .interpolate("basis");

console.log("interpolate(basis):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [1, 1]]:", line([[0, 0], [1, 1]]));
console.log("        [[0, 0], [6, 6], [12, 0]]:", line([[0, 0], [6, 6], [12, 0]]));
console.log("");

var line = d3.svg.line()
    .interpolate("basis-closed");

console.log("interpolate(basis-closed):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [6, 6]]:", line([[0, 0], [6, 6]]));
console.log("        [[0, 0], [6, 6], [12, 0]]:", line([[0, 0], [6, 6], [12, 0]]));
console.log("");

var line = d3.svg.line()
    .interpolate("cardinal");

console.log("interpolate(cardinal):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [5, 5]]:", line([[0, 0], [5, 5]]));
console.log("        [[0, 0], [5, 5], [10, 0]]:", line([[0, 0], [5, 5], [10, 0]]));
console.log("");

var line = d3.svg.line()
    .interpolate("cardinal-closed");

console.log("interpolate(cardinal-closed):");
console.log("                         [[0, 0]]:", line([[0, 0]]));
console.log("                 [[0, 0], [5, 5]]:", line([[0, 0], [5, 5]]));
console.log("        [[0, 0], [5, 5], [10, 0]]:", line([[0, 0], [5, 5], [10, 0]]));
console.log("");
