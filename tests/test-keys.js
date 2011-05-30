require("./../lib/env-js/envjs/node");
require("./../d3");

function Abc() {
  this.a = 1;
  this.b = 2;
}

Abc.prototype.c = 1;

console.log("keys:");
console.log("  " + d3.keys({a: 1, b: 2}).sort());
console.log("");

console.log("inherited keys:");
console.log("  " + d3.keys(new Abc).sort());
console.log("");
