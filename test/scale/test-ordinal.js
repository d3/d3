require("./../../lib/env-js/envjs/node");
require("./../../d3");

var x = d3.scale.ordinal().range(["a", "b", "c"]);
console.log("range([a, b, c]):");
console.log("  0 -> " + x(0));
console.log("  1 -> " + x(1));
console.log("  2 -> " + x(2));
console.log("  3 -> " + x(3));
console.log("  4 -> " + x(4));
console.log("  5 -> " + x(5));
console.log("  6 -> " + x(6));
console.log("  0 -> " + x(0));
console.log("  1 -> " + x(1));
console.log("  2 -> " + x(2));
console.log("  3 -> " + x(3));
console.log("");

x.domain([]);
console.log("domain([]).range([a, b, c]):");
console.log("  1 -> " + x(1));
console.log("  2 -> " + x(2));
console.log("  3 -> " + x(3));
console.log("  0 -> " + x(0));
console.log("  1 -> " + x(1));
console.log("  2 -> " + x(2));
console.log("");

var x = d3.scale.ordinal().domain(["a", "b", "c"]).rangePoints([0, 120]);
console.log("domain([a, b, c]).rangePoints([0, 120]):");
console.log("  a -> " + x("a"));
console.log("  b -> " + x("b"));
console.log("  c -> " + x("c"));
console.log("  d -> " + x("d"));
console.log("");

var x = d3.scale.ordinal().rangePoints([0, 120]).domain(["a", "b", "c"]);
console.log("rangePoints([0, 120]).domain([a, b, c]):");
console.log("  a -> " + x("a"));
console.log("  b -> " + x("b"));
console.log("  c -> " + x("c"));
console.log("  d -> " + x("d"));
console.log("");

var x = d3.scale.ordinal().domain(["a", "b", "c"]).rangeBands([0, 120]);
console.log("domain([a, b, c]).rangeBands([0, 120]):");
console.log("  rangeBand: " + x.rangeBand());
console.log("  a -> " + x("a"));
console.log("  b -> " + x("b"));
console.log("  c -> " + x("c"));
console.log("  d -> " + x("d"));
console.log("");

var x = d3.scale.ordinal().rangeBands([0, 120]).domain(["a", "b", "c"]);
console.log("rangeBands([0, 120]).domain([a, b, c]):");
console.log("  rangeBand: " + x.rangeBand());
console.log("  a -> " + x("a"));
console.log("  b -> " + x("b"));
console.log("  c -> " + x("c"));
console.log("  d -> " + x("d"));
console.log("");

var x = d3.scale.ordinal().domain(["a", "b", "c"]).rangeRoundBands([0, 119]);
console.log("domain([a, b, c]).rangeRoundBands([0, 119]):");
console.log("  rangeBand: " + x.rangeBand());
console.log("  a -> " + x("a"));
console.log("  b -> " + x("b"));
console.log("  c -> " + x("c"));
console.log("  d -> " + x("d"));
console.log("");

var x = d3.scale.ordinal().rangeRoundBands([0, 119]).domain(["a", "b", "c"]);
console.log("rangeRoundBands([0, 119]).domain([a, b, c]):");
console.log("  rangeBand: " + x.rangeBand());
console.log("  a -> " + x("a"));
console.log("  b -> " + x("b"));
console.log("  c -> " + x("c"));
console.log("  d -> " + x("d"));
console.log("");
