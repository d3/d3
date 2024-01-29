import assert from "assert";
import {easeBack, easeBackIn, easeBackInOut, easeBackOut} from "../src/index.js";
import {out, inOut} from "./generic.js"
import {assertInDelta} from "./asserts.js";

it("easeBack is an alias for easeBackInOut", () => {
  assert.strictEqual(easeBack, easeBackInOut);
});

it("easeBackIn(t) returns the expected results", () => {
  assert.strictEqual(Math.abs(easeBackIn(0.0)),  0.000000);
  assertInDelta(easeBackIn(0.1), -0.014314);
  assertInDelta(easeBackIn(0.2), -0.046451);
  assertInDelta(easeBackIn(0.3), -0.080200);
  assertInDelta(easeBackIn(0.4), -0.099352);
  assertInDelta(easeBackIn(0.5), -0.087698);
  assertInDelta(easeBackIn(0.6), -0.029028);
  assertInDelta(easeBackIn(0.7), +0.092868);
  assertInDelta(easeBackIn(0.8), +0.294198);
  assertInDelta(easeBackIn(0.9), +0.591172);
  assert.strictEqual(easeBackIn(1.0), +1.000000);
});

it("easeBackIn(t) coerces t to a number", () => {
  assert.strictEqual(easeBackIn(".9"), easeBackIn(0.9));
  assert.strictEqual(easeBackIn({valueOf: function() { return 0.9; }}), easeBackIn(0.9));
});

it("easeBackOut(t) returns the expected results", () => {
  const backOut = out(easeBackIn);
  assert.strictEqual(easeBackOut(0.0), backOut(0.0));
  assertInDelta(easeBackOut(0.1), backOut(0.1));
  assertInDelta(easeBackOut(0.2), backOut(0.2));
  assertInDelta(easeBackOut(0.3), backOut(0.3));
  assertInDelta(easeBackOut(0.4), backOut(0.4));
  assertInDelta(easeBackOut(0.5), backOut(0.5));
  assertInDelta(easeBackOut(0.6), backOut(0.6));
  assertInDelta(easeBackOut(0.7), backOut(0.7));
  assertInDelta(easeBackOut(0.8), backOut(0.8));
  assertInDelta(easeBackOut(0.9), backOut(0.9));
  assert.strictEqual(easeBackOut(1.0), backOut(1.0));
});

it("easeBackOut(t) coerces t to a number", () => {
  assert.strictEqual(easeBackOut(".9"), easeBackOut(0.9));
  assert.strictEqual(easeBackOut({valueOf: function() { return 0.9; }}), easeBackOut(0.9));
});

it("easeBackInOut(t) returns the expected results", () => {
  const backInOut = inOut(easeBackIn);
  assert.strictEqual(easeBackInOut(0.0), backInOut(0.0));
  assertInDelta(easeBackInOut(0.1), backInOut(0.1));
  assertInDelta(easeBackInOut(0.2), backInOut(0.2));
  assertInDelta(easeBackInOut(0.3), backInOut(0.3));
  assertInDelta(easeBackInOut(0.4), backInOut(0.4));
  assertInDelta(easeBackInOut(0.5), backInOut(0.5));
  assertInDelta(easeBackInOut(0.6), backInOut(0.6));
  assertInDelta(easeBackInOut(0.7), backInOut(0.7));
  assertInDelta(easeBackInOut(0.8), backInOut(0.8));
  assertInDelta(easeBackInOut(0.9), backInOut(0.9));
  assert.strictEqual(easeBackInOut(1.0), backInOut(1.0));
});

it("easeBackInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeBackInOut(".9"), easeBackInOut(0.9));
  assert.strictEqual(easeBackInOut({valueOf: function() { return 0.9; }}), easeBackInOut(0.9));
});
