import assert from "assert";
import {easeCubic, easeCubicIn, easeCubicInOut, easeCubicOut} from "../src/index.js";
import {out, inOut} from "./generic.js";
import {assertInDelta} from "./asserts.js";

it("easeCubic is an alias for easeCubicInOut", () => {
  assert.strictEqual(easeCubic, easeCubicInOut);
});

it("easeCubicIn(t) returns the expected results", () => {
  assert.strictEqual(easeCubicIn(0.0), 0.000);
  assertInDelta(easeCubicIn(0.1), 0.001);
  assertInDelta(easeCubicIn(0.2), 0.008);
  assertInDelta(easeCubicIn(0.3), 0.027);
  assertInDelta(easeCubicIn(0.4), 0.064);
  assertInDelta(easeCubicIn(0.5), 0.125);
  assertInDelta(easeCubicIn(0.6), 0.216);
  assertInDelta(easeCubicIn(0.7), 0.343);
  assertInDelta(easeCubicIn(0.8), 0.512);
  assertInDelta(easeCubicIn(0.9), 0.729);
  assert.strictEqual(easeCubicIn(1.0), 1.000);
});

it("easeCubicIn(t) coerces t to a number", () => {
  assert.strictEqual(easeCubicIn(".9"), easeCubicIn(0.9));
  assert.strictEqual(easeCubicIn({valueOf: function() { return 0.9; }}), easeCubicIn(0.9));
});

it("easeCubicOut(t) returns the expected results", () => {
  const cubicOut = out(easeCubicIn);
  assert.strictEqual(easeCubicOut(0.0), cubicOut(0.0));
  assertInDelta(easeCubicOut(0.1), cubicOut(0.1));
  assertInDelta(easeCubicOut(0.2), cubicOut(0.2));
  assertInDelta(easeCubicOut(0.3), cubicOut(0.3));
  assertInDelta(easeCubicOut(0.4), cubicOut(0.4));
  assertInDelta(easeCubicOut(0.5), cubicOut(0.5));
  assertInDelta(easeCubicOut(0.6), cubicOut(0.6));
  assertInDelta(easeCubicOut(0.7), cubicOut(0.7));
  assertInDelta(easeCubicOut(0.8), cubicOut(0.8));
  assertInDelta(easeCubicOut(0.9), cubicOut(0.9));
  assert.strictEqual(easeCubicOut(1.0), cubicOut(1.0));
});

it("easeCubicOut(t) coerces t to a number", () => {
  assert.strictEqual(easeCubicOut(".9"), easeCubicOut(0.9));
  assert.strictEqual(easeCubicOut({valueOf: function() { return 0.9; }}), easeCubicOut(0.9));
});

it("easeCubicInOut(t) returns the expected results", () => {
  const cubicInOut = inOut(easeCubicIn);
  assert.strictEqual(easeCubicInOut(0.0), cubicInOut(0.0));
  assertInDelta(easeCubicInOut(0.1), cubicInOut(0.1));
  assertInDelta(easeCubicInOut(0.2), cubicInOut(0.2));
  assertInDelta(easeCubicInOut(0.3), cubicInOut(0.3));
  assertInDelta(easeCubicInOut(0.4), cubicInOut(0.4));
  assertInDelta(easeCubicInOut(0.5), cubicInOut(0.5));
  assertInDelta(easeCubicInOut(0.6), cubicInOut(0.6));
  assertInDelta(easeCubicInOut(0.7), cubicInOut(0.7));
  assertInDelta(easeCubicInOut(0.8), cubicInOut(0.8));
  assertInDelta(easeCubicInOut(0.9), cubicInOut(0.9));
  assert.strictEqual(easeCubicInOut(1.0), cubicInOut(1.0));
});

it("easeCubicInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeCubicInOut(".9"), easeCubicInOut(0.9));
  assert.strictEqual(easeCubicInOut({valueOf: function() { return 0.9; }}), easeCubicInOut(0.9));
});
