require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.format");

suite.addBatch({
  "format": {
    topic: function() {
      return d3.format;
    },
    "returns a string": function(format) {
      assert.isString(format("d")(0));
    },
    "can zero fill": function(format) {
      var f = format("08d");
      assert.strictEqual(f(0), "00000000");
      assert.strictEqual(f(42), "00000042");
      assert.strictEqual(f(42000000), "42000000");
      assert.strictEqual(f(420000000), "420000000");
      assert.strictEqual(f(-4), "-0000004");
      assert.strictEqual(f(-42), "-0000042");
      assert.strictEqual(f(-4200000), "-4200000");
      assert.strictEqual(f(-42000000), "-42000000");
    },
    "can space fill": function(format) {
      var f = format("8d");
      assert.strictEqual(f(0), "       0");
      assert.strictEqual(f(42), "      42");
      assert.strictEqual(f(42000000), "42000000");
      assert.strictEqual(f(420000000), "420000000");
      assert.strictEqual(f(-4), "      -4");
      assert.strictEqual(f(-42), "     -42");
      assert.strictEqual(f(-4200000), "-4200000");
      assert.strictEqual(f(-42000000), "-42000000");
    },
    "can output fixed-point notation": function(format) {
      assert.strictEqual(format(".1f")(0.49), "0.5");
      assert.strictEqual(format(".2f")(0.449), "0.45");
      assert.strictEqual(format(".3f")(0.4449), "0.445");
      assert.strictEqual(format(".5f")(0.444449), "0.44445");
      assert.strictEqual(format(".1f")(100), "100.0");
      assert.strictEqual(format(".2f")(100), "100.00");
      assert.strictEqual(format(".3f")(100), "100.000");
      assert.strictEqual(format(".5f")(100), "100.00000");
    },
    "can output general notation": function(format) {
      assert.strictEqual(format(".1g")(0.049), "0.05");
      assert.strictEqual(format(".1g")(0.49), "0.5");
      assert.strictEqual(format(".2g")(0.449), "0.45");
      assert.strictEqual(format(".3g")(0.4449), "0.445");
      assert.strictEqual(format(".5g")(0.444449), "0.44445");
      assert.strictEqual(format(".1g")(100), "1e+2");
      assert.strictEqual(format(".2g")(100), "1.0e+2");
      assert.strictEqual(format(".3g")(100), "100");
      assert.strictEqual(format(".5g")(100), "100.00");
      assert.strictEqual(format(".5g")(100.2), "100.20");
      assert.strictEqual(format(".2g")(0.002), "0.0020");
    },
    "can output exponent notation ": function(format) {
      var f = format("e");
      assert.strictEqual(f(0), "0e+0");
      assert.strictEqual(f(42), "4.2e+1");
      assert.strictEqual(f(42000000), "4.2e+7");
      assert.strictEqual(f(420000000), "4.2e+8");
      assert.strictEqual(f(-4), "-4e+0");
      assert.strictEqual(f(-42), "-4.2e+1");
      assert.strictEqual(f(-4200000), "-4.2e+6");
      assert.strictEqual(f(-42000000), "-4.2e+7");
    },
    "can output SI prefix notation": function(format) {
      var f = format("s");
      assert.strictEqual(f(0), "0");
      assert.strictEqual(f(1), "1");
      assert.strictEqual(f(10), "10");
      assert.strictEqual(f(100), "100");
      assert.strictEqual(f(999.5), "999.5");
      assert.strictEqual(f(999500), "999.5k");
      assert.strictEqual(f(1000), "1k");
      assert.strictEqual(f(1400), "1.4k");
      assert.strictEqual(f(1500.5), "1.5005k");
      assert.strictEqual(f(.000001), "1µ");
    },
    "can output SI prefix notation with appropriate rounding": function(format) {
      var f = format(".3s");
      assert.strictEqual(f(0), "0.00");
      assert.strictEqual(f(1), "1.00");
      assert.strictEqual(f(10), "10.0");
      assert.strictEqual(f(100), "100");
      assert.strictEqual(f(999.5), "1.00k");
      assert.strictEqual(f(999500), "1.00M");
      assert.strictEqual(f(1000), "1.00k");
      assert.strictEqual(f(1500.5), "1.50k");
      assert.strictEqual(f(145500000), "146M");
      assert.strictEqual(f(145999999.999999347), "146M");
      assert.strictEqual(f(1e26), "100Y");
      assert.strictEqual(f(.000001), "1.00µ");
      assert.strictEqual(f(.009995), "0.0100");
      var f = format(".4s");
      assert.strictEqual(f(999.5), "999.5");
      assert.strictEqual(f(999500), "999.5k");
      assert.strictEqual(f(.009995), "9.995m");
    },
    "can output a percentage": function(format) {
      var f = format("%");
      assert.strictEqual(f(0), "0%");
      assert.strictEqual(f(.042), "4%");
      assert.strictEqual(f(.42), "42%");
      assert.strictEqual(f(4.2), "420%");
      assert.strictEqual(f(-.042), "-4%");
      assert.strictEqual(f(-.42), "-42%");
      assert.strictEqual(f(-4.2), "-420%");
    },
    "can output a percentage with rounding and sign": function(format) {
      var f = format("+.2p");
      assert.strictEqual(f(.00123), "+0.12%");
      assert.strictEqual(f(.0123), "+1.2%");
      assert.strictEqual(f(.123), "+12%");
      assert.strictEqual(f(1.23), "+120%");
      assert.strictEqual(f(-.00123), "-0.12%");
      assert.strictEqual(f(-.0123), "-1.2%");
      assert.strictEqual(f(-.123), "-12%");
      assert.strictEqual(f(-1.23), "-120%");
    },
    "can round to significant digits": function(format) {
      assert.strictEqual(format(".2r")(0), "0.0");
      assert.strictEqual(format(".1r")(0.049), "0.05");
      assert.strictEqual(format(".1r")(-0.049), "-0.05");
      assert.strictEqual(format(".1r")(0.49), "0.5");
      assert.strictEqual(format(".1r")(-0.49), "-0.5");
      assert.strictEqual(format(".2r")(0.449), "0.45");
      assert.strictEqual(format(".3r")(0.4449), "0.445");
      assert.strictEqual(format(".3r")(1.00), "1.00");
      assert.strictEqual(format(".3r")(0.9995), "1.00");
      assert.strictEqual(format(".5r")(0.444449), "0.44445");
      assert.strictEqual(format("r")(123.45), "123.45");
      assert.strictEqual(format(".1r")(123.45), "100");
      assert.strictEqual(format(".2r")(123.45), "120");
      assert.strictEqual(format(".3r")(123.45), "123");
      assert.strictEqual(format(".4r")(123.45), "123.5");
      assert.strictEqual(format(".5r")(123.45), "123.45");
      assert.strictEqual(format(".6r")(123.45), "123.450");
      assert.strictEqual(format(".1r")(.9), "0.9");
      assert.strictEqual(format(".1r")(.09), "0.09");
      assert.strictEqual(format(".1r")(.949), "0.9");
      assert.strictEqual(format(".1r")(.0949), "0.09");
      assert.strictEqual(format(".10r")(.9999999999), "0.9999999999");
      assert.strictEqual(format(".15r")(.999999999999999), "0.999999999999999");
    },
    "can round very small numbers": function(format) {
      var f = format(".2r");
      assert.strictEqual(f(1e-22), "0.00000000000000000000");
    },
    "can group thousands": function(format) {
      var f = format(",d");
      assert.strictEqual(f(0), "0");
      assert.strictEqual(f(42), "42");
      assert.strictEqual(f(42000000), "42,000,000");
      assert.strictEqual(f(420000000), "420,000,000");
      assert.strictEqual(f(-4), "-4");
      assert.strictEqual(f(-42), "-42");
      assert.strictEqual(f(-4200000), "-4,200,000");
      assert.strictEqual(f(-42000000), "-42,000,000");
    },
    "can group thousands and zero fill": function(format) {
      assert.strictEqual(format("01,d")(0), "0");
      assert.strictEqual(format("01,d")(0), "0");
      assert.strictEqual(format("02,d")(0), "00");
      assert.strictEqual(format("03,d")(0), "000");
      assert.strictEqual(format("05,d")(0), "0,000");
      assert.strictEqual(format("08,d")(0), "0,000,000");
      assert.strictEqual(format("013,d")(0), "0,000,000,000");
      assert.strictEqual(format("021,d")(0), "0,000,000,000,000,000");
      assert.strictEqual(format("013,d")(-42000000), "-0,042,000,000");
    },
    "can group thousands and zero fill with overflow": function(format) {
      assert.strictEqual(format("01,d")(1), "1");
      assert.strictEqual(format("01,d")(1), "1");
      assert.strictEqual(format("02,d")(12), "12");
      assert.strictEqual(format("03,d")(123), "123");
      assert.strictEqual(format("05,d")(12345), "12,345");
      assert.strictEqual(format("08,d")(12345678), "12,345,678");
      assert.strictEqual(format("013,d")(1234567890123), "1,234,567,890,123");
    },
    "can group thousands and space fill": function(format) {
      assert.strictEqual(format("1,d")(0), "0");
      assert.strictEqual(format("1,d")(0), "0");
      assert.strictEqual(format("2,d")(0), " 0");
      assert.strictEqual(format("3,d")(0), "  0");
      assert.strictEqual(format("5,d")(0), "    0");
      assert.strictEqual(format("8,d")(0), "       0");
      assert.strictEqual(format("13,d")(0), "            0");
      assert.strictEqual(format("21,d")(0), "                    0");
    },
    "can group thousands and space fill with overflow": function(format) {
      assert.strictEqual(format("1,d")(1), "1");
      assert.strictEqual(format("1,d")(1), "1");
      assert.strictEqual(format("2,d")(12), "12");
      assert.strictEqual(format("3,d")(123), "123");
      assert.strictEqual(format("5,d")(12345), "12,345");
      assert.strictEqual(format("8,d")(12345678), "12,345,678");
      assert.strictEqual(format("13,d")(1234567890123), "1,234,567,890,123");
    },
    "can group thousands with general notation": function(format) {
      var f = format(",g");
      assert.strictEqual(f(0), "0");
      assert.strictEqual(f(42), "42");
      assert.strictEqual(f(42000000), "42,000,000");
      assert.strictEqual(f(420000000), "420,000,000");
      assert.strictEqual(f(-4), "-4");
      assert.strictEqual(f(-42), "-42");
      assert.strictEqual(f(-4200000), "-4,200,000");
      assert.strictEqual(f(-42000000), "-42,000,000");
    },
    "can group thousands, space fill, and round to significant digits": function(format) {
      assert.strictEqual(format("10,.1f")(123456.49), " 123,456.5");
      assert.strictEqual(format("10,.2f")(1234567.449), "1,234,567.45");
      assert.strictEqual(format("10,.3f")(12345678.4449), "12,345,678.445");
      assert.strictEqual(format("10,.5f")(123456789.444449), "123,456,789.44445");
      assert.strictEqual(format("10,.1f")(123456), " 123,456.0");
      assert.strictEqual(format("10,.2f")(1234567), "1,234,567.00");
      assert.strictEqual(format("10,.3f")(12345678), "12,345,678.000");
      assert.strictEqual(format("10,.5f")(123456789), "123,456,789.00000");
    },
    "can display integers in fixed-point notation": function(format) {
      assert.strictEqual(format("f")(42), "42");
    },
    "will not display non-integers in integer format": function(format) {
      assert.strictEqual(format("d")(4.2), "");
    },
    "unicode character": function(format) {
      assert.strictEqual(format("c")(9731), "☃");
    },
    "binary": function(format) {
      assert.strictEqual(format("b")(10), "1010");
    },
    "binary with prefix": function(format) {
      assert.strictEqual(format("#b")(10), "0b1010");
    },
    "octal": function(format) {
      assert.strictEqual(format("o")(10), "12");
    },
    "octal with prefix": function(format) {
      assert.strictEqual(format("#o")(10), "0o12");
    },
    "hexadecimal (lowercase)": function(format) {
      assert.strictEqual(format("x")(3735928559), "deadbeef");
    },
    "hexadecimal (lowercase) with prefix": function(format) {
      assert.strictEqual(format("#x")(3735928559), "0xdeadbeef");
    },
    "hexadecimal (uppercase)": function(format) {
      assert.strictEqual(format("X")(3735928559), "DEADBEEF");
    },
    "hexadecimal (uppercase) with prefix": function(format) {
      assert.strictEqual(format("#X")(3735928559), "0xDEADBEEF");
    },
    "fill respects prefix": function(format) {
      assert.strictEqual(format("#20x")(3735928559), "          0xdeadbeef");
    },
    "align left": function(format) {
      assert.strictEqual(format("<1,d")(0), "0");
      assert.strictEqual(format("<1,d")(0), "0");
      assert.strictEqual(format("<2,d")(0), "0 ");
      assert.strictEqual(format("<3,d")(0), "0  ");
      assert.strictEqual(format("<5,d")(0), "0    ");
      assert.strictEqual(format("<8,d")(0), "0       ");
      assert.strictEqual(format("<13,d")(0), "0            ");
      assert.strictEqual(format("<21,d")(0), "0                    ");
    },
    "align right": function(format) {
      assert.strictEqual(format(">1,d")(0), "0");
      assert.strictEqual(format(">1,d")(0), "0");
      assert.strictEqual(format(">2,d")(0), " 0");
      assert.strictEqual(format(">3,d")(0), "  0");
      assert.strictEqual(format(">5,d")(0), "    0");
      assert.strictEqual(format(">8,d")(0), "       0");
      assert.strictEqual(format(">13,d")(0), "            0");
      assert.strictEqual(format(">21,d")(0), "                    0");
    },
    "align center": function(format) {
      assert.strictEqual(format("^1,d")(0), "0");
      assert.strictEqual(format("^1,d")(0), "0");
      assert.strictEqual(format("^2,d")(0), " 0");
      assert.strictEqual(format("^3,d")(0), " 0 ");
      assert.strictEqual(format("^5,d")(0), "  0  ");
      assert.strictEqual(format("^8,d")(0), "    0   ");
      assert.strictEqual(format("^13,d")(0), "      0      ");
      assert.strictEqual(format("^21,d")(0), "          0          ");
    },
    "pad after sign": function(format) {
      assert.strictEqual(format("=+1,d")(0), "+0");
      assert.strictEqual(format("=+1,d")(0), "+0");
      assert.strictEqual(format("=+2,d")(0), "+0");
      assert.strictEqual(format("=+3,d")(0), "+ 0");
      assert.strictEqual(format("=+5,d")(0), "+   0");
      assert.strictEqual(format("=+8,d")(0), "+      0");
      assert.strictEqual(format("=+13,d")(0), "+           0");
      assert.strictEqual(format("=+21,d")(0), "+                   0");
    },
    "a space can denote positive numbers": function(format) {
      assert.strictEqual(format(" 1,d")(-1), "-1");
      assert.strictEqual(format(" 1,d")(0), " 0");
      assert.strictEqual(format(" 2,d")(0), " 0");
      assert.strictEqual(format(" 3,d")(0), "  0");
      assert.strictEqual(format(" 5,d")(0), "    0");
      assert.strictEqual(format(" 8,d")(0), "       0");
      assert.strictEqual(format(" 13,d")(0), "            0");
      assert.strictEqual(format(" 21,d")(0), "                    0");
    },
    "can format negative zero": function(format) {
      assert.strictEqual(format("1d")(-0), "-0");
      assert.strictEqual(format("1f")(-0), "-0");
    },
    "supports \"n\" as an alias for \",g\"": function(format) {
      var f = format("n");
      assert.strictEqual(f(.0042), "0.0042");
      assert.strictEqual(f(.42), "0.42");
      assert.strictEqual(f(0), "0");
      assert.strictEqual(f(42), "42");
      assert.strictEqual(f(42000000), "42,000,000");
      assert.strictEqual(f(420000000), "420,000,000");
      assert.strictEqual(f(-4), "-4");
      assert.strictEqual(f(-42), "-42");
      assert.strictEqual(f(-4200000), "-4,200,000");
      assert.strictEqual(f(-42000000), "-42,000,000");
    }
  }
});

suite.export(module);
