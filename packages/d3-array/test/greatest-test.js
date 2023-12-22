import assert from "assert";
import {descending, greatest} from "../src/index.js";

it("greatest(array) compares using natural order", () => {
  assert.strictEqual(greatest([0, 1]), 1);
  assert.strictEqual(greatest([1, 0]), 1);
  assert.strictEqual(greatest([0, "1"]), "1");
  assert.strictEqual(greatest(["1", 0]), "1");
  assert.strictEqual(greatest(["10", "2"]), "2");
  assert.strictEqual(greatest(["2", "10"]), "2");
  assert.strictEqual(greatest(["10", "2", NaN]), "2");
  assert.strictEqual(greatest([NaN, "10", "2"]), "2");
  assert.strictEqual(greatest(["2", NaN, "10"]), "2");
  assert.strictEqual(greatest([2, NaN, 10]), 10);
  assert.strictEqual(greatest([10, 2, NaN]), 10);
  assert.strictEqual(greatest([NaN, 10, 2]), 10);
});

it("greatest(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.deepStrictEqual(greatest([a, b], (a, b) => a.name.localeCompare(b.name)), {name: "b"});
  assert.strictEqual(greatest([1, 0], descending), 0);
  assert.strictEqual(greatest(["1", 0], descending), 0);
  assert.strictEqual(greatest(["2", "10"], descending), "10");
  assert.strictEqual(greatest(["2", NaN, "10"], descending), "10");
  assert.strictEqual(greatest([2, NaN, 10], descending), 2);
});

it("greatest(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(greatest([a, b], d => d.name), b);
  assert.deepStrictEqual(greatest([a, b], d => d.v), a);
});

it("greatest(array) returns undefined if the array is empty", () => {
  assert.strictEqual(greatest([]), undefined);
});

it("greatest(array) returns undefined if the array contains only incomparable values", () => {
  assert.strictEqual(greatest([NaN, undefined]), undefined);
  assert.strictEqual(greatest([NaN, "foo"], (a, b) => a - b), undefined);
});

it("greatest(array) returns the first of equal values", () => {
  assert.deepStrictEqual(greatest([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 0, index: 4});
  assert.deepStrictEqual(greatest([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 3, index: 0});
});

it("greatest(array) ignores null and undefined", () => {
  assert.deepStrictEqual(greatest([null, -2, undefined]), -2);
});

it("greatest(array, accessor) ignores null and undefined", () => {
  assert.deepStrictEqual(greatest([null, -2, undefined], d => d), -2);
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
