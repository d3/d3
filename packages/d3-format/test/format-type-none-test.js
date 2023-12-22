import assert from "assert";
import {format} from "../src/index.js";

it("format(\".[precision]\") uses significant precision and trims insignificant zeros", () => {
  assert.strictEqual(format(".1")(4.9), "5");
  assert.strictEqual(format(".1")(0.49), "0.5");
  assert.strictEqual(format(".2")(4.9), "4.9");
  assert.strictEqual(format(".2")(0.49), "0.49");
  assert.strictEqual(format(".2")(0.449), "0.45");
  assert.strictEqual(format(".3")(4.9), "4.9");
  assert.strictEqual(format(".3")(0.49), "0.49");
  assert.strictEqual(format(".3")(0.449), "0.449");
  assert.strictEqual(format(".3")(0.4449), "0.445");
  assert.strictEqual(format(".5")(0.444449), "0.44445");
});

it("format(\".[precision]\") does not trim significant zeros", () => {
  assert.strictEqual(format(".5")(10), "10");
  assert.strictEqual(format(".5")(100), "100");
  assert.strictEqual(format(".5")(1000), "1000");
  assert.strictEqual(format(".5")(21010), "21010");
  assert.strictEqual(format(".5")(1.10001), "1.1");
  assert.strictEqual(format(".5")(1.10001e6), "1.1e+6");
  assert.strictEqual(format(".6")(1.10001), "1.10001");
  assert.strictEqual(format(".6")(1.10001e6), "1.10001e+6");
});

it("format(\".[precision]\") also trims the decimal point if there are only insignificant zeros", () => {
  assert.strictEqual(format(".5")(1.00001), "1");
  assert.strictEqual(format(".5")(1.00001e6), "1e+6");
  assert.strictEqual(format(".6")(1.00001), "1.00001");
  assert.strictEqual(format(".6")(1.00001e6), "1.00001e+6");
});

it("format(\"$\") can output a currency", () => {
  const f = format("$");
  assert.strictEqual(f(0), "$0");
  assert.strictEqual(f(.042), "$0.042");
  assert.strictEqual(f(.42), "$0.42");
  assert.strictEqual(f(4.2), "$4.2");
  assert.strictEqual(f(-.042), "−$0.042");
  assert.strictEqual(f(-.42), "−$0.42");
  assert.strictEqual(f(-4.2), "−$4.2");
});

it("format(\"($\") can output a currency with parentheses for negative values", () => {
  const f = format("($");
  assert.strictEqual(f(0), "$0");
  assert.strictEqual(f(.042), "$0.042");
  assert.strictEqual(f(.42), "$0.42");
  assert.strictEqual(f(4.2), "$4.2");
  assert.strictEqual(f(-.042), "($0.042)");
  assert.strictEqual(f(-.42), "($0.42)");
  assert.strictEqual(f(-4.2), "($4.2)");
});

it("format(\"\") can format negative zero as zero", () => {
  assert.strictEqual(format("")(-0), "0");
});

it("format(\"\") can format negative infinity", () => {
  assert.strictEqual(format("")(-Infinity), "−Infinity");
});
