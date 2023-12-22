import assert from "assert";
import {ascending} from "../src/index.js";

it("ascending(a, b) returns a negative number if a < b", () => {
  assert(ascending(0, 1) < 0);
  assert(ascending("a", "b") < 0);
});

it("ascending(a, b) returns a positive number if a > b", () => {
  assert(ascending(1, 0) > 0);
  assert(ascending("b", "a") > 0);
});

it("ascending(a, b) returns zero if a >= b and a <= b", () => {
  assert.strictEqual(ascending(0, 0), 0);
  assert.strictEqual(ascending("a", "a"), 0);
  assert.strictEqual(ascending("0", 0), 0);
  assert.strictEqual(ascending(0, "0"), 0);
});

it("ascending(a, b) returns NaN if a and b are not comparable", () => {
  assert(isNaN(ascending(0, undefined)));
  assert(isNaN(ascending(undefined, 0)));
  assert(isNaN(ascending(undefined, undefined)));
  assert(isNaN(ascending(0, NaN)));
  assert(isNaN(ascending(NaN, 0)));
  assert(isNaN(ascending(NaN, NaN)));
});
