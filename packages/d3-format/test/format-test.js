import assert from "assert";
import {format} from "../src/index.js";

it("format(specifier)(number) returns a string", () => {
  assert.strictEqual(typeof format("d")(0), "string");
});

it("format(specifier).toString() returns the normalized specifier", () => {
  assert.strictEqual(format("d") + "", " >-d");
});

it("format(specifier) throws an error for invalid formats", () => {
  assert.throws(() => { format("foo"); }, /invalid format: foo/);
  assert.throws(() => { format(".-2s"); }, /invalid format: \.-2s/);
  assert.throws(() => { format(".f"); }, /invalid format: \.f/);
});

it("format(\",.\") unreasonable precision values are clamped to reasonable values", () => {
  assert.strictEqual(format(".30f")(0), "0.00000000000000000000");
  assert.strictEqual(format(".0g")(1), "1");
});

it("format(\"s\") handles very small and very large values", () => {
  assert.strictEqual(format("s")(Number.MIN_VALUE), "0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005y");
  assert.strictEqual(format("s")(Number.MAX_VALUE), "179769000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Y");
});

it("format(\"n\") is equivalent to format(\",g\")", () => {
  assert.strictEqual(format("n")(123456.78), "123,457");
  assert.strictEqual(format(",g")(123456.78), "123,457");
});

it("format(\"012\") is equivalent to format(\"0=12\")", () => {
  assert.strictEqual(format("012")(123.456), "00000123.456");
  assert.strictEqual(format("0=12")(123.456), "00000123.456");
});
