import assert from "assert";
import {median, medianIndex} from "../src/index.js";
import {OneTimeNumber} from "./OneTimeNumber.js";

it("median(array) returns the median value for numbers", () => {
  assert.strictEqual(median([1]), 1);
  assert.strictEqual(median([5, 1, 2, 3]), 2.5);
  assert.strictEqual(median([5, 1, 2, 3, 4]), 3);
  assert.strictEqual(median([20, 3]), 11.5);
  assert.strictEqual(median([3, 20]), 11.5);
});

it("median(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(median([NaN, 1, 2, 3, 4, 5]), 3);
  assert.strictEqual(median([1, 2, 3, 4, 5, NaN]), 3);
  assert.strictEqual(median([10, null, 3, undefined, 5, NaN]), 5);
});

it("median(array) can handle large numbers without overflowing", () => {
  assert.strictEqual(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
  assert.strictEqual(median([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE);
});

it("median(array) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(median([]), undefined);
  assert.strictEqual(median([null]), undefined);
  assert.strictEqual(median([undefined]), undefined);
  assert.strictEqual(median([NaN]), undefined);
  assert.strictEqual(median([NaN, NaN]), undefined);
});

it("median(array) coerces strings to numbers", () => {
  assert.strictEqual(median(["1"]), 1);
  assert.strictEqual(median(["5", "1", "2", "3", "4"]), 3);
  assert.strictEqual(median(["20", "3"]), 11.5);
  assert.strictEqual(median(["3", "20"]), 11.5);
  assert.strictEqual(median(["2", "3", "20"]), 3);
  assert.strictEqual(median(["20", "3", "2"]), 3);
});

it("median(array) coerces values exactly once", () => {
  const array = [1, new OneTimeNumber(3)];
  assert.strictEqual(median(array), 2);
  assert.strictEqual(median(array), 1);
});

it("median(array, f) returns the median value for numbers", () => {
  assert.strictEqual(median([1].map(box), unbox), 1);
  assert.strictEqual(median([5, 1, 2, 3, 4].map(box), unbox), 3);
  assert.strictEqual(median([20, 3].map(box), unbox), 11.5);
  assert.strictEqual(median([3, 20].map(box), unbox), 11.5);
});

it("median(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(median([NaN, 1, 2, 3, 4, 5].map(box), unbox), 3);
  assert.strictEqual(median([1, 2, 3, 4, 5, NaN].map(box), unbox), 3);
  assert.strictEqual(median([10, null, 3, undefined, 5, NaN].map(box), unbox), 5);
});

it("median(array, f) can handle large numbers without overflowing", () => {
  assert.strictEqual(median([Number.MAX_VALUE, Number.MAX_VALUE].map(box), unbox), Number.MAX_VALUE);
  assert.strictEqual(median([-Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), -Number.MAX_VALUE);
});

it("median(array, f) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(median([].map(box), unbox), undefined);
  assert.strictEqual(median([null].map(box), unbox), undefined);
  assert.strictEqual(median([undefined].map(box), unbox), undefined);
  assert.strictEqual(median([NaN].map(box), unbox), undefined);
  assert.strictEqual(median([NaN, NaN].map(box), unbox), undefined);
});

it("median(array, f) coerces strings to numbers", () => {
  assert.strictEqual(median(["1"].map(box), unbox), 1);
  assert.strictEqual(median(["5", "1", "2", "3", "4"].map(box), unbox), 3);
  assert.strictEqual(median(["20", "3"].map(box), unbox), 11.5);
  assert.strictEqual(median(["3", "20"].map(box), unbox), 11.5);
  assert.strictEqual(median(["2", "3", "20"].map(box), unbox), 3);
  assert.strictEqual(median(["20", "3", "2"].map(box), unbox), 3);
});

it("median(array, f) coerces values exactly once", () => {
  const array = [1, new OneTimeNumber(3)].map(box);
  assert.strictEqual(median(array, unbox), 2);
  assert.strictEqual(median(array, unbox), 1);
});

it("median(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  median(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("median(array, f) uses the undefined context", () => {
  const results = [];
  median([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

it("medianIndex(array) returns the index", () => {
  assert.deepStrictEqual(medianIndex([1, 2]), 0);
  assert.deepStrictEqual(medianIndex([1, 2, 3]), 1);
  assert.deepStrictEqual(medianIndex([1, 3, 2]), 2);
  assert.deepStrictEqual(medianIndex([2, 3, 1]), 0);
  assert.deepStrictEqual(medianIndex([1]), 0);
  assert.deepStrictEqual(medianIndex([]), -1);
});


function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
