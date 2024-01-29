import assert from "assert";
import {easeSin, easeSinIn, easeSinInOut, easeSinOut} from "../src/index.js";
import {out, inOut} from "./generic.js"
import {assertInDelta} from "./asserts.js";

it("easeSin is an alias for easeSinInOut", () => {
  assert.strictEqual(easeSin, easeSinInOut);
});

it("easeSinIn(t) returns the expected results", () => {
  assert.strictEqual(easeSinIn(0.0), 0.000000);
  assertInDelta(easeSinIn(0.1), 0.012312);
  assertInDelta(easeSinIn(0.2), 0.048943);
  assertInDelta(easeSinIn(0.3), 0.108993);
  assertInDelta(easeSinIn(0.4), 0.190983);
  assertInDelta(easeSinIn(0.5), 0.292893);
  assertInDelta(easeSinIn(0.6), 0.412215);
  assertInDelta(easeSinIn(0.7), 0.546010);
  assertInDelta(easeSinIn(0.8), 0.690983);
  assertInDelta(easeSinIn(0.9), 0.843566);
  assert.strictEqual(easeSinIn(1.0), 1.000000);
});

it("easeSinIn(t) coerces t to a number", () => {
  assert.strictEqual(easeSinIn(".9"), easeSinIn(0.9));
  assert.strictEqual(easeSinIn({valueOf: function() { return 0.9; }}), easeSinIn(0.9));
});

it("easeSinOut(t) returns the expected results", () => {
  var sinOut = out(easeSinIn);
  assertInDelta(easeSinOut(0.0), sinOut(0.0));
  assertInDelta(easeSinOut(0.1), sinOut(0.1));
  assertInDelta(easeSinOut(0.2), sinOut(0.2));
  assertInDelta(easeSinOut(0.3), sinOut(0.3));
  assertInDelta(easeSinOut(0.4), sinOut(0.4));
  assertInDelta(easeSinOut(0.5), sinOut(0.5));
  assertInDelta(easeSinOut(0.6), sinOut(0.6));
  assertInDelta(easeSinOut(0.7), sinOut(0.7));
  assertInDelta(easeSinOut(0.8), sinOut(0.8));
  assertInDelta(easeSinOut(0.9), sinOut(0.9));
  assertInDelta(easeSinOut(1.0), sinOut(1.0));
});

it("easeSinOut(t) coerces t to a number", () => {
  assert.strictEqual(easeSinOut(".9"), easeSinOut(0.9));
  assert.strictEqual(easeSinOut({valueOf: function() { return 0.9; }}), easeSinOut(0.9));
});

it("easeSinInOut(t) returns the expected results", () => {
  var sinInOut = inOut(easeSinIn);
  assertInDelta(easeSinInOut(0.0), sinInOut(0.0));
  assertInDelta(easeSinInOut(0.1), sinInOut(0.1));
  assertInDelta(easeSinInOut(0.2), sinInOut(0.2));
  assertInDelta(easeSinInOut(0.3), sinInOut(0.3));
  assertInDelta(easeSinInOut(0.4), sinInOut(0.4));
  assertInDelta(easeSinInOut(0.5), sinInOut(0.5));
  assertInDelta(easeSinInOut(0.6), sinInOut(0.6));
  assertInDelta(easeSinInOut(0.7), sinInOut(0.7));
  assertInDelta(easeSinInOut(0.8), sinInOut(0.8));
  assertInDelta(easeSinInOut(0.9), sinInOut(0.9));
  assertInDelta(easeSinInOut(1.0), sinInOut(1.0));
});

it("easeSinInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeSinInOut(".9"), easeSinInOut(0.9));
  assert.strictEqual(easeSinInOut({valueOf: function() { return 0.9; }}), easeSinInOut(0.9));
});
