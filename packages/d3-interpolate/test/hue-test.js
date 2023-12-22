import assert from "assert";
import {interpolateHue} from "../src/index.js";

it("interpolateHue(a, b) interpolate numbers", () => {
  const i = interpolateHue("10", "20");
  assert.strictEqual(i(0.0), 10);
  assert.strictEqual(i(0.2), 12);
  assert.strictEqual(i(0.4), 14);
  assert.strictEqual(i(0.6), 16);
  assert.strictEqual(i(0.8), 18);
  assert.strictEqual(i(1.0), 20);
});

it("interpolateHue(a, b) returns a if b is NaN", () => {
  const i = interpolateHue(10, NaN);
  assert.strictEqual(i(0.0), 10);
  assert.strictEqual(i(0.5), 10);
  assert.strictEqual(i(1.0), 10);
});

it("interpolateHue(a, b) returns b if a is NaN", () => {
  const i = interpolateHue(NaN, 20);
  assert.strictEqual(i(0.0), 20);
  assert.strictEqual(i(0.5), 20);
  assert.strictEqual(i(1.0), 20);
});

it("interpolateHue(a, b) returns NaN if both a and b are NaN", () => {
  const i = interpolateHue(NaN, NaN);
  assert.strictEqual(isNaN(i(0.0)), true);
  assert.strictEqual(isNaN(i(0.5)), true);
  assert.strictEqual(isNaN(i(1.0)), true);
});

it("interpolateHue(a, b) uses the shortest path", () => {
  const i = interpolateHue(10, 350);
  assert.strictEqual(i(0.0), 10);
  assert.strictEqual(i(0.2), 6);
  assert.strictEqual(i(0.4), 2);
  assert.strictEqual(i(0.6), 358);
  assert.strictEqual(i(0.8), 354);
  assert.strictEqual(i(1.0), 350);
});
