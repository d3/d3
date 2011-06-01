require("./../lib/env-js/envjs/node");
require("./../d3");

var x = d3.interpolate("200 0", "250");
console.log("interpolate(200 0, 250):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolateString("200", "250.00");
console.log("interpolateString(200, 250.00):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolateNumber(200, 250);
console.log("interpolateNumber(200, 250):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolateObject({key: 200}, {key: 250});
console.log("interpolateObject({ key: 200 }, { key: 250 }):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolateArray([200], [250]);
console.log("interpolateArray([ 200 ], [ 250 ]):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolateRgb("red", "blue");
console.log("interpolateRgb(red, blue):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolateHsl("red", "blue");
console.log("interpolateHsl(red, blue):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");
