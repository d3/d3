import assert from "assert";
import {easeExp, easeExpIn, easeExpInOut, easeExpOut} from "../src/index.js";
import {out, inOut} from "./generic.js";
import {assertInDelta} from "./asserts.js";

it("easeExp is an alias for easeExpInOut", () => {
  assert.strictEqual(easeExp, easeExpInOut);
});

it("easeExpIn(t) returns the expected results", () => {
  assert.strictEqual(easeExpIn(0.0), 0.000000);
  assertInDelta(easeExpIn(0.1), 0.000978);
  assertInDelta(easeExpIn(0.2), 0.002933);
  assertInDelta(easeExpIn(0.3), 0.006843);
  assertInDelta(easeExpIn(0.4), 0.014663);
  assertInDelta(easeExpIn(0.5), 0.030303);
  assertInDelta(easeExpIn(0.6), 0.061584);
  assertInDelta(easeExpIn(0.7), 0.124145);
  assertInDelta(easeExpIn(0.8), 0.249267);
  assertInDelta(easeExpIn(0.9), 0.499511);
  assert.strictEqual(easeExpIn(1.0), 1.000000);
});

it("easeExpIn(t) coerces t to a number", () => {
  assert.strictEqual(easeExpIn(".9"), easeExpIn(0.9));
  assert.strictEqual(easeExpIn({valueOf: function() { return 0.9; }}), easeExpIn(0.9));
});

it("easeExpOut(t) returns the expected results", () => {
  const expOut = out(easeExpIn);
  assertInDelta(easeExpOut(0.0), expOut(0.0));
  assertInDelta(easeExpOut(0.1), expOut(0.1));
  assertInDelta(easeExpOut(0.2), expOut(0.2));
  assertInDelta(easeExpOut(0.3), expOut(0.3));
  assertInDelta(easeExpOut(0.4), expOut(0.4));
  assertInDelta(easeExpOut(0.5), expOut(0.5));
  assertInDelta(easeExpOut(0.6), expOut(0.6));
  assertInDelta(easeExpOut(0.7), expOut(0.7));
  assertInDelta(easeExpOut(0.8), expOut(0.8));
  assertInDelta(easeExpOut(0.9), expOut(0.9));
  assertInDelta(easeExpOut(1.0), expOut(1.0));
});

it("easeExpOut(t) coerces t to a number", () => {
  assert.strictEqual(easeExpOut(".9"), easeExpOut(0.9));
  assert.strictEqual(easeExpOut({valueOf: function() { return 0.9; }}), easeExpOut(0.9));
});

it("easeExpInOut(t) returns the expected results", () => {
  const expInOut = inOut(easeExpIn);
  assert.strictEqual(easeExpInOut(0.0), expInOut(0.0));
  assertInDelta(easeExpInOut(0.1), expInOut(0.1));
  assertInDelta(easeExpInOut(0.2), expInOut(0.2));
  assertInDelta(easeExpInOut(0.3), expInOut(0.3));
  assertInDelta(easeExpInOut(0.4), expInOut(0.4));
  assertInDelta(easeExpInOut(0.5), expInOut(0.5));
  assertInDelta(easeExpInOut(0.6), expInOut(0.6));
  assertInDelta(easeExpInOut(0.7), expInOut(0.7));
  assertInDelta(easeExpInOut(0.8), expInOut(0.8));
  assertInDelta(easeExpInOut(0.9), expInOut(0.9));
  assert.strictEqual(easeExpInOut(1.0), expInOut(1.0));
});

it("easeExpInOut(t) coerces t to a number", () => {
  assert.strictEqual(easeExpInOut(".9"), easeExpInOut(0.9));
  assert.strictEqual(easeExpInOut({valueOf: function() { return 0.9; }}), easeExpInOut(0.9));
});
