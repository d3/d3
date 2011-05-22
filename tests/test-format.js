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

console.log("grouping with general notation:");
console.log("  ", d3.format(",g")(0));
console.log("  ", d3.format(",g")(42));
console.log("  ", d3.format(",g")(42000000));
console.log("  ", d3.format(",g")(420000000));
console.log("  ", d3.format(",g")(-4));
console.log("  ", d3.format(",g")(-42));
console.log("  ", d3.format(",g")(-4200000));
console.log("  ", d3.format(",g")(-42000000));
console.log("");

console.log("precision (fixed-point notation):");
console.log("  ", d3.format(".1f")(0.49));
console.log("  ", d3.format(".2f")(0.449));
console.log("  ", d3.format(".3f")(0.4449));
console.log("  ", d3.format(".5f")(0.444449));
console.log("  ", d3.format(".1f")(100));
console.log("  ", d3.format(".2f")(100));
console.log("  ", d3.format(".3f")(100));
console.log("  ", d3.format(".5f")(100));
console.log("");

console.log("precision (significant digits):");
console.log("  ", d3.format(".1g")(0.049));
console.log("  ", d3.format(".1g")(0.49));
console.log("  ", d3.format(".2g")(0.449));
console.log("  ", d3.format(".3g")(0.4449));
console.log("  ", d3.format(".5g")(0.444449));
console.log("  ", d3.format(".1g")(100));
console.log("  ", d3.format(".2g")(100));
console.log("  ", d3.format(".3g")(100));
console.log("  ", d3.format(".5g")(100));
console.log("  ", d3.format(".5g")(100.2));
console.log("  ", d3.format(".2g")(0.002));
console.log("");

console.log("precision and rounding (significant digits):");
console.log("  ", d3.format(".1r")(0.049));
console.log("  ", d3.format(".1r")(0.49));
console.log("  ", d3.format(".2r")(0.449));
console.log("  ", d3.format(".3r")(0.4449));
console.log("  ", d3.format(".5r")(0.444449));
console.log("  ", d3.format("r")(123.45));
console.log("  ", d3.format(".1r")(123.45));
console.log("  ", d3.format(".2r")(123.45));
console.log("  ", d3.format(".3r")(123.45));
console.log("  ", d3.format(".4r")(123.45));
console.log("  ", d3.format(".5r")(123.45));
console.log("  ", d3.format(".6r")(123.45));
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
console.log(d3.format("d")(4.2));
console.log("");

console.log("number:");
console.log("  ", d3.format("n")(.0042));
console.log("  ", d3.format("n")(.42));
console.log("  ", d3.format("n")(0));
console.log("  ", d3.format("n")(42));
console.log("  ", d3.format("n")(42000000));
console.log("  ", d3.format("n")(420000000));
console.log("  ", d3.format("n")(-4));
console.log("  ", d3.format("n")(-42));
console.log("  ", d3.format("n")(-4200000));
console.log("  ", d3.format("n")(-42000000));
console.log("");

console.log("percentage:");
console.log("  ", d3.format("%")(0));
console.log("  ", d3.format("%")(.042));
console.log("  ", d3.format("%")(.42));
console.log("  ", d3.format("%")(4.2));
console.log("  ", d3.format("%")(-.042));
console.log("  ", d3.format("%")(-.42));
console.log("  ", d3.format("%")(-4.2));
console.log("");

console.log("percentage with rounding and sign:");
console.log("  ", d3.format("+.2p")(.00123));
console.log("  ", d3.format("+.2p")(.0123));
console.log("  ", d3.format("+.2p")(.123));
console.log("  ", d3.format("+.2p")(1.23));
console.log("  ", d3.format("+.2p")(-.00123));
console.log("  ", d3.format("+.2p")(-.0123));
console.log("  ", d3.format("+.2p")(-.123));
console.log("  ", d3.format("+.2p")(-1.23));
console.log("");

console.log("exponent:");
console.log("  ", d3.format("e")(0));
console.log("  ", d3.format("e")(42));
console.log("  ", d3.format("e")(42000000));
console.log("  ", d3.format("e")(420000000));
console.log("  ", d3.format("e")(-4));
console.log("  ", d3.format("e")(-42));
console.log("  ", d3.format("e")(-4200000));
console.log("  ", d3.format("e")(-42000000));
console.log("");
