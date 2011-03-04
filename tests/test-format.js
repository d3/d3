require("./../lib/env-js/envjs/node");
require("./../d3");

console.log("zero fill:");
console.log("  ", d3.format("08d")(0));
console.log("  ", d3.format("08d")(42));
console.log("  ", d3.format("08d")(42000000));
console.log("  ", d3.format("08d")(420000000));
console.log("  ", d3.format("08d")(-4));
console.log("  ", d3.format("08d")(-42));
console.log("  ", d3.format("08d")(-4200000));
console.log("  ", d3.format("08d")(-42000000));
console.log("");

console.log("space fill:");
console.log("  ", d3.format("8d")(0));
console.log("  ", d3.format("8d")(42));
console.log("  ", d3.format("8d")(42000000));
console.log("  ", d3.format("8d")(420000000));
console.log("  ", d3.format("8d")(-4));
console.log("  ", d3.format("8d")(-42));
console.log("  ", d3.format("8d")(-4200000));
console.log("  ", d3.format("8d")(-42000000));
console.log("");

// TODO fill with other characters (requires align support)

console.log("grouping:");
console.log("  ", d3.format(",d")(0));
console.log("  ", d3.format(",d")(42));
console.log("  ", d3.format(",d")(42000000));
console.log("  ", d3.format(",d")(420000000));
console.log("  ", d3.format(",d")(-4));
console.log("  ", d3.format(",d")(-42));
console.log("  ", d3.format(",d")(-4200000));
console.log("  ", d3.format(",d")(-42000000));
console.log("");

console.log("grouping with zero fill:");
console.log("  ", d3.format("01,d")(0));
console.log("  ", d3.format("01,d")(0));
console.log("  ", d3.format("02,d")(0));
console.log("  ", d3.format("03,d")(0));
console.log("  ", d3.format("05,d")(0));
console.log("  ", d3.format("08,d")(0));
console.log("  ", d3.format("013,d")(0));
console.log("  ", d3.format("021,d")(0));
console.log("");

console.log("grouping with zero fill (overflow):");
console.log("  ", d3.format("01,d")(1));
console.log("  ", d3.format("01,d")(1));
console.log("  ", d3.format("02,d")(12));
console.log("  ", d3.format("03,d")(123));
console.log("  ", d3.format("05,d")(12345));
console.log("  ", d3.format("08,d")(12345678));
console.log("  ", d3.format("013,d")(1234567890123));
console.log("");

console.log("grouping with space fill:");
console.log("  ", d3.format("1,d")(0));
console.log("  ", d3.format("1,d")(0));
console.log("  ", d3.format("2,d")(0));
console.log("  ", d3.format("3,d")(0));
console.log("  ", d3.format("5,d")(0));
console.log("  ", d3.format("8,d")(0));
console.log("  ", d3.format("13,d")(0));
console.log("  ", d3.format("21,d")(0));
console.log("");

console.log("grouping with space fill (overflow):");
console.log("  ", d3.format("1,d")(1));
console.log("  ", d3.format("1,d")(1));
console.log("  ", d3.format("2,d")(12));
console.log("  ", d3.format("3,d")(123));
console.log("  ", d3.format("5,d")(12345));
console.log("  ", d3.format("8,d")(12345678));
console.log("  ", d3.format("13,d")(1234567890123));
console.log("");

console.log("precision:");
console.log("  ", d3.format(".1f")(0.49));
console.log("  ", d3.format(".2f")(0.449));
console.log("  ", d3.format(".3f")(0.4449));
console.log("  ", d3.format(".5f")(0.444449));
console.log("  ", d3.format(".1f")(100));
console.log("  ", d3.format(".2f")(100));
console.log("  ", d3.format(".3f")(100));
console.log("  ", d3.format(".5f")(100));
console.log("");

console.log("precision and grouping with space fill:");
console.log("  ", d3.format("10,.1f")(123456.49));
console.log("  ", d3.format("10,.2f")(1234567.449));
console.log("  ", d3.format("10,.3f")(12345678.4449));
console.log("  ", d3.format("10,.5f")(123456789.444449));
console.log("  ", d3.format("10,.1f")(123456));
console.log("  ", d3.format("10,.2f")(1234567));
console.log("  ", d3.format("10,.3f")(12345678));
console.log("  ", d3.format("10,.5f")(123456789));
console.log("");

console.log("float type passed int:");
console.log("  ", d3.format("f")(42));
console.log("");

console.log("int type passed float:");
console.log("  ", d3.format("d")(4.2));
console.log("");
