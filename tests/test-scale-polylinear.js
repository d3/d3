require("./../lib/env-js/envjs/node");
require("./../d3");

var x = d3.scale.linear().domain([-1, 0, 1]).range(["red", "white", "green"]);
console.log("domain([-1, 0, 1]).range([\"red\", \"white\", \"green\"]):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("");
