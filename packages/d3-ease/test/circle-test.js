import assert from "assert";
import {easeCircle, easeCircleIn, easeCircleInOut, easeCircleOut} from "../src/index.js";
import {out, inOut} from "./generic.js"
import {assertInDelta} from "./asserts.js"

it("easeCircle is an alias for easeCircleInOut", () => {
  assert.strictEqual(easeCircle, easeCircleInOut);
});

it("easeCircleIn(t) returns the expected results", () => {
  assert.strictEqual(easeCircleIn(0.0), 0.000000);
  assertInDelta(easeCircleIn(0.1), 0.005013);
  assertInDelta(easeCircleIn(0.2), 0.020204);
  assertInDelta(easeCircleIn(0.3), 0.046061);
  assertInDelta(easeCircleIn(0.4), 0.083485);
  assertInDelta(easeCircleIn(0.5), 0.133975);
  assertInDelta(easeCircleIn(0.6), 0.200000);
  assertInDelta(easeCircleIn(0.7), 0.285857);
  assertInDelta(easeCircleIn(0.8), 0.400000);
  assertInDelta(easeCircleIn(0.9), 0.564110);
  assert.strictEqual(easeCircleIn(1.0), 1.000000);
});

it("easeCircleIn(t) coerces t to a number", () => {
  assert.strictEqual(easeCircleIn(".9"), easeCircleIn(0.9));
  assert.strictEqual(easeCircleIn({valueOf: function() { return 0.9; }}), easeCircleIn(0.9));
});

it("easeCircleOut(t) returns the expected results", () => {
  var circleOut = out(easeCircleIn);
  assert.strictEqual(easeCircleOut(0.0), circleOut(0.0));
  assertInDelta(easeCircleOut(0.1), circleOut(0.1));
  assertInDelta(easeCircleOut(0.2), circleOut(0.2));
  assertInDelta(easeCircleOut(0.3), circleOut(0.3));
  assertInDelta(easeCircleOut(0.4), circleOut(0.4));
  assertInDelta(easeCircleOut(0.5), circleOut(0.5));
  assertInDelta(easeCircleOut(0.6), circleOut(0.6));
  assertInDelta(easeCircleOut(0.7), circleOut(0.7));
  assertInDelta(easeCircleOut(0.8), circleOut(0.8));
  assertInDelta(easeCircleOut(0.9), circleOut(0.9));
  assert.strictEqual(easeCircleOut(1.0), circleOut(1.0));
});

it("easeCircleOut(t) coerces t to a number", () => {
  assert.strictEqual(easeCircleOut(".9"), easeCircleOut(0.9));
  assert.strictEqual(easeCircleOut({valueOf: function() { return 0.9; }}), easeCircleOut(0.9));
});

it("easeCircleInOut(t) returns the expected results", () => {
  var circleInOut = inOut(easeCircleIn);
  assert.strictEqual(easeCircleInOut(0.0), circleInOut(0.0));
  assertInDelta(easeCircleInOut(0.1), circleInOut(0.1));
  assertInDelta(easeCircleInOut(0.2), circleInOut(0.2));
  assertInDelta(easeCircleInOut(0.3), circleInOut(0.3));
  assertInDelta(easeCircleInOut(0.4), circleInOut(0.4));
  assertInDelta(easeCircleInOut(0.5), circleInOut(0.5));
  assertInDelta(easeCircleInOut(0.6), circleInOut(0.6));
  assertInDelta(easeCircleInOut(0.7), circleInOut(0.7));
  assertInDelta(easeCircleInOut(0.8), circleInOut(0.8));
  assertInDelta(easeCircleInOut(0.9), circleInOut(0.9));
  assert.strictEqual(easeCircleInOut(1.0), circleInOut(1.0));
});

it("easeCircleInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeCircleInOut(".9"), easeCircleInOut(0.9));
  assert.strictEqual(easeCircleInOut({valueOf: function() { return 0.9; }}), easeCircleInOut(0.9));
});
