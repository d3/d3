import assert from "assert";
import {format} from "../src/index.js";

it("format(\"d\") can zero fill", () => {
  const f = format("08d");
  assert.strictEqual(f(0), "00000000");
  assert.strictEqual(f(42), "00000042");
  assert.strictEqual(f(42000000), "42000000");
  assert.strictEqual(f(420000000), "420000000");
  assert.strictEqual(f(-4), "−0000004");
  assert.strictEqual(f(-42), "−0000042");
  assert.strictEqual(f(-4200000), "−4200000");
  assert.strictEqual(f(-42000000), "−42000000");
});

it("format(\"d\") can space fill", () => {
  const f = format("8d");
  assert.strictEqual(f(0), "       0");
  assert.strictEqual(f(42), "      42");
  assert.strictEqual(f(42000000), "42000000");
  assert.strictEqual(f(420000000), "420000000");
  assert.strictEqual(f(-4), "      −4");
  assert.strictEqual(f(-42), "     −42");
  assert.strictEqual(f(-4200000), "−4200000");
  assert.strictEqual(f(-42000000), "−42000000");
});

it("format(\"d\") can underscore fill", () => {
  const f = format("_>8d");
  assert.strictEqual(f(0), "_______0");
  assert.strictEqual(f(42), "______42");
  assert.strictEqual(f(42000000), "42000000");
  assert.strictEqual(f(420000000), "420000000");
  assert.strictEqual(f(-4), "______−4");
  assert.strictEqual(f(-42), "_____−42");
  assert.strictEqual(f(-4200000), "−4200000");
  assert.strictEqual(f(-42000000), "−42000000");
});

it("format(\"d\") can zero fill with sign and group", () => {
  const f = format("+08,d");
  assert.strictEqual(f(0), "+0,000,000");
  assert.strictEqual(f(42), "+0,000,042");
  assert.strictEqual(f(42000000), "+42,000,000");
  assert.strictEqual(f(420000000), "+420,000,000");
  assert.strictEqual(f(-4), "−0,000,004");
  assert.strictEqual(f(-42), "−0,000,042");
  assert.strictEqual(f(-4200000), "−4,200,000");
  assert.strictEqual(f(-42000000), "−42,000,000");
});

it("format(\"d\") always uses zero precision", () => {
  const f = format(".2d");
  assert.strictEqual(f(0), "0");
  assert.strictEqual(f(42), "42");
  assert.strictEqual(f(-4.2), "−4");
});

it("format(\"d\") rounds non-integers", () => {
  const f = format("d");
  assert.strictEqual(f(4.2), "4");
});

it("format(\",d\") can group thousands", () => {
  const f = format(",d");
  assert.strictEqual(f(0), "0");
  assert.strictEqual(f(42), "42");
  assert.strictEqual(f(42000000), "42,000,000");
  assert.strictEqual(f(420000000), "420,000,000");
  assert.strictEqual(f(-4), "−4");
  assert.strictEqual(f(-42), "−42");
  assert.strictEqual(f(-4200000), "−4,200,000");
  assert.strictEqual(f(-42000000), "−42,000,000");
  assert.strictEqual(f(1e21), "1,000,000,000,000,000,000,000");
  assert.strictEqual(f(1.3e27), "1,300,000,000,000,000,000,000,000,000");
  assert.strictEqual(f(1.3e107), "130,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000");
});

it("format(\"0,d\") can group thousands and zero fill", () => {
  assert.strictEqual(format("01,d")(0), "0");
  assert.strictEqual(format("01,d")(0), "0");
  assert.strictEqual(format("02,d")(0), "00");
  assert.strictEqual(format("03,d")(0), "000");
  assert.strictEqual(format("04,d")(0), "0,000");
  assert.strictEqual(format("05,d")(0), "0,000");
  assert.strictEqual(format("06,d")(0), "00,000");
  assert.strictEqual(format("08,d")(0), "0,000,000");
  assert.strictEqual(format("013,d")(0), "0,000,000,000");
  assert.strictEqual(format("021,d")(0), "0,000,000,000,000,000");
  assert.strictEqual(format("013,d")(-42000000), "−0,042,000,000");
  assert.strictEqual(format("012,d")(1e21), "1,000,000,000,000,000,000,000");
  assert.strictEqual(format("013,d")(1e21), "1,000,000,000,000,000,000,000");
  assert.strictEqual(format("014,d")(1e21), "1,000,000,000,000,000,000,000");
  assert.strictEqual(format("015,d")(1e21), "1,000,000,000,000,000,000,000");
});

it("format(\"0,d\") can group thousands and zero fill with overflow", () => {
  assert.strictEqual(format("01,d")(1), "1");
  assert.strictEqual(format("01,d")(1), "1");
  assert.strictEqual(format("02,d")(12), "12");
  assert.strictEqual(format("03,d")(123), "123");
  assert.strictEqual(format("05,d")(12345), "12,345");
  assert.strictEqual(format("08,d")(12345678), "12,345,678");
  assert.strictEqual(format("013,d")(1234567890123), "1,234,567,890,123");
});

it("format(\",d\") can group thousands and space fill", () => {
  assert.strictEqual(format("1,d")(0), "0");
  assert.strictEqual(format("1,d")(0), "0");
  assert.strictEqual(format("2,d")(0), " 0");
  assert.strictEqual(format("3,d")(0), "  0");
  assert.strictEqual(format("5,d")(0), "    0");
  assert.strictEqual(format("8,d")(0), "       0");
  assert.strictEqual(format("13,d")(0), "            0");
  assert.strictEqual(format("21,d")(0), "                    0");
});

it("format(\",d\") can group thousands and space fill with overflow", () => {
  assert.strictEqual(format("1,d")(1), "1");
  assert.strictEqual(format("1,d")(1), "1");
  assert.strictEqual(format("2,d")(12), "12");
  assert.strictEqual(format("3,d")(123), "123");
  assert.strictEqual(format("5,d")(12345), "12,345");
  assert.strictEqual(format("8,d")(12345678), "12,345,678");
  assert.strictEqual(format("13,d")(1234567890123), "1,234,567,890,123");
});

it("format(\"<d\") align left", () => {
  assert.strictEqual(format("<1,d")(0), "0");
  assert.strictEqual(format("<1,d")(0), "0");
  assert.strictEqual(format("<2,d")(0), "0 ");
  assert.strictEqual(format("<3,d")(0), "0  ");
  assert.strictEqual(format("<5,d")(0), "0    ");
  assert.strictEqual(format("<8,d")(0), "0       ");
  assert.strictEqual(format("<13,d")(0), "0            ");
  assert.strictEqual(format("<21,d")(0), "0                    ");
});

it("format(\">d\") align right", () => {
  assert.strictEqual(format(">1,d")(0), "0");
  assert.strictEqual(format(">1,d")(0), "0");
  assert.strictEqual(format(">2,d")(0), " 0");
  assert.strictEqual(format(">3,d")(0), "  0");
  assert.strictEqual(format(">5,d")(0), "    0");
  assert.strictEqual(format(">8,d")(0), "       0");
  assert.strictEqual(format(">13,d")(0), "            0");
  assert.strictEqual(format(">21,d")(0), "                    0");
  assert.strictEqual(format(">21,d")(1000), "                1,000");
  assert.strictEqual(format(">21,d")(1e21), "1,000,000,000,000,000,000,000");
});

it("format(\"^d\") align center", () => {
  assert.strictEqual(format("^1,d")(0), "0");
  assert.strictEqual(format("^1,d")(0), "0");
  assert.strictEqual(format("^2,d")(0), "0 ");
  assert.strictEqual(format("^3,d")(0), " 0 ");
  assert.strictEqual(format("^5,d")(0), "  0  ");
  assert.strictEqual(format("^8,d")(0), "   0    ");
  assert.strictEqual(format("^13,d")(0), "      0      ");
  assert.strictEqual(format("^21,d")(0), "          0          ");
  assert.strictEqual(format("^21,d")(1000), "        1,000        ");
  assert.strictEqual(format("^21,d")(1e21), "1,000,000,000,000,000,000,000");
});

it("format(\"=+,d\") pad after sign", () => {
  assert.strictEqual(format("=+1,d")(0), "+0");
  assert.strictEqual(format("=+1,d")(0), "+0");
  assert.strictEqual(format("=+2,d")(0), "+0");
  assert.strictEqual(format("=+3,d")(0), "+ 0");
  assert.strictEqual(format("=+5,d")(0), "+   0");
  assert.strictEqual(format("=+8,d")(0), "+      0");
  assert.strictEqual(format("=+13,d")(0), "+           0");
  assert.strictEqual(format("=+21,d")(0), "+                   0");
  assert.strictEqual(format("=+21,d")(1e21), "+1,000,000,000,000,000,000,000");
});

it("format(\"=+$,d\") pad after sign with currency", () => {
  assert.strictEqual(format("=+$1,d")(0), "+$0");
  assert.strictEqual(format("=+$1,d")(0), "+$0");
  assert.strictEqual(format("=+$2,d")(0), "+$0");
  assert.strictEqual(format("=+$3,d")(0), "+$0");
  assert.strictEqual(format("=+$5,d")(0), "+$  0");
  assert.strictEqual(format("=+$8,d")(0), "+$     0");
  assert.strictEqual(format("=+$13,d")(0), "+$          0");
  assert.strictEqual(format("=+$21,d")(0), "+$                  0");
  assert.strictEqual(format("=+$21,d")(1e21), "+$1,000,000,000,000,000,000,000");
});

it("format(\" ,d\") a space can denote positive numbers", () => {
  assert.strictEqual(format(" 1,d")(-1), "−1");
  assert.strictEqual(format(" 1,d")(0), " 0");
  assert.strictEqual(format(" 2,d")(0), " 0");
  assert.strictEqual(format(" 3,d")(0), "  0");
  assert.strictEqual(format(" 5,d")(0), "    0");
  assert.strictEqual(format(" 8,d")(0), "       0");
  assert.strictEqual(format(" 13,d")(0), "            0");
  assert.strictEqual(format(" 21,d")(0), "                    0");
  assert.strictEqual(format(" 21,d")(1e21), " 1,000,000,000,000,000,000,000");
});

it("format(\"-,d\") explicitly only use a sign for negative numbers", () => {
  assert.strictEqual(format("-1,d")(-1), "−1");
  assert.strictEqual(format("-1,d")(0), "0");
  assert.strictEqual(format("-2,d")(0), " 0");
  assert.strictEqual(format("-3,d")(0), "  0");
  assert.strictEqual(format("-5,d")(0), "    0");
  assert.strictEqual(format("-8,d")(0), "       0");
  assert.strictEqual(format("-13,d")(0), "            0");
  assert.strictEqual(format("-21,d")(0), "                    0");
});

it("format(\"d\") can format negative zero as zero", () => {
  assert.strictEqual(format("1d")(-0), "0");
  assert.strictEqual(format("1d")(-1e-12), "0");
});
