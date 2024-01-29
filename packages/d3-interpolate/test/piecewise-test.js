import assert from "assert";
import {interpolate, piecewise} from "../src/index.js";

it("piecewise(interpolate, values)(t) returns the expected values", () => {
  const i = piecewise(interpolate, [0, 2, 10]);
  assert.strictEqual(i(-1), -4);
  assert.strictEqual(i(0), 0);
  assert.strictEqual(i(0.19), 0.76);
  assert.strictEqual(i(0.21), 0.84);
  assert.strictEqual(i(0.5), 2);
  assert.strictEqual(i(0.75), 6);
  assert.strictEqual(i(1), 10);
});

it("piecewise(values) uses the default interpolator", () => {
  const i = piecewise([0, 2, 10]);
  assert.strictEqual(i(-1), -4);
  assert.strictEqual(i(0), 0);
  assert.strictEqual(i(0.19), 0.76);
  assert.strictEqual(i(0.21), 0.84);
  assert.strictEqual(i(0.5), 2);
  assert.strictEqual(i(0.75), 6);
  assert.strictEqual(i(1), 10);
});

it("piecewise(values) uses the default interpolator/2", () => {
  const i = piecewise(["a0", "a2", "a10"]);
  assert.strictEqual(i(-1), "a-4");
  assert.strictEqual(i(0), "a0");
  assert.strictEqual(i(0.19), "a0.76");
  assert.strictEqual(i(0.21), "a0.84");
  assert.strictEqual(i(0.5), "a2");
  assert.strictEqual(i(0.75), "a6");
  assert.strictEqual(i(1), "a10");
});
