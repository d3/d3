import assert from "assert";
import {ascending, descending, greatestIndex} from "../src/index.js";

it("greatestIndex(array) compares using natural order", () => {
  assert.strictEqual(greatestIndex([0, 1]), 1);
  assert.strictEqual(greatestIndex([1, 0]), 0);
  assert.strictEqual(greatestIndex([0, "1"]), 1);
  assert.strictEqual(greatestIndex(["1", 0]), 0);
  assert.strictEqual(greatestIndex(["10", "2"]), 1);
  assert.strictEqual(greatestIndex(["2", "10"]), 0);
  assert.strictEqual(greatestIndex(["10", "2", NaN]), 1);
  assert.strictEqual(greatestIndex([NaN, "10", "2"]), 2);
  assert.strictEqual(greatestIndex(["2", NaN, "10"]), 0);
  assert.strictEqual(greatestIndex([2, NaN, 10]), 2);
  assert.strictEqual(greatestIndex([10, 2, NaN]), 0);
  assert.strictEqual(greatestIndex([NaN, 10, 2]), 1);
});

it("greatestIndex(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.strictEqual(greatestIndex([a, b], (a, b) => a.name.localeCompare(b.name)), 1);
  assert.strictEqual(greatestIndex([1, 0], ascending), 0);
  assert.strictEqual(greatestIndex(["1", 0], ascending), 0);
  assert.strictEqual(greatestIndex(["2", "10"], ascending), 0);
  assert.strictEqual(greatestIndex(["2", NaN, "10"], ascending), 0);
  assert.strictEqual(greatestIndex([2, NaN, 10], ascending), 2);
});

it("greatestIndex(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(greatestIndex([a, b], d => d.name), 1);
  assert.deepStrictEqual(greatestIndex([a, b], d => d.v), 0);
});

it("greatestIndex(array) returns -1 if the array is empty", () => {
  assert.strictEqual(greatestIndex([]), -1);
});

it("greatestIndex(array) returns -1 if the array contains only incomparable values", () => {
  assert.strictEqual(greatestIndex([NaN, undefined]), -1);
  assert.strictEqual(greatestIndex([NaN, "foo"], (a, b) => a - b), -1);
});

it("greatestIndex(array) returns the first of equal values", () => {
  assert.strictEqual(greatestIndex([-2, -2, -1, -1, 0, 0, 0, -3, 0]), 4);
  assert.strictEqual(greatestIndex([-3, -2, -2, -1, -1, 0, 0, 0, -3, 0], descending), 0);
});

it("greatestIndex(array) ignores null and undefined", () => {
  assert.deepStrictEqual(greatestIndex([null, -2, undefined]), 1);
});

it("greatestIndex(array, accessor) ignores null and undefined", () => {
  assert.deepStrictEqual(greatestIndex([null, -2, undefined], d => d), 1);
});
