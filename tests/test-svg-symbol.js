require("./../lib/env-js/envjs/node");
require("./../d3");

var symbol = d3.svg.symbol();
console.log("default:");
console.log("  undefined:", symbol());
console.log("");

var symbol = d3.svg.symbol().size(Number);
console.log("size(Number):");
console.log("   0:", symbol(0));
console.log("   π:", symbol(Math.PI));
console.log("  4π:", symbol(4 * Math.PI));
console.log("");

var symbol = d3.svg.symbol().size(function(d) { return d.z; });
console.log("size(d.z):");
console.log("   0:", symbol({z: 0}));
console.log("   π:", symbol({z: Math.PI}));
console.log("  4π:", symbol({z: 4 * Math.PI}));
console.log("");

var symbol = d3.svg.symbol().type("cross").size(Number);
console.log("type(cross).size(Number):");
console.log("   0:", symbol(0));
console.log("  20:", symbol(20));
console.log("");

var symbol = d3.svg.symbol().type("diamond").size(Number);
console.log("type(diamond).size(Number):");
console.log("   0:", symbol(0));
console.log("  10:", symbol(10));
console.log("");

var symbol = d3.svg.symbol().type("square").size(Number);
console.log("type(square).size(Number):");
console.log("   0:", symbol(0));
console.log("   4:", symbol(4));
console.log("  16:", symbol(16));
console.log("");

var symbol = d3.svg.symbol().type("triangle-down").size(Number);
console.log("type(triangle-down).size(Number):");
console.log("   0:", symbol(0));
console.log("  10:", symbol(10));
console.log("");

var symbol = d3.svg.symbol().type("triangle-up").size(Number);
console.log("type(triangle-up).size(Number):");
console.log("   0:", symbol(0));
console.log("  10:", symbol(10));
console.log("");

var symbol = d3.svg.symbol().type(String);
console.log("type(String):");
console.log("      undefined:", symbol());
console.log("         circle:", symbol("circle"));
console.log("          cross:", symbol("cross"));
console.log("        diamond:", symbol("diamond"));
console.log("         square:", symbol("square"));
console.log("  triangle-down:", symbol("triangle-down"));
console.log("    triangle-up:", symbol("triangle-up"));
console.log("");
