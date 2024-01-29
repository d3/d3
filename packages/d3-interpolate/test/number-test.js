import assert from "assert";
import {interpolateNumber} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("interpolateNumber(a, b) interpolates between two numbers a and b", () => {
  const i = interpolateNumber(10, 42);
  assertInDelta(i(0.0), 10.0);
  assertInDelta(i(0.1), 13.2);
  assertInDelta(i(0.2), 16.4);
  assertInDelta(i(0.3), 19.6);
  assertInDelta(i(0.4), 22.8);
  assertInDelta(i(0.5), 26.0);
  assertInDelta(i(0.6), 29.2);
  assertInDelta(i(0.7), 32.4);
  assertInDelta(i(0.8), 35.6);
  assertInDelta(i(0.9), 38.8);
  assertInDelta(i(1.0), 42.0);
});


it("interpolateNumber(a, b) gives exact ends for t=0 and t=1", () => {
  const a = 2e+42, b = 335;
  assert.strictEqual(interpolateNumber(a, b)(1), b);
  assert.strictEqual(interpolateNumber(a, b)(0), a);
});
