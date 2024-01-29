import assert from "assert";
import {cumsum} from "../src/index.js";

it("cumsum(array) returns the cumulative sum of the specified numbers", () => {
  assert.deepStrictEqual(Array.from(cumsum([1])), [1]);
  assert.deepStrictEqual(Array.from(cumsum([5, 1, 2, 3, 4])), [5, 6, 8, 11, 15]);
  assert.deepStrictEqual(Array.from(cumsum([20, 3])), [20, 23]);
  assert.deepStrictEqual(Array.from(cumsum([3, 20])), [3, 23]);
});

it("cumsum(array) observes values that can be coerced to numbers", () => {
  assert.deepStrictEqual(Array.from(cumsum(["20", "3"])), [20, 23]);
  assert.deepStrictEqual(Array.from(cumsum(["3", "20"])), [3, 23]);
  assert.deepStrictEqual(Array.from(cumsum(["3", 20])), [3, 23]);
  assert.deepStrictEqual(Array.from(cumsum([20, "3"])), [20, 23]);
  assert.deepStrictEqual(Array.from(cumsum([3, "20"])), [3, 23]);
  assert.deepStrictEqual(Array.from(cumsum(["20", 3])), [20, 23]);
});

it("cumsum(array) ignores non-numeric values", () => {
  assert.deepStrictEqual(Array.from(cumsum(["a", "b", "c"])), [0, 0, 0]);
  assert.deepStrictEqual(Array.from(cumsum(["a", 1, "2"])), [0, 1, 3]);
});

it("cumsum(array) ignores null, undefined and NaN", () => {
  assert.deepStrictEqual(Array.from(cumsum([NaN, 1, 2, 3, 4, 5])), [0, 1, 3, 6, 10, 15]);
  assert.deepStrictEqual(Array.from(cumsum([1, 2, 3, 4, 5, NaN])), [1, 3, 6, 10, 15, 15]);
  assert.deepStrictEqual(Array.from(cumsum([10, null, 3, undefined, 5, NaN])), [10, 10, 13, 13, 18, 18]);
});

it("cumsum(array) returns zeros if there are no numbers", () => {
  assert.deepStrictEqual(Array.from(cumsum([])), []);
  assert.deepStrictEqual(Array.from(cumsum([NaN])), [0]);
  assert.deepStrictEqual(Array.from(cumsum([undefined])), [0]);
  assert.deepStrictEqual(Array.from(cumsum([undefined, NaN])), [0, 0]);
  assert.deepStrictEqual(Array.from(cumsum([undefined, NaN, {}])), [0, 0, 0]);
});

it("cumsum(array, f) returns the cumsum of the specified numbers", () => {
  assert.deepStrictEqual(Array.from(cumsum([1].map(box), unbox)), [1]);
  assert.deepStrictEqual(Array.from(cumsum([5, 1, 2, 3, 4].map(box), unbox)), [5, 6, 8, 11, 15]);
  assert.deepStrictEqual(Array.from(cumsum([20, 3].map(box), unbox)), [20, 23]);
  assert.deepStrictEqual(Array.from(cumsum([3, 20].map(box), unbox)), [3, 23]);
});

it("cumsum(array, f) observes values that can be coerced to numbers", () => {
  assert.deepStrictEqual(Array.from(cumsum(["20", "3"].map(box), unbox)), [20, 23]);
  assert.deepStrictEqual(Array.from(cumsum(["3", "20"].map(box), unbox)), [3, 23]);
  assert.deepStrictEqual(Array.from(cumsum(["3", 20].map(box), unbox)), [3, 23]);
  assert.deepStrictEqual(Array.from(cumsum([20, "3"].map(box), unbox)), [20, 23]);
  assert.deepStrictEqual(Array.from(cumsum([3, "20"].map(box), unbox)), [3, 23]);
  assert.deepStrictEqual(Array.from(cumsum(["20", 3].map(box), unbox)), [20, 23]);
});

it("cumsum(array, f) ignores non-numeric values", () => {
  assert.deepStrictEqual(Array.from(cumsum(["a", "b", "c"].map(box), unbox)), [0, 0, 0]);
  assert.deepStrictEqual(Array.from(cumsum(["a", 1, "2"].map(box), unbox)), [0, 1, 3]);
});

it("cumsum(array, f) ignores null, undefined and NaN", () => {
  assert.deepStrictEqual(Array.from(cumsum([NaN, 1, 2, 3, 4, 5].map(box), unbox)), [0, 1, 3, 6, 10, 15]);
  assert.deepStrictEqual(Array.from(cumsum([1, 2, 3, 4, 5, NaN].map(box), unbox)), [1, 3, 6, 10, 15, 15]);
  assert.deepStrictEqual(Array.from(cumsum([10, null, 3, undefined, 5, NaN].map(box), unbox)), [10, 10, 13, 13, 18, 18]);
});

it("cumsum(array, f) returns zeros if there are no numbers", () => {
  assert.deepStrictEqual(Array.from(cumsum([].map(box), unbox)), []);
  assert.deepStrictEqual(Array.from(cumsum([NaN].map(box), unbox)), [0]);
  assert.deepStrictEqual(Array.from(cumsum([undefined].map(box), unbox)), [0]);
  assert.deepStrictEqual(Array.from(cumsum([undefined, NaN].map(box), unbox)), [0, 0]);
  assert.deepStrictEqual(Array.from(cumsum([undefined, NaN, {}].map(box), unbox)), [0, 0, 0]);
});

it("cumsum(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  cumsum(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("cumsum(array, f) uses the undefined context", () => {
  const results = [];
  cumsum([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
