import assert from "assert";
import {descending, leastIndex} from "../src/index.js";

it("leastIndex(array) compares using natural order", () => {
  assert.strictEqual(leastIndex([0, 1]), 0);
  assert.strictEqual(leastIndex([1, 0]), 1);
  assert.strictEqual(leastIndex([0, "1"]), 0);
  assert.strictEqual(leastIndex(["1", 0]), 1);
  assert.strictEqual(leastIndex(["10", "2"]), 0);
  assert.strictEqual(leastIndex(["2", "10"]), 1);
  assert.strictEqual(leastIndex(["10", "2", NaN]), 0);
  assert.strictEqual(leastIndex([NaN, "10", "2"]), 1);
  assert.strictEqual(leastIndex(["2", NaN, "10"]), 2);
  assert.strictEqual(leastIndex([2, NaN, 10]), 0);
  assert.strictEqual(leastIndex([10, 2, NaN]), 1);
  assert.strictEqual(leastIndex([NaN, 10, 2]), 2);
});

it("leastIndex(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.strictEqual(leastIndex([a, b], (a, b) => a.name.localeCompare(b.name)), 0);
  assert.strictEqual(leastIndex([1, 0], descending), 0);
  assert.strictEqual(leastIndex(["1", 0], descending), 0);
  assert.strictEqual(leastIndex(["2", "10"], descending), 0);
  assert.strictEqual(leastIndex(["2", NaN, "10"], descending), 0);
  assert.strictEqual(leastIndex([2, NaN, 10], descending), 2);
});

it("leastIndex(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(leastIndex([a, b], d => d.name), 0);
  assert.deepStrictEqual(leastIndex([a, b], d => d.v), 1);
});

it("leastIndex(array) returns -1 if the array is empty", () => {
  assert.strictEqual(leastIndex([]), -1);
});

it("leastIndex(array) returns -1 if the array contains only incomparable values", () => {
  assert.strictEqual(leastIndex([NaN, undefined]), -1);
  assert.strictEqual(leastIndex([NaN, "foo"], (a, b) => a - b), -1);
});

it("leastIndex(array) returns the first of equal values", () => {
  assert.strictEqual(leastIndex([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  assert.strictEqual(leastIndex([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], descending), 0);
});

it("leastIndex(array) ignores null and undefined", () => {
  assert.deepStrictEqual(leastIndex([null, 2, undefined]), 1);
});

it("leastIndex(array, accessor) ignores null and undefined", () => {
  assert.deepStrictEqual(leastIndex([null, 2, undefined], d => d), 1);
});
