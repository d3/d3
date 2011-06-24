require("./../lib/env-js/envjs/node");
require("./../d3");

var f = d3.format(" .3f");

var x = d3.scale.log();
console.log("domain([1, 10]).range([0, 1]):");
console.log("           -5  -> ", f(x(-5)));
console.log("            0  -> ", f(x(0)));
console.log("         0.01  -> ", f(x(0.01)));
console.log("          0.1  -> ", f(x(0.1)));
console.log("            1  -> ", f(x(1)));
console.log("            5  -> ", f(x(5)));
console.log("           10  -> ", f(x(10)));
console.log("          100  -> ", f(x(100)));
console.log("");

var x = d3.scale.log().domain([10, 1]);
console.log("domain([10, 1]).range([0, 1]):");
console.log("           -5  -> ", f(x(-5)));
console.log("            0  -> ", f(x(0)));
console.log("         0.01  -> ", f(x(0.01)));
console.log("          0.1  -> ", f(x(0.1)));
console.log("            1  -> ", f(x(1)));
console.log("            5  -> ", f(x(5)));
console.log("           10  -> ", f(x(10)));
console.log("          100  -> ", f(x(100)));
console.log("");

var x = d3.scale.log().invert;
console.log("domain([1, 10]).range([0, 1]).invert:");
console.log("            0  -> ", f(x(0)));
console.log("         0.01  -> ", f(x(0.01)));
console.log("          0.1  -> ", f(x(0.1)));
console.log("          0.5  -> ", f(x(0.5)));
console.log("            1  -> ", f(x(1)));
console.log("");

var x = d3.scale.log().domain([1, 2]);
console.log("domain([1, 2]).range([0, 1]):");
console.log("          0.5  -> ", f(x(0.5)));
console.log("          1.0  -> ", f(x(1.0)));
console.log("          1.5  -> ", f(x(1.5)));
console.log("          2.0  -> ", f(x(2.0)));
console.log("          2.5  -> ", f(x(2.5)));
console.log("");

var x = d3.scale.log().domain([1, 2]).invert;
console.log("domain([1, 2]).range([0, 1]).invert:");
console.log("            0  -> ", f(x(0)));
console.log("         0.01  -> ", f(x(0.01)));
console.log("          0.1  -> ", f(x(0.1)));
console.log("          0.5  -> ", f(x(0.5)));
console.log("            1  -> ", f(x(1)));
console.log("");

var x = d3.scale.log().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
console.log("domain([01/01/1990, 01/01/1991]).range([0, 1]):");
console.log("   10/20/1989  -> ", f(x(new Date(1989, 09, 20))));
console.log("   01/01/1990  -> ", f(x(new Date(1990, 00, 01))));
console.log("   03/15/1990  -> ", f(x(new Date(1990, 02, 15))));
console.log("   05/27/1990  -> ", f(x(new Date(1990, 04, 27))));
console.log("   01/01/1991  -> ", f(x(new Date(1991, 00, 01))));
console.log("   03/15/1991  -> ", f(x(new Date(1991, 02, 15))));
console.log("");

var x = d3.scale.log().domain([.1, 10]).range(["red", "blue"]);
console.log("domain([.1, 10]).range([\"red\", \"blue\"]):");
console.log("          0.1  -> ", x(0.1));
console.log("            1  -> ", x(1));
console.log("            5  -> ", x(5));
console.log("           10  -> ", x(10));
console.log("");

var x = d3.scale.log().domain([.1, 10]).range(["red", "blue"]).interpolate(d3.interpolateHsl);
console.log("domain([.1, 10]).range([\"red\", \"blue\"]).interpolate(hsl):");
console.log("          0.1  -> ", x(0.1));
console.log("            1  -> ", x(1));
console.log("            5  -> ", x(5));
console.log("           10  -> ", x(10));
console.log("");

var x = d3.scale.log();
console.log("nice():");
[
  [1.1, 10.9], [10.9, 1.1], [.7, 11.001], [123.1, 6.7], [0, .49],
  [.12, 1, 2.5, 3, 10.9]
].forEach(function(d) {
  var s = " [" + d.map(f) + " ]";
  while (s.length < 21) s += " ";
  console.log(" ", s + " -> ", x.domain(d).nice().domain().map(f).join(","));
});
console.log("");

var x = d3.scale.log(), f = x.tickFormat();
console.log("ticks:");
console.log("     [.1, 10]  -> ", x.ticks().map(f).join(", "));
console.log("    [.1, 100]  -> ", x.domain([.1, 100]).ticks().map(f).join(", "));
console.log("     [1, 100]  -> ", x.domain([1, 100]).ticks().map(f).join(", "));
console.log("   [-100, -1]  -> ", x.domain([-100, -1]).ticks().map(f).join(", "));
console.log("     [100, 1]  -> ", x.domain([100, 1]).ticks().map(f).join(", "));
console.log("");

var x = d3.scale.log().domain([1, 2]).clamp(true);
console.log("domain clamping:");
console.log("         over  -> ", f(x(4)));
console.log("        under  -> ", f(x(0)));
console.log("");
