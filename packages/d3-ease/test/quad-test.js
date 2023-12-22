import assert from "assert";
import {easeQuad, easeQuadIn, easeQuadInOut, easeQuadOut} from "../src/index.js";
import {out, inOut} from "./generic.js"
import {assertInDelta} from "./asserts.js";

it("easeQuad is an alias for easeQuadInOut", () => {
  assert.strictEqual(easeQuad, easeQuadInOut);
});

it("easeQuadIn(t) returns the expected results", () => {
  assert.strictEqual(easeQuadIn(0.0), 0.00);
  assertInDelta(easeQuadIn(0.1), 0.01);
  assertInDelta(easeQuadIn(0.2), 0.04);
  assertInDelta(easeQuadIn(0.3), 0.09);
  assertInDelta(easeQuadIn(0.4), 0.16);
  assertInDelta(easeQuadIn(0.5), 0.25);
  assertInDelta(easeQuadIn(0.6), 0.36);
  assertInDelta(easeQuadIn(0.7), 0.49);
  assertInDelta(easeQuadIn(0.8), 0.64);
  assertInDelta(easeQuadIn(0.9), 0.81);
  assert.strictEqual(easeQuadIn(1.0), 1.00);
});

it("easeQuadIn(t) coerces t to a number", () => {
  assert.strictEqual(easeQuadIn(".9"), easeQuadIn(0.9));
  assert.strictEqual(easeQuadIn({valueOf: function() { return 0.9; }}), easeQuadIn(0.9));
});

it("easeQuadOut(t) returns the expected results", () => {
  var quadOut = out(easeQuadIn);
  assertInDelta(easeQuadOut(0.0), quadOut(0.0));
  assertInDelta(easeQuadOut(0.1), quadOut(0.1));
  assertInDelta(easeQuadOut(0.2), quadOut(0.2));
  assertInDelta(easeQuadOut(0.3), quadOut(0.3));
  assertInDelta(easeQuadOut(0.4), quadOut(0.4));
  assertInDelta(easeQuadOut(0.5), quadOut(0.5));
  assertInDelta(easeQuadOut(0.6), quadOut(0.6));
  assertInDelta(easeQuadOut(0.7), quadOut(0.7));
  assertInDelta(easeQuadOut(0.8), quadOut(0.8));
  assertInDelta(easeQuadOut(0.9), quadOut(0.9));
  assertInDelta(easeQuadOut(1.0), quadOut(1.0));
});

it("easeQuadOut(t) coerces t to a number", () => {
  assert.strictEqual(easeQuadOut(".9"), easeQuadOut(0.9));
  assert.strictEqual(easeQuadOut({valueOf: function() { return 0.9; }}), easeQuadOut(0.9));
});

it("easeQuadInOut(t) returns the expected results", () => {
  var quadInOut = inOut(easeQuadIn);
  assertInDelta(easeQuadInOut(0.0), quadInOut(0.0));
  assertInDelta(easeQuadInOut(0.1), quadInOut(0.1));
  assertInDelta(easeQuadInOut(0.2), quadInOut(0.2));
  assertInDelta(easeQuadInOut(0.3), quadInOut(0.3));
  assertInDelta(easeQuadInOut(0.4), quadInOut(0.4));
  assertInDelta(easeQuadInOut(0.5), quadInOut(0.5));
  assertInDelta(easeQuadInOut(0.6), quadInOut(0.6));
  assertInDelta(easeQuadInOut(0.7), quadInOut(0.7));
  assertInDelta(easeQuadInOut(0.8), quadInOut(0.8));
  assertInDelta(easeQuadInOut(0.9), quadInOut(0.9));
  assertInDelta(easeQuadInOut(1.0), quadInOut(1.0));
});

it("easeQuadInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeQuadInOut(".9"), easeQuadInOut(0.9));
  assert.strictEqual(easeQuadInOut({valueOf: function() { return 0.9; }}), easeQuadInOut(0.9));
});
