require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.stats");

var data = [1, 2, 3, 4, 5, 6];

for (var i = 0; i <= data.length; i++) {
  var d = data.slice(0, i);
  console.log("iqr [" + d + "]:");
  console.log("  ", d3.stats.iqr(d));
  console.log("");
}
