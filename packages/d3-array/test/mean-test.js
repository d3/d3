import assert from "assert";
import {mean} from "../src/index.js";
import {OneTimeNumber} from "./OneTimeNumber.js";

it("mean(array) returns the mean value for numbers", () => {
  assert.strictEqual(mean([1]), 1);
  assert.strictEqual(mean([5, 1, 2, 3, 4]), 3);
  assert.strictEqual(mean([20, 3]), 11.5);
  assert.strictEqual(mean([3, 20]), 11.5);
});

it("mean(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(mean([NaN, 1, 2, 3, 4, 5]), 3);
  assert.strictEqual(mean([1, 2, 3, 4, 5, NaN]), 3);
  assert.strictEqual(mean([10, null, 3, undefined, 5, NaN]), 6);
});

it("mean(array) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(mean([]), undefined);
  assert.strictEqual(mean([null]), undefined);
  assert.strictEqual(mean([undefined]), undefined);
  assert.strictEqual(mean([NaN]), undefined);
  assert.strictEqual(mean([NaN, NaN]), undefined);
});

it("mean(array) coerces values to numbers", () => {
  assert.strictEqual(mean(["1"]), 1);
  assert.strictEqual(mean(["5", "1", "2", "3", "4"]), 3);
  assert.strictEqual(mean(["20", "3"]), 11.5);
  assert.strictEqual(mean(["3", "20"]), 11.5);
});

it("mean(array) coerces values exactly once", () => {
  const numbers = [1, new OneTimeNumber(3)];
  assert.strictEqual(mean(numbers), 2);
  assert.strictEqual(mean(numbers), 1);
});

it("mean(array, f) returns the mean value for numbers", () => {
  assert.strictEqual(mean([1].map(box), unbox), 1);
  assert.strictEqual(mean([5, 1, 2, 3, 4].map(box), unbox), 3);
  assert.strictEqual(mean([20, 3].map(box), unbox), 11.5);
  assert.strictEqual(mean([3, 20].map(box), unbox), 11.5);
});

it("mean(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(mean([NaN, 1, 2, 3, 4, 5].map(box), unbox), 3);
  assert.strictEqual(mean([1, 2, 3, 4, 5, NaN].map(box), unbox), 3);
  assert.strictEqual(mean([10, null, 3, undefined, 5, NaN].map(box), unbox), 6);
});

it("mean(array, f) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(mean([].map(box), unbox), undefined);
  assert.strictEqual(mean([null].map(box), unbox), undefined);
  assert.strictEqual(mean([undefined].map(box), unbox), undefined);
  assert.strictEqual(mean([NaN].map(box), unbox), undefined);
  assert.strictEqual(mean([NaN, NaN].map(box), unbox), undefined);
});

it("mean(array, f) coerces values to numbers", () => {
  assert.strictEqual(mean(["1"].map(box), unbox), 1);
  assert.strictEqual(mean(["5", "1", "2", "3", "4"].map(box), unbox), 3);
  assert.strictEqual(mean(["20", "3"].map(box), unbox), 11.5);
  assert.strictEqual(mean(["3", "20"].map(box), unbox), 11.5);
});

it("mean(array, f) coerces values exactly once", () => {
  const numbers = [1, new OneTimeNumber(3)].map(box);
  assert.strictEqual(mean(numbers, unbox), 2);
  assert.strictEqual(mean(numbers, unbox), 1);
});

it("mean(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const strings = ["a", "b", "c"];
  mean(strings, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, strings], ["b", 1, strings], ["c", 2, strings]]);
});

it("mean(array, f) uses the undefined context", () => {
  const results = [];
  mean([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
