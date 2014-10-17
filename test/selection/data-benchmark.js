var d3 = require("../../");

var formatNumber = d3.format(",.02r"),
    values = d3.range(0, 1000),
    key = function(x) { return x; },
    div = d3.select("html").append("div"),
    selection,
    n = 1e3,
    then = Date.now();

selection = div.selectAll("div");

for (var i = 0; i < n; i++) {
  selection.data(values, key);
}

console.log("selection.data(values, key) (enter) " + formatNumber((Date.now() - then) / i) + "ms/op.");

selection.data(values, key)
  .enter().append("div");

selection = div.selectAll("div");
then = Date.now();

for (var i = 0; i < n; i++) {
  selection.data(values, key);
}

console.log("selection.data(values, key) (update) " + formatNumber((Date.now() - then) / i) + "ms/op.");
