import assert from "assert";
import {descending, scan} from "../src/index.js";

it("scan(array) compares using natural order", () => {
  assert.strictEqual(scan([0, 1]), 0);
  assert.strictEqual(scan([1, 0]), 1);
  assert.strictEqual(scan([0, "1"]), 0);
  assert.strictEqual(scan(["1", 0]), 1);
  assert.strictEqual(scan(["10", "2"]), 0);
  assert.strictEqual(scan(["2", "10"]), 1);
  assert.strictEqual(scan(["10", "2", NaN]), 0);
  assert.strictEqual(scan([NaN, "10", "2"]), 1);
  assert.strictEqual(scan(["2", NaN, "10"]), 2);
  assert.strictEqual(scan([2, NaN, 10]), 0);
  assert.strictEqual(scan([10, 2, NaN]), 1);
  assert.strictEqual(scan([NaN, 10, 2]), 2);
});

it("scan(array, compare) compares using the specified compare function", () => {
  var a = {name: "a"}, b = {name: "b"};
  assert.strictEqual(scan([a, b], (a, b) => a.name.localeCompare(b.name)), 0);
  assert.strictEqual(scan([1, 0], descending), 0);
  assert.strictEqual(scan(["1", 0], descending), 0);
  assert.strictEqual(scan(["2", "10"], descending), 0);
  assert.strictEqual(scan(["2", NaN, "10"], descending), 0);
  assert.strictEqual(scan([2, NaN, 10], descending), 2);
});

it("scan(array) returns undefined if the array is empty", () => {
  assert.strictEqual(scan([]), undefined);
});

it("scan(array) returns undefined if the array contains only incomparable values", () => {
  assert.strictEqual(scan([NaN, undefined]), undefined);
  assert.strictEqual(scan([NaN, "foo"], (a, b) => a - b), undefined);
});

it("scan(array) returns the first of equal values", () => {
  assert.strictEqual(scan([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  assert.strictEqual(scan([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], descending), 0);
});
