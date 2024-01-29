import assert from "assert";
import {minIndex} from "../src/index.js";

it("minIndex(array) returns the index of the least numeric value for numbers", () => {
  assert.deepStrictEqual(minIndex([1]), 0);
  assert.deepStrictEqual(minIndex([5, 1, 2, 3, 4]), 1);
  assert.deepStrictEqual(minIndex([20, 3]), 1);
  assert.deepStrictEqual(minIndex([3, 20]), 0);
});

it("minIndex(array) returns the index of the least lexicographic value for strings", () => {
  assert.deepStrictEqual(minIndex(["c", "a", "b"]), 1);
  assert.deepStrictEqual(minIndex(["20", "3"]), 0);
  assert.deepStrictEqual(minIndex(["3", "20"]), 1);
});

it("minIndex(array) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepStrictEqual(minIndex([NaN, 1, 2, 3, 4, 5]), 1);
  assert.deepStrictEqual(minIndex([o, 1, 2, 3, 4, 5]), 1);
  assert.deepStrictEqual(minIndex([1, 2, 3, 4, 5, NaN]), 0);
  assert.deepStrictEqual(minIndex([1, 2, 3, 4, 5, o]), 0);
  assert.deepStrictEqual(minIndex([10, null, 3, undefined, 5, NaN]), 2);
  assert.deepStrictEqual(minIndex([-1, null, -3, undefined, -5, NaN]), 4);
});

it("minIndex(array) compares heterogenous types as numbers", () => {
  assert.strictEqual(minIndex([20, "3"]), 1);
  assert.strictEqual(minIndex(["20", 3]), 1);
  assert.strictEqual(minIndex([3, "20"]), 0);
  assert.strictEqual(minIndex(["3", 20]), 0);
});

it("minIndex(array) returns -1 if the array contains no numbers", () => {
  assert.strictEqual(minIndex([]), -1);
  assert.strictEqual(minIndex([null]), -1);
  assert.strictEqual(minIndex([undefined]), -1);
  assert.strictEqual(minIndex([NaN]), -1);
  assert.strictEqual(minIndex([NaN, NaN]), -1);
});

it("minIndex(array, f) returns the index of the least numeric value for numbers", () => {
  assert.deepStrictEqual(minIndex([1].map(box), unbox), 0);
  assert.deepStrictEqual(minIndex([5, 1, 2, 3, 4].map(box), unbox), 1);
  assert.deepStrictEqual(minIndex([20, 3].map(box), unbox), 1);
  assert.deepStrictEqual(minIndex([3, 20].map(box), unbox), 0);
});

it("minIndex(array, f) returns the index of the least lexicographic value for strings", () => {
  assert.deepStrictEqual(minIndex(["c", "a", "b"].map(box), unbox), 1);
  assert.deepStrictEqual(minIndex(["20", "3"].map(box), unbox), 0);
  assert.deepStrictEqual(minIndex(["3", "20"].map(box), unbox), 1);
});

it("minIndex(array, f) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepStrictEqual(minIndex([NaN, 1, 2, 3, 4, 5].map(box), unbox), 1);
  assert.deepStrictEqual(minIndex([o, 1, 2, 3, 4, 5].map(box), unbox), 1);
  assert.deepStrictEqual(minIndex([1, 2, 3, 4, 5, NaN].map(box), unbox), 0);
  assert.deepStrictEqual(minIndex([1, 2, 3, 4, 5, o].map(box), unbox), 0);
  assert.deepStrictEqual(minIndex([10, null, 3, undefined, 5, NaN].map(box), unbox), 2);
  assert.deepStrictEqual(minIndex([-1, null, -3, undefined, -5, NaN].map(box), unbox), 4);
});

it("minIndex(array, f) compares heterogenous types as numbers", () => {
  assert.strictEqual(minIndex([20, "3"].map(box), unbox), 1);
  assert.strictEqual(minIndex(["20", 3].map(box), unbox), 1);
  assert.strictEqual(minIndex([3, "20"].map(box), unbox), 0);
  assert.strictEqual(minIndex(["3", 20].map(box), unbox), 0);
});

it("minIndex(array, f) returns -1 if the array contains no observed values", () => {
  assert.strictEqual(minIndex([].map(box), unbox), -1);
  assert.strictEqual(minIndex([null].map(box), unbox), -1);
  assert.strictEqual(minIndex([undefined].map(box), unbox), -1);
  assert.strictEqual(minIndex([NaN].map(box), unbox), -1);
  assert.strictEqual(minIndex([NaN, NaN].map(box), unbox), -1);
});

it("minIndex(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  minIndex(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("minIndex(array, f) uses the undefined context", () => {
  const results = [];
  minIndex([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
