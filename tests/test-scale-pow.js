require("./../lib/env-js/envjs/node");
require("./../d3");

var f = d3.format(" .3f");

var x = d3.scale.pow().exponent(2);
console.log("domain([0, 1]).range([0, 1]):");
console.log("         -0.5  -> ", f(x(-0.5)));
console.log("          0.0  -> ", f(x(0.0)));
console.log("          0.5  -> ", f(x(0.5)));
console.log("          1.0  -> ", f(x(1.0)));
console.log("          1.5  -> ", f(x(1.5)));
console.log("");

var x = d3.scale.pow().exponent(2).domain([1, 2]);
console.log("domain([1, 2]).range([0, 1]):");
console.log("          0.5  -> ", f(x(0.5)));
console.log("          1.0  -> ", f(x(1.0)));
console.log("          1.5  -> ", f(x(1.5)));
console.log("          2.0  -> ", f(x(2.0)));
console.log("          2.5  -> ", f(x(2.5)));
console.log("");

var x = d3.scale.pow().exponent(2).domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
console.log("domain([01/01/1990, 01/01/1991]).range([0, 1]):");
console.log("   10/20/1989  -> ", f(x(new Date(1989, 09, 20))));
console.log("   01/01/1990  -> ", f(x(new Date(1990, 00, 01))));
console.log("   03/15/1990  -> ", f(x(new Date(1990, 02, 15))));
console.log("   05/27/1990  -> ", f(x(new Date(1990, 04, 27))));
console.log("   01/01/1991  -> ", f(x(new Date(1991, 00, 01))));
console.log("   03/15/1991  -> ", f(x(new Date(1991, 02, 15))));
console.log("");

var x = d3.scale.pow().exponent(2).range(["red", "blue"]);
console.log("domain([0, 1]).range([\"red\", \"blue\"]):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.scale.pow().exponent(2).range(["red", "blue"]).interpolate(d3.interpolateHsl);
console.log("domain([0, 1]).range([\"red\", \"blue\"]).interpolate(hsl):");
console.log("        -0.50  -> ", x(-0.50));
console.log("         0.00  -> ", x(0.00));
console.log("         0.50  -> ", x(0.50));
console.log("        √0.50  -> ", x(Math.SQRT1_2));
console.log("         1.00  -> ", x(1.00));
console.log("         2.00  -> ", x(2.00));
console.log("");

var x = d3.scale.pow().exponent(2).domain([1, 2]).range([0, 1]).clamp(true);
console.log("domain clamping:")
console.log("        under  -> ", x(-1));
console.log("         over  -> ", x(2));
console.log("");
