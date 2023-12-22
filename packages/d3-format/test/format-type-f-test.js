import assert from "assert";
import {format} from "../src/index.js";

it("format(\"f\") can output fixed-point notation", () => {
  assert.strictEqual(format(".1f")(0.49), "0.5");
  assert.strictEqual(format(".2f")(0.449), "0.45");
  assert.strictEqual(format(".3f")(0.4449), "0.445");
  assert.strictEqual(format(".5f")(0.444449), "0.44445");
  assert.strictEqual(format(".1f")(100), "100.0");
  assert.strictEqual(format(".2f")(100), "100.00");
  assert.strictEqual(format(".3f")(100), "100.000");
  assert.strictEqual(format(".5f")(100), "100.00000");
});

it("format(\"+$,f\") can output a currency with comma-grouping and sign", () => {
  const f = format("+$,.2f");
  assert.strictEqual(f(0), "+$0.00");
  assert.strictEqual(f(0.429), "+$0.43");
  assert.strictEqual(f(-0.429), "−$0.43");
  assert.strictEqual(f(-1), "−$1.00");
  assert.strictEqual(f(1e4), "+$10,000.00");
});

it("format(\",.f\") can group thousands, space fill, and round to significant digits", () => {
  assert.strictEqual(format("10,.1f")(123456.49), " 123,456.5");
  assert.strictEqual(format("10,.2f")(1234567.449), "1,234,567.45");
  assert.strictEqual(format("10,.3f")(12345678.4449), "12,345,678.445");
  assert.strictEqual(format("10,.5f")(123456789.444449), "123,456,789.44445");
  assert.strictEqual(format("10,.1f")(123456), " 123,456.0");
  assert.strictEqual(format("10,.2f")(1234567), "1,234,567.00");
  assert.strictEqual(format("10,.3f")(12345678), "12,345,678.000");
  assert.strictEqual(format("10,.5f")(123456789), "123,456,789.00000");
});

it("format(\"f\") can display integers in fixed-point notation", () => {
  assert.strictEqual(format("f")(42), "42.000000");
});

it("format(\"f\") can format negative zero as zero", () => {
  assert.strictEqual(format("f")(-0), "0.000000");
  assert.strictEqual(format("f")(-1e-12), "0.000000");
});

it("format(\"+f\") signs negative zero correctly", () => {
  assert.strictEqual(format("+f")(-0), "−0.000000");
  assert.strictEqual(format("+f")(+0), "+0.000000");
  assert.strictEqual(format("+f")(-1e-12), "−0.000000");
  assert.strictEqual(format("+f")(+1e-12), "+0.000000");
});

it("format(\"f\") can format negative infinity", () => {
  assert.strictEqual(format("f")(-Infinity), "−Infinity");
});

it("format(\",f\") does not group Infinity", () => {
  assert.strictEqual(format(",f")(Infinity), "Infinity");
});
