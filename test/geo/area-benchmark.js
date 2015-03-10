var d3 = require("../../");

var formatNumber = d3.format(",.02r"),
    o = d3.geo.circle().angle(30).precision(.1)(),
    n = 1e3,
    then = Date.now();

for (var i = 0; i < n; i++) {
  d3.geo.area(o);
}

console.log("circle.angle(30°): " + formatNumber((Date.now() - then) / i) + "ms/op.");
