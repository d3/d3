require("./../lib/env-js/envjs/node");
require("./../d3");

var x = d3.scale.quantile()
    .domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20])
    .range([0, 1, 2, 3]);

console.log("domain(3, 6, 7, 8, 8, 10, 13, 15, 16, 20).range(0, 1, 2, 3):");
console.log("  quantiles -> " + x.quantiles());
console.log("          3 -> " + x(3));
console.log("          6 -> " + x(6));
console.log("        6.9 -> " + x(6.9));
console.log("          7 -> " + x(7));
console.log("        7.1 -> " + x(7.1));
console.log("          8 -> " + x(8));
console.log("        8.9 -> " + x(8.9));
console.log("          9 -> " + x(9));
console.log("        9.1 -> " + x(9.1));
console.log("         10 -> " + x(10));
console.log("         13 -> " + x(13));
console.log("       14.9 -> " + x(14.9));
console.log("         15 -> " + x(15));
console.log("       15.1 -> " + x(15.1));
console.log("         16 -> " + x(16));
console.log("         20 -> " + x(20));
console.log("");

var x = d3.scale.quantile()
    .domain([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20])
    .range([0, 1, 2, 3]);

console.log("domain(3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20).range(0, 1, 2, 3):");
console.log("  quantiles -> " + x.quantiles());
console.log("          3 -> " + x(3));
console.log("          6 -> " + x(6));
console.log("        6.9 -> " + x(6.9));
console.log("          7 -> " + x(7));
console.log("        7.1 -> " + x(7.1));
console.log("          8 -> " + x(8));
console.log("        8.9 -> " + x(8.9));
console.log("          9 -> " + x(9));
console.log("        9.1 -> " + x(9.1));
console.log("         10 -> " + x(10));
console.log("         13 -> " + x(13));
console.log("       14.9 -> " + x(14.9));
console.log("         15 -> " + x(15));
console.log("       15.1 -> " + x(15.1));
console.log("         16 -> " + x(16));
console.log("         20 -> " + x(20));
console.log("");

var x = d3.scale.quantile()
    .domain([0, 1])
    .range([0, 1]);

console.log("domain(0, 1).range(0, 1):");
console.log("  quantiles -> " + x.quantiles());
console.log("        -.5 -> " + x(-.5));
console.log("          0 -> " + x(0));
console.log("        .49 -> " + x(.49));
console.log("        .51 -> " + x(.51));
console.log("          1 -> " + x(1));
console.log("        1.5 -> " + x(1.5));
console.log("");

var x = d3.scale.quantile()
    .domain([1, 2, 3, 4])
    .range(["a", "b"]);

console.log("domain(1, 2, 3, 4).range(a, b):");
console.log("  quantiles -> " + x.quantiles());
console.log("          0 -> " + x(0));
console.log("          1 -> " + x(1));
console.log("          2 -> " + x(2));
console.log("       2.49 -> " + x(2.49));
console.log("       2.51 -> " + x(2.51));
console.log("          3 -> " + x(3));
console.log("          4 -> " + x(4));
console.log("          5 -> " + x(5));
console.log("");

var x = d3.scale.quantile()
    .domain([1, 2, 3, 4])
    .range(["a", "b", "c"]);

console.log("domain(1, 2, 3, 4).range(a, b, c):");
console.log("  quantiles -> " + x.quantiles());
console.log("          0 -> " + x(0));
console.log("          1 -> " + x(1));
console.log("        1.9 -> " + x(1.9));
console.log("          2 -> " + x(2));
console.log("        2.1 -> " + x(2.1));
console.log("        2.9 -> " + x(2.9));
console.log("          3 -> " + x(3));
console.log("        3.1 -> " + x(3.1));
console.log("          4 -> " + x(4));
console.log("          5 -> " + x(5));
console.log("");

var x = d3.scale.quantile()
    .domain([1, 1, 2, 2, 3, 3, 4, 4])
    .range(["a", "b", "c", "d"]);

console.log("domain(1, 1, 2, 2, 3, 3, 4, 4).range(a, b, c, d):");
console.log("  quantiles -> " + x.quantiles());
console.log("          0 -> " + x(0));
console.log("          1 -> " + x(1));
console.log("       1.49 -> " + x(1.49));
console.log("       1.51 -> " + x(1.51));
console.log("          2 -> " + x(2));
console.log("       2.49 -> " + x(2.49));
console.log("       2.51 -> " + x(2.51));
console.log("          3 -> " + x(3));
console.log("       3.49 -> " + x(3.49));
console.log("       3.51 -> " + x(3.51));
console.log("          4 -> " + x(4));
console.log("          5 -> " + x(5));
console.log("");

var x = d3.scale.quantile()
    .domain([1, 2, 3, 4, 5, 6, 7, 8])
    .range(["a", "b", "c", "d"]);

console.log("domain(1, 2, 3, 4, 5, 6, 7, 8).range(a, b, c, d):");
console.log("  quantiles -> " + x.quantiles());
console.log("          0 -> " + x(0));
console.log("          1 -> " + x(1));
console.log("          2 -> " + x(2));
console.log("       2.49 -> " + x(2.49));
console.log("       2.51 -> " + x(2.51));
console.log("          3 -> " + x(3));
console.log("          4 -> " + x(4));
console.log("       4.49 -> " + x(4.49));
console.log("       4.51 -> " + x(4.51));
console.log("          5 -> " + x(5));
console.log("          6 -> " + x(6));
console.log("       6.49 -> " + x(6.49));
console.log("       6.51 -> " + x(6.51));
console.log("          7 -> " + x(7));
console.log("          8 -> " + x(8));
console.log("          9 -> " + x(9));
console.log("");
