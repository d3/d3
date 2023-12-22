import assert from "assert";
import {easePoly, easePolyIn, easePolyInOut, easePolyOut} from "../src/index.js";
import {out, inOut} from "./generic.js"
import {assertInDelta} from "./asserts.js";

it("easePoly is an alias for easePolyInOut", () => {
  assert.strictEqual(easePoly, easePolyInOut);
});

it("easePolyIn(t) returns the expected results", () => {
  assert.strictEqual(easePolyIn(0.0), 0.000);
  assertInDelta(easePolyIn(0.1), 0.001);
  assertInDelta(easePolyIn(0.2), 0.008);
  assertInDelta(easePolyIn(0.3), 0.027);
  assertInDelta(easePolyIn(0.4), 0.064);
  assertInDelta(easePolyIn(0.5), 0.125);
  assertInDelta(easePolyIn(0.6), 0.216);
  assertInDelta(easePolyIn(0.7), 0.343);
  assertInDelta(easePolyIn(0.8), 0.512);
  assertInDelta(easePolyIn(0.9), 0.729);
  assert.strictEqual(easePolyIn(1.0), 1.000);
});

it("easePolyIn(t) coerces t to a number", () => {
  assert.strictEqual(easePolyIn(".9"), easePolyIn(0.9));
  assert.strictEqual(easePolyIn({valueOf: function() { return 0.9; }}), easePolyIn(0.9));
});

it("easePolyIn(t) is the same as polyIn.exponent(3)(t)", () => {
  assert.strictEqual(easePolyIn(0.1), easePolyIn.exponent(3)(0.1));
  assert.strictEqual(easePolyIn(0.2), easePolyIn.exponent(3)(0.2));
  assert.strictEqual(easePolyIn(0.3), easePolyIn.exponent(3)(0.3));
});

it("easePolyIn.exponent(e)(t) coerces t and e to numbers", () => {
  assert.strictEqual(easePolyIn.exponent("1.3")(".9"), easePolyIn.exponent(1.3)(0.9));
  assert.strictEqual(easePolyIn.exponent({valueOf: function() { return 1.3; }})({valueOf: function() { return 0.9; }}), easePolyIn.exponent(1.3)(0.9));
});

it("easePolyIn.exponent(2.5)(t) returns the expected results", () => {
  assert.strictEqual(easePolyIn.exponent(2.5)(0.0), 0.000000);
  assertInDelta(easePolyIn.exponent(2.5)(0.1), 0.003162);
  assertInDelta(easePolyIn.exponent(2.5)(0.2), 0.017889);
  assertInDelta(easePolyIn.exponent(2.5)(0.3), 0.049295);
  assertInDelta(easePolyIn.exponent(2.5)(0.4), 0.101193);
  assertInDelta(easePolyIn.exponent(2.5)(0.5), 0.176777);
  assertInDelta(easePolyIn.exponent(2.5)(0.6), 0.278855);
  assertInDelta(easePolyIn.exponent(2.5)(0.7), 0.409963);
  assertInDelta(easePolyIn.exponent(2.5)(0.8), 0.572433);
  assertInDelta(easePolyIn.exponent(2.5)(0.9), 0.768433);
  assert.strictEqual(easePolyIn.exponent(2.5)(1.0), 1.000000);
});

it("easePolyOut.exponent(e)(t) coerces t and e to numbers", () => {
  assert.strictEqual(easePolyOut.exponent("1.3")(".9"), easePolyOut.exponent(1.3)(0.9));
  assert.strictEqual(easePolyOut.exponent({valueOf: function() { return 1.3; }})({valueOf: function() { return 0.9; }}), easePolyOut.exponent(1.3)(0.9));
});

it("easePolyOut(t) is the same as polyOut.exponent(3)(t)", () => {
  assert.strictEqual(easePolyOut(0.1), easePolyOut.exponent(3)(0.1));
  assert.strictEqual(easePolyOut(0.2), easePolyOut.exponent(3)(0.2));
  assert.strictEqual(easePolyOut(0.3), easePolyOut.exponent(3)(0.3));
});

it("easePolyOut(t, null) is the same as polyOut.exponent(3)(t)", () => {
  assert.strictEqual(easePolyOut(0.1, null), easePolyOut.exponent(3)(0.1));
  assert.strictEqual(easePolyOut(0.2, null), easePolyOut.exponent(3)(0.2));
  assert.strictEqual(easePolyOut(0.3, null), easePolyOut.exponent(3)(0.3));
});

it("easePolyOut(t, undefined) is the same as polyOut.exponent(3)(t)", () => {
  assert.strictEqual(easePolyOut(0.1, undefined), easePolyOut.exponent(3)(0.1));
  assert.strictEqual(easePolyOut(0.2, undefined), easePolyOut.exponent(3)(0.2));
  assert.strictEqual(easePolyOut(0.3, undefined), easePolyOut.exponent(3)(0.3));
});

it("easePolyOut.exponent(2.5)(t) returns the expected results", () => {
  const polyOut = out(easePolyIn.exponent(2.5));
  assert.strictEqual(easePolyOut.exponent(2.5)(0.0), polyOut(0.0));
  assertInDelta(easePolyOut.exponent(2.5)(0.1), polyOut(0.1));
  assertInDelta(easePolyOut.exponent(2.5)(0.2), polyOut(0.2));
  assertInDelta(easePolyOut.exponent(2.5)(0.3), polyOut(0.3));
  assertInDelta(easePolyOut.exponent(2.5)(0.4), polyOut(0.4));
  assertInDelta(easePolyOut.exponent(2.5)(0.5), polyOut(0.5));
  assertInDelta(easePolyOut.exponent(2.5)(0.6), polyOut(0.6));
  assertInDelta(easePolyOut.exponent(2.5)(0.7), polyOut(0.7));
  assertInDelta(easePolyOut.exponent(2.5)(0.8), polyOut(0.8));
  assertInDelta(easePolyOut.exponent(2.5)(0.9), polyOut(0.9));
  assert.strictEqual(easePolyOut.exponent(2.5)(1.0), polyOut(1.0));
});

it("easePolyInOut.exponent(e)(t) coerces t and e to numbers", () => {
  assert.strictEqual(easePolyInOut.exponent("1.3")(".9"), easePolyInOut.exponent(1.3)(0.9));
  assert.strictEqual(easePolyInOut.exponent({valueOf: function() { return 1.3; }})({valueOf: function() { return 0.9; }}), easePolyInOut.exponent(1.3)(0.9));
});

it("easePolyInOut(t) is the same as polyInOut.exponent(3)(t)", () => {
  assert.strictEqual(easePolyInOut(0.1), easePolyInOut.exponent(3)(0.1));
  assert.strictEqual(easePolyInOut(0.2), easePolyInOut.exponent(3)(0.2));
  assert.strictEqual(easePolyInOut(0.3), easePolyInOut.exponent(3)(0.3));
});

it("easePolyInOut.exponent(2.5)(t) returns the expected results", () => {
  const polyInOut = inOut(easePolyIn.exponent(2.5));
  assertInDelta(easePolyInOut.exponent(2.5)(0.0), polyInOut(0.0));
  assertInDelta(easePolyInOut.exponent(2.5)(0.1), polyInOut(0.1));
  assertInDelta(easePolyInOut.exponent(2.5)(0.2), polyInOut(0.2));
  assertInDelta(easePolyInOut.exponent(2.5)(0.3), polyInOut(0.3));
  assertInDelta(easePolyInOut.exponent(2.5)(0.4), polyInOut(0.4));
  assertInDelta(easePolyInOut.exponent(2.5)(0.5), polyInOut(0.5));
  assertInDelta(easePolyInOut.exponent(2.5)(0.6), polyInOut(0.6));
  assertInDelta(easePolyInOut.exponent(2.5)(0.7), polyInOut(0.7));
  assertInDelta(easePolyInOut.exponent(2.5)(0.8), polyInOut(0.8));
  assertInDelta(easePolyInOut.exponent(2.5)(0.9), polyInOut(0.9));
  assertInDelta(easePolyInOut.exponent(2.5)(1.0), polyInOut(1.0));
});
