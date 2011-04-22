require("./../lib/env-js/envjs/node");
require("./../lib/sizzle/sizzle");
require("./../d3");

var f = d3.format(" .3f");

var x = d3.scale.sqrt();
console.log("domain([0, 1]).range([0, 1]):");
console.log("        -0.50  -> ", f(x(-0.50)));
console.log("         0.00  -> ", f(x(0.00)));
console.log("         0.25  -> ", f(x(0.25)));
console.log("         0.50  -> ", f(x(0.50)));
console.log("         1.00  -> ", f(x(1.00)));
console.log("         4.00  -> ", f(x(4.00)));
console.log("");

var x = d3.scale.sqrt().domain([0, -1]);
console.log("domain([0, -1]).range([0, 1]):");
console.log("         0.50  -> ", f(x(0.50)));
console.log("         0.00  -> ", f(x(0.00)));
console.log("        -0.25  -> ", f(x(-0.25)));
console.log("        -0.50  -> ", f(x(-0.50)));
console.log("        -1.00  -> ", f(x(-1.00)));
console.log("        -4.00  -> ", f(x(-4.00)));
console.log("");

var x = d3.scale.sqrt().domain([1, 2]);
console.log("domain([1, 2]).range([0, 1]):");
console.log("          0.5  -> ", f(x(0.5)));
console.log("          1.0  -> ", f(x(1.0)));
console.log("          1.5  -> ", f(x(1.5)));
console.log("          2.0  -> ", f(x(2.0)));
console.log("          2.5  -> ", f(x(2.5)));
console.log("");

var x = d3.scale.sqrt().range(["red", "blue"]);
console.log("domain([0, 1]).range([\"red\", \"blue\"]):");
console.log("         0.00  -> ", x(0.00));
console.log("         0.25  -> ", x(0.25));
console.log("         1.00  -> ", x(1.00));
console.log("         4.00  -> ", x(4.00));
console.log("");

var x = d3.scale.sqrt().domain([1, 0]).range(["red", "blue"]).interpolate(d3.interpolateHsl);
console.log("domain([1, 0]).range([\"red\", \"blue\"]).interpolate(hsl):");
console.log("         0.00  -> ", x(0.00));
console.log("         0.25  -> ", x(0.25));
console.log("         0.50  -> ", x(0.50));
console.log("         1.00  -> ", x(1.00));
console.log("         4.00  -> ", x(4.00));
console.log("");
