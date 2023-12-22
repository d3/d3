import assert from "assert";
import {variance} from "../src/index.js";

it("variance(array) returns the variance of the specified numbers", () => {
  assert.strictEqual(variance([5, 1, 2, 3, 4]), 2.5);
  assert.strictEqual(variance([20, 3]), 144.5);
  assert.strictEqual(variance([3, 20]), 144.5);
});

it("variance(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(variance([NaN, 1, 2, 3, 4, 5]), 2.5);
  assert.strictEqual(variance([1, 2, 3, 4, 5, NaN]), 2.5);
  assert.strictEqual(variance([10, null, 3, undefined, 5, NaN]), 13);
});

it("variance(array) can handle large numbers without overflowing", () => {
  assert.strictEqual(variance([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  assert.strictEqual(variance([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
});

it("variance(array) returns undefined if the array has fewer than two numbers", () => {
  assert.strictEqual(variance([1]), undefined);
  assert.strictEqual(variance([]), undefined);
  assert.strictEqual(variance([null]), undefined);
  assert.strictEqual(variance([undefined]), undefined);
  assert.strictEqual(variance([NaN]), undefined);
  assert.strictEqual(variance([NaN, NaN]), undefined);
});

it("variance(array, f) returns the variance of the specified numbers", () => {
  assert.strictEqual(variance([5, 1, 2, 3, 4].map(box), unbox), 2.5);
  assert.strictEqual(variance([20, 3].map(box), unbox), 144.5);
  assert.strictEqual(variance([3, 20].map(box), unbox), 144.5);
});

it("variance(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(variance([NaN, 1, 2, 3, 4, 5].map(box), unbox), 2.5);
  assert.strictEqual(variance([1, 2, 3, 4, 5, NaN].map(box), unbox), 2.5);
  assert.strictEqual(variance([10, null, 3, undefined, 5, NaN].map(box), unbox), 13);
});

it("variance(array, f) can handle large numbers without overflowing", () => {
  assert.strictEqual(variance([Number.MAX_VALUE, Number.MAX_VALUE].map(box), unbox), 0);
  assert.strictEqual(variance([-Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), 0);
});

it("variance(array, f) returns undefined if the array has fewer than two numbers", () => {
  assert.strictEqual(variance([1].map(box), unbox), undefined);
  assert.strictEqual(variance([].map(box), unbox), undefined);
  assert.strictEqual(variance([null].map(box), unbox), undefined);
  assert.strictEqual(variance([undefined].map(box), unbox), undefined);
  assert.strictEqual(variance([NaN].map(box), unbox), undefined);
  assert.strictEqual(variance([NaN, NaN].map(box), unbox), undefined);
});

it("variance(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  variance(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("variance(array, f) uses the undefined context", () => {
  const results = [];
  variance([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
