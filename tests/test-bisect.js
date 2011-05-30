require("./../lib/env-js/envjs/node");
require("./../d3");

var a = [1,2,3,4],
    l = d3.bisectLeft,
    r = d3.bisectRight;

console.log("exact match:");
console.log("    -1 ->", l(a, -1), r(a, -1));
console.log("     0 ->", l(a, 0), r(a, 0));
console.log("     1 ->", l(a, 1), r(a, 1));
console.log("     2 ->", l(a, 2), r(a, 2));
console.log("     3 ->", l(a, 3), r(a, 3));
console.log("     4 ->", l(a, 4), r(a, 4));
console.log("     5 ->", l(a, 5), r(a, 5));
console.log("");

console.log("non-exact match:");
console.log("   -.1 ->", l(a, -.1), r(a, -.1));
console.log("    .1 ->", l(a, .1), r(a, .1));
console.log("   1.1 ->", l(a, 1.1), r(a, 1.1));
console.log("   2.1 ->", l(a, 2.1), r(a, 2.1));
console.log("   3.1 ->", l(a, 3.1), r(a, 3.1));
console.log("   4.1 ->", l(a, 4.1), r(a, 4.1));
console.log("   5.1 ->", l(a, 5.1), r(a, 5.1));
console.log("");

console.log("weird values:");
console.log("        NaN ->", l(a, NaN), r(a, NaN));
console.log("   Infinity ->", l(a, Infinity), r(a, Infinity));
console.log("  -Infinity ->", l(a, -Infinity), r(a, -Infinity));
console.log("");

console.log("d3.bisect === d3.bisectRight:");
console.log("  ", d3.bisect === r);
console.log("");

console.log("lo:");
console.log("    -1 ->", l(a, -1, 2), r(a, -1, 2));
console.log("     0 ->", l(a, 0, 2), r(a, 0, 2));
console.log("     1 ->", l(a, 1, 2), r(a, 1, 2));
console.log("     2 ->", l(a, 2, 2), r(a, 2, 2));
console.log("     3 ->", l(a, 3, 2), r(a, 3, 2));
console.log("     4 ->", l(a, 4, 2), r(a, 4, 2));
console.log("     5 ->", l(a, 5, 2), r(a, 5, 2));
console.log("");

console.log("hi:");
console.log("    -1 ->", l(a, -1, 0, 2), r(a, -1, 0, 2));
console.log("     0 ->", l(a, 0, 0, 2), r(a, 0, 0, 2));
console.log("     1 ->", l(a, 1, 0, 2), r(a, 1, 0, 2));
console.log("     2 ->", l(a, 2, 0, 2), r(a, 2, 0, 2));
console.log("     3 ->", l(a, 3, 0, 2), r(a, 3, 0, 2));
console.log("     4 ->", l(a, 4, 0, 2), r(a, 4, 0, 2));
console.log("     5 ->", l(a, 5, 0, 2), r(a, 5, 0, 2));
console.log("");

console.log("lo and hi:");
console.log("    -1 ->", l(a, -1, 1, 3), r(a, -1, 1, 3));
console.log("     0 ->", l(a, 0, 1, 3), r(a, 0, 1, 3));
console.log("     1 ->", l(a, 1, 1, 3), r(a, 1, 1, 3));
console.log("     2 ->", l(a, 2, 1, 3), r(a, 2, 1, 3));
console.log("     3 ->", l(a, 3, 1, 3), r(a, 3, 1, 3));
console.log("     4 ->", l(a, 4, 1, 3), r(a, 4, 1, 3));
console.log("     5 ->", l(a, 5, 1, 3), r(a, 5, 1, 3));
console.log("");
