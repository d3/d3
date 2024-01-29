import assert from "assert";
import {format} from "../src/index.js";

it("format(\"n\") is an alias for \",g\"", () => {
  const f = format(".12n");
  assert.strictEqual(f(0), "0.00000000000");
  assert.strictEqual(f(42), "42.0000000000");
  assert.strictEqual(f(42000000), "42,000,000.0000");
  assert.strictEqual(f(420000000), "420,000,000.000");
  assert.strictEqual(f(-4), "−4.00000000000");
  assert.strictEqual(f(-42), "−42.0000000000");
  assert.strictEqual(f(-4200000), "−4,200,000.00000");
  assert.strictEqual(f(-42000000), "−42,000,000.0000");
  assert.strictEqual(f(.0042), "0.00420000000000");
  assert.strictEqual(f(.42), "0.420000000000");
  assert.strictEqual(f(1e21), "1.00000000000e+21");
});

it("format(\"n\") uses zero padding", () => {
  assert.strictEqual(format("01.0n")(0), "0");
  assert.strictEqual(format("02.0n")(0), "00");
  assert.strictEqual(format("03.0n")(0), "000");
  assert.strictEqual(format("05.0n")(0), "0,000");
  assert.strictEqual(format("08.0n")(0), "0,000,000");
  assert.strictEqual(format("013.0n")(0), "0,000,000,000");
  assert.strictEqual(format("021.0n")(0), "0,000,000,000,000,000");
  assert.strictEqual(format("013.8n")(-42000000), "−0,042,000,000");
});
