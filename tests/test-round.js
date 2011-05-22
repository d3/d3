require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("degenerate:");
console.log("          0 ->", d3.round(0));
console.log("        NaN ->", d3.round(NaN));
console.log("   Infinity ->", d3.round(Infinity));
console.log("  -Infinity ->", d3.round(-Infinity));
console.log("");

console.log("default:");
console.log("      10.51 ->", d3.round(10.51));
console.log("      10.50 ->", d3.round(10.50));
console.log("      10.49 ->", d3.round(10.49));
console.log("       0.51 ->", d3.round(0.51));
console.log("       0.50 ->", d3.round(0.50));
console.log("       0.49 ->", d3.round(0.49));
console.log("      -0.51 ->", d3.round(-0.51));
console.log("      -0.50 ->", d3.round(-0.50));
console.log("      -0.49 ->", d3.round(-0.49));
console.log("     -10.51 ->", d3.round(-10.51));
console.log("     -10.50 ->", d3.round(-10.50));
console.log("     -10.49 ->", d3.round(-10.49));
console.log("");

console.log("precision 1:");
console.log("      10.51 ->", d3.round(10.51, 1));
console.log("      10.50 ->", d3.round(10.50, 1));
console.log("      10.49 ->", d3.round(10.49, 1));
console.log("       0.51 ->", d3.round(0.51, 1));
console.log("       0.50 ->", d3.round(0.50, 1));
console.log("       0.49 ->", d3.round(0.49, 1));
console.log("      -0.51 ->", d3.round(-0.51, 1));
console.log("      -0.50 ->", d3.round(-0.50, 1));
console.log("      -0.49 ->", d3.round(-0.49, 1));
console.log("     -10.51 ->", d3.round(-10.51, 1));
console.log("     -10.50 ->", d3.round(-10.50, 1));
console.log("     -10.49 ->", d3.round(-10.49, 1));
console.log("");

console.log("precision 2:");
console.log("      10.51 ->", d3.round(10.51, 2));
console.log("      10.50 ->", d3.round(10.50, 2));
console.log("      10.49 ->", d3.round(10.49, 2));
console.log("       0.51 ->", d3.round(0.51, 2));
console.log("       0.50 ->", d3.round(0.50, 2));
console.log("       0.49 ->", d3.round(0.49, 2));
console.log("      -0.51 ->", d3.round(-0.51, 2));
console.log("      -0.50 ->", d3.round(-0.50, 2));
console.log("      -0.49 ->", d3.round(-0.49, 2));
console.log("     -10.51 ->", d3.round(-10.51, 2));
console.log("     -10.50 ->", d3.round(-10.50, 2));
console.log("     -10.49 ->", d3.round(-10.49, 2));
console.log("");

console.log("precision -1:");
console.log("     123.45 ->", d3.round(123.45, -1));
console.log("     345.67 ->", d3.round(345.67, -1));
console.log("    -123.45 ->", d3.round(-123.45, -1));
console.log("    -345.67 ->", d3.round(-345.67, -1));
console.log("");

console.log("precision -2:");
console.log("     123.45 ->", d3.round(123.45, -2));
console.log("     456.78 ->", d3.round(456.78, -2));
console.log("    -123.45 ->", d3.round(-123.45, -2));
console.log("    -456.78 ->", d3.round(-456.78, -2));
console.log("");

console.log("precision -3:");
console.log("     123.45 ->", d3.round(123.45, -3));
console.log("     567.89 ->", d3.round(567.89, -3));
console.log("    -123.45 ->", d3.round(-123.45, -3));
console.log("    -567.89 ->", d3.round(-567.89, -3));
console.log("");
