require("./../lib/env-js/envjs/node");
require("./../d3");

var f = d3.format(" .3f");

var x = d3.scale.linear();
console.log("domain([0, 1]).range([0, 1]):");
console.log("         -0.5  -> ", f(x(-0.5)));
console.log("          0.0  -> ", f(x(0.0)));
console.log("          0.5  -> ", f(x(0.5)));
console.log("          1.0  -> ", f(x(1.0)));
console.log("          1.5  -> ", f(x(1.5)));
console.log("");

var x = d3.scale.linear().domain([1, 2]);
console.log("domain([1, 2]).range([0, 1]):");
console.log("          0.5  -> ", f(x(0.5)));
console.log("          1.0  -> ", f(x(1.0)));
console.log("          1.5  -> ", f(x(1.5)));
console.log("          2.0  -> ", f(x(2.0)));
console.log("          2.5  -> ", f(x(2.5)));
console.log("");

var x = d3.scale.linear().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
console.log("domain([01/01/1990, 01/01/1991]).range([0, 1]):");
console.log("   10/20/1989  -> ", f(x(new Date(1989, 09, 20))));
console.log("   01/01/1990  -> ", f(x(new Date(1990, 00, 01))));
console.log("   03/15/1990  -> ", f(x(new Date(1990, 02, 15))));
console.log("   05/27/1990  -> ", f(x(new Date(1990, 04, 27))));
console.log("   01/01/1991  -> ", f(x(new Date(1991, 00, 01))));
console.log("   03/15/1991  -> ", f(x(new Date(1991, 02, 15))));
console.log("");

var x = d3.scale.linear().range(["red", "blue"]);
console.log("domain([0, 1]).range([\"red\", \"blue\"]):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.scale.linear().range(["red", "blue"]).interpolate(d3.interpolateHsl);
console.log("domain([0, 1]).range([\"red\", \"blue\"]).interpolate(hsl):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.scale.linear();
console.log("domain coercion:");
console.log("       String  -> ", x.domain(["1", "2"]).domain());
console.log("         Date  -> ", x.domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]).domain());
console.log("       Number  -> ", x.domain([new Number(41), new Number(42)]).domain());
console.log("");

var x = d3.scale.linear();
console.log("domain coercion, invert:");
console.log("       String  -> ", x.domain(["0", "2"]).invert(.5));
console.log("         Date  -> ", x.domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]).invert(.5));
console.log("       Number  -> ", x.domain([new Number(0), new Number(42)]).invert(.5));
console.log("");

var x = d3.scale.linear();
console.log("range coercion, invert:");
console.log("       String  -> ", x.range(["0", "2"]).invert("1"));
console.log("         Date  -> ", x.range([new Date(1990, 0, 1), new Date(1991, 0, 1)]).invert(new Date(1990, 6, 2, 13)));
console.log("       Number  -> ", x.range([new Number(0), new Number(42)]).invert(new Number(21)));
console.log("          ???  -> ", x.range(["#000", "#fff"]).invert("#999")); // can't be coerced
console.log("");

var x = d3.scale.linear();
console.log("ticks:");
console.log("            1  -> ", x.ticks(1).map(x.tickFormat(1)).join(", "));
console.log("            2  -> ", x.ticks(2).map(x.tickFormat(2)).join(", "));
console.log("            5  -> ", x.ticks(5).map(x.tickFormat(5)).join(", "));
console.log("           10  -> ", x.ticks(10).map(x.tickFormat(10)).join(", "));
console.log("");

var x = d3.scale.linear().domain([1, 0]);
console.log("descending ticks:");
console.log("            1  -> ", x.ticks(1).map(x.tickFormat(1)).join(", "));
console.log("            2  -> ", x.ticks(2).map(x.tickFormat(2)).join(", "));
console.log("            5  -> ", x.ticks(5).map(x.tickFormat(5)).join(", "));
console.log("           10  -> ", x.ticks(10).map(x.tickFormat(10)).join(", "));
console.log("");

var x = d3.scale.linear().clamp(true);
console.log("domain clamping:")
console.log("   inspection  -> ", x.clamp());
console.log("        under  -> ", x(-1));
console.log("         over  -> ", x(2));
console.log("");

var x = d3.scale.linear().domain([1, 0]).clamp(true);
console.log("domain clamping reversed:")
console.log("        under  -> ", x(-1));
console.log("         over  -> ", x(2));
console.log("");

var x = d3.scale.linear().clamp(false);
console.log("domain unclamping:")
console.log("        under  -> ", x(-1));
console.log("         over  -> ", x(11));
console.log("");

var x = d3.scale.linear();
console.log("nice():");
[[1.1, 10.9], [10.9, 1.1], [.7, 11.001], [123.1, 6.7], [0, .49]].forEach(function(d) {
  var s = " [" + d.map(f) + " ]";
  while (s.length < 21) s += " ";
  console.log(" ", s + " -> ", x.domain(d).nice().domain().map(f).join(","));
});
console.log("");
