import assert from "assert";
import {descending, least} from "../src/index.js";

it("least(array) compares using natural order", () => {
  assert.strictEqual(least([0, 1]), 0);
  assert.strictEqual(least([1, 0]), 0);
  assert.strictEqual(least([0, "1"]), 0);
  assert.strictEqual(least(["1", 0]), 0);
  assert.strictEqual(least(["10", "2"]), "10");
  assert.strictEqual(least(["2", "10"]), "10");
  assert.strictEqual(least(["10", "2", NaN]), "10");
  assert.strictEqual(least([NaN, "10", "2"]), "10");
  assert.strictEqual(least(["2", NaN, "10"]), "10");
  assert.strictEqual(least([2, NaN, 10]), 2);
  assert.strictEqual(least([10, 2, NaN]), 2);
  assert.strictEqual(least([NaN, 10, 2]), 2);
});

it("least(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.deepStrictEqual(least([a, b], (a, b) => a.name.localeCompare(b.name)), {name: "a"});
  assert.strictEqual(least([1, 0], descending), 1);
  assert.strictEqual(least(["1", 0], descending), "1");
  assert.strictEqual(least(["2", "10"], descending), "2");
  assert.strictEqual(least(["2", NaN, "10"], descending), "2");
  assert.strictEqual(least([2, NaN, 10], descending), 10);
});

it("least(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(least([a, b], d => d.name), a);
  assert.deepStrictEqual(least([a, b], d => d.v), b);
});

it("least(array) returns undefined if the array is empty", () => {
  assert.strictEqual(least([]), undefined);
});

it("least(array) returns undefined if the array contains only incomparable values", () => {
  assert.strictEqual(least([NaN, undefined]), undefined);
  assert.strictEqual(least([NaN, "foo"], (a, b) => a - b), undefined);
});

it("least(array) returns the first of equal values", () => {
  assert.deepStrictEqual(least([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 0, index: 4});
  assert.deepStrictEqual(least([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 3, index: 0});
});

it("least(array) ignores null and undefined", () => {
  assert.deepStrictEqual(least([null, 2, undefined]), 2);
});

it("least(array, accessor) ignores null and undefined", () => {
  assert.deepStrictEqual(least([null, 2, undefined], d => d), 2);
});

function box(value, index) {
  return {value, index};
}

function ascendingValue(a, b) {
  return a.value - b.value;
}

function descendingValue(a, b) {
  return b.value - a.value;
}
