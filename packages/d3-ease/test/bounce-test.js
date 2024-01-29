import assert from "assert";
import {easeBounce, easeBounceIn, easeBounceInOut, easeBounceOut} from "../src/index.js";
import {out, inOut} from "./generic.js"
import {assertInDelta} from "./asserts.js";

it("easeBounce is an alias for easeBounceOut", () => {
  assert.strictEqual(easeBounce, easeBounceOut);
});

it("easeBounceIn(t) returns the expected results", () => {
  assert.strictEqual(easeBounceIn(0.0), 0.000000);
  assertInDelta(easeBounceIn(0.1), 0.011875);
  assertInDelta(easeBounceIn(0.2), 0.060000);
  assertInDelta(easeBounceIn(0.3), 0.069375);
  assertInDelta(easeBounceIn(0.4), 0.227500);
  assertInDelta(easeBounceIn(0.5), 0.234375);
  assertInDelta(easeBounceIn(0.6), 0.090000);
  assertInDelta(easeBounceIn(0.7), 0.319375);
  assertInDelta(easeBounceIn(0.8), 0.697500);
  assertInDelta(easeBounceIn(0.9), 0.924375);
  assert.strictEqual(easeBounceIn(1.0), 1.000000);
});

it("easeBounceIn(t) coerces t to a number", () => {
  assert.strictEqual(easeBounceIn(".9"), easeBounceIn(0.9));
  assert.strictEqual(easeBounceIn({valueOf: function() { return 0.9; }}), easeBounceIn(0.9));
});

it("easeBounceOut(t) returns the expected results", () => {
  const bounceOut = out(easeBounceIn);
  assert.strictEqual(easeBounceOut(0.0), bounceOut(0.0));
  assertInDelta(easeBounceOut(0.1), bounceOut(0.1));
  assertInDelta(easeBounceOut(0.2), bounceOut(0.2));
  assertInDelta(easeBounceOut(0.3), bounceOut(0.3));
  assertInDelta(easeBounceOut(0.4), bounceOut(0.4));
  assertInDelta(easeBounceOut(0.5), bounceOut(0.5));
  assertInDelta(easeBounceOut(0.6), bounceOut(0.6));
  assertInDelta(easeBounceOut(0.7), bounceOut(0.7));
  assertInDelta(easeBounceOut(0.8), bounceOut(0.8));
  assertInDelta(easeBounceOut(0.9), bounceOut(0.9));
  assert.strictEqual(easeBounceOut(1.0), bounceOut(1.0));
});

it("easeBounceOut(t) coerces t to a number", () => {
  assert.strictEqual(easeBounceOut(".9"), easeBounceOut(0.9));
  assert.strictEqual(easeBounceOut({valueOf: function() { return 0.9; }}), easeBounceOut(0.9));
});

it("easeBounceInOut(t) returns the expected results", () => {
  const bounceInOut = inOut(easeBounceIn);
  assert.strictEqual(easeBounceInOut(0.0), bounceInOut(0.0));
  assertInDelta(easeBounceInOut(0.1), bounceInOut(0.1));
  assertInDelta(easeBounceInOut(0.2), bounceInOut(0.2));
  assertInDelta(easeBounceInOut(0.3), bounceInOut(0.3));
  assertInDelta(easeBounceInOut(0.4), bounceInOut(0.4));
  assertInDelta(easeBounceInOut(0.5), bounceInOut(0.5));
  assertInDelta(easeBounceInOut(0.6), bounceInOut(0.6));
  assertInDelta(easeBounceInOut(0.7), bounceInOut(0.7));
  assertInDelta(easeBounceInOut(0.8), bounceInOut(0.8));
  assertInDelta(easeBounceInOut(0.9), bounceInOut(0.9));
  assert.strictEqual(easeBounceInOut(1.0), bounceInOut(1.0));
});

it("easeBounceInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeBounceInOut(".9"), easeBounceInOut(0.9));
  assert.strictEqual(easeBounceInOut({valueOf: function() { return 0.9; }}), easeBounceInOut(0.9));
});
