require("./../lib/env-js/envjs/node");
require("./../d3");

var f = d3.format(" .3f");

var x = d3.scale.linear().domain([-1, 0, 1]).range(["red", "white", "green"]);
console.log("domain(-1, 0, 1).range(red, white, green):");
console.log("         -1.0 -> " + x(-1));
console.log("         -0.8 -> " + x(-.8));
console.log("         -0.6 -> " + x(-.6));
console.log("         -0.4 -> " + x(-.4));
console.log("         -0.2 -> " + x(-.2));
console.log("          0.0 -> " + x(0));
console.log("          0.2 -> " + x(.2));
console.log("          0.4 -> " + x(.4));
console.log("          0.6 -> " + x(.6));
console.log("          0.8 -> " + x(.8));
console.log("          1.0 -> " + x(1));
console.log("");

var x = d3.scale.linear().domain([-1, 0, 1]).range([-100, 0, 10]);
console.log("domain(-1, 0, 1).range(-100, 0, 10):");
console.log("         -1.5 -> " + f(x(-1.5)));
console.log("         -1.0 -> " + f(x(-1)));
console.log("         -0.5 -> " + f(x(-.5)));
console.log("          0.0 -> " + f(x(0)));
console.log("          0.5 -> " + f(x(.5)));
console.log("          1.0 -> " + f(x(1)));
console.log("          1.5 -> " + f(x(1.5)));
console.log("");

var x = d3.scale.linear();
[[1.1, 1, 2, 3, 10.9], [123.1, 1, 2, 3, -.9]].forEach(function(d) {
  console.log("domain([" + d.map(f) + " ]).nice():");
  console.log("  ", x.domain(d).nice().domain());
  console.log("");
});
