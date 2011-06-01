require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.vector");

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

var x = d3.vector.interpolate([
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [1, 2, 3, 1]
], [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [10, 20, 30, 1]
]);
console.log("interpolateMatrix (translate):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.vector.interpolate([
  [1, 0, 0, 1],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [1, 2, 3, 1]
], [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [10, 20, 30, 1]
]);
console.log("interpolateMatrix (translate + perspective):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.interpolate("matrix3d(" + [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [1, 2, 3, 1]
] + ")", "matrix3d(" + [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [10, 20, 30, 1]
] + ")");
console.log("interpolate (parsed translate matrix):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");
