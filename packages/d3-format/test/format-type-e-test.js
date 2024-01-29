import assert from "assert";
import {format} from "../src/index.js";

it("format(\"e\") can output exponent notation", () => {
  const f = format("e");
  assert.strictEqual(f(0), "0.000000e+0");
  assert.strictEqual(f(42), "4.200000e+1");
  assert.strictEqual(f(42000000), "4.200000e+7");
  assert.strictEqual(f(420000000), "4.200000e+8");
  assert.strictEqual(f(-4), "−4.000000e+0");
  assert.strictEqual(f(-42), "−4.200000e+1");
  assert.strictEqual(f(-4200000), "−4.200000e+6");
  assert.strictEqual(f(-42000000), "−4.200000e+7");
  assert.strictEqual(format(".0e")(42), "4e+1")
  assert.strictEqual(format(".3e")(42), "4.200e+1")
});

it("format(\"e\") can format negative zero as zero", () => {
  assert.strictEqual(format("1e")(-0), "0.000000e+0");
  assert.strictEqual(format("1e")(-1e-12), "−1.000000e-12");
});

it("format(\",e\") does not group Infinity", () => {
  assert.strictEqual(format(",e")(Infinity), "Infinity");
});

it("format(\".3e\") can format negative infinity", () => {
  assert.strictEqual(format(".3e")(-Infinity), "−Infinity");
});
