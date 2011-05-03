require("./../lib/env-js/envjs/node");
require("./../d3");

Object.prototype.foo = 1;
var obj = {a: 1, b: 2},
    keys = d3.keys(obj);
keys.sort();
delete Object.prototype.foo;

console.log("keys:");
console.log("  " + keys);
console.log("");
