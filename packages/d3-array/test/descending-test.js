import assert from "assert";
import {descending} from "../src/index.js";

it("descending(a, b) returns a positive number if a < b", () => {
  assert(descending(0, 1) > 0);
  assert(descending("a", "b") > 0);
});

it("descending(a, b) returns a negative number if a > b", () => {
  assert(descending(1, 0) < 0);
  assert(descending("b", "a") < 0);
});

it("descending(a, b) returns zero if a >= b and a <= b", () => {
  assert.strictEqual(descending(0, 0), 0);
  assert.strictEqual(descending("a", "a"), 0);
  assert.strictEqual(descending("0", 0), 0);
  assert.strictEqual(descending(0, "0"), 0);
});

it("descending(a, b) returns NaN if a and b are not comparable", () => {
  assert(isNaN(descending(0, undefined)));
  assert(isNaN(descending(undefined, 0)));
  assert(isNaN(descending(undefined, undefined)));
  assert(isNaN(descending(0, NaN)));
  assert(isNaN(descending(NaN, 0)));
  assert(isNaN(descending(NaN, NaN)));
});
