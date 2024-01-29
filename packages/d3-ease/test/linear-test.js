import assert from "assert";
import {easeLinear} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("easeLinear(t) returns the expected results", () => {
  assert.strictEqual(easeLinear(0.0), 0.0);
  assertInDelta(easeLinear(0.1), 0.1);
  assertInDelta(easeLinear(0.2), 0.2);
  assertInDelta(easeLinear(0.3), 0.3);
  assertInDelta(easeLinear(0.4), 0.4);
  assertInDelta(easeLinear(0.5), 0.5);
  assertInDelta(easeLinear(0.6), 0.6);
  assertInDelta(easeLinear(0.7), 0.7);
  assertInDelta(easeLinear(0.8), 0.8);
  assertInDelta(easeLinear(0.9), 0.9);
  assert.strictEqual(easeLinear(1.0), 1.0);
});

it("easeLinear(t) coerces t to a number", () => {
  assert.strictEqual(easeLinear(".9"), easeLinear(0.9));
  assert.strictEqual(easeLinear({valueOf: function() { return 0.9; }}), easeLinear(0.9));
});
