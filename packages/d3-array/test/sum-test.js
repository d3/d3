import assert from "assert";
import {sum} from "../src/index.js";

it("sum(array) returns the sum of the specified numbers", () => {
  assert.strictEqual(sum([1]), 1);
  assert.strictEqual(sum([5, 1, 2, 3, 4]), 15);
  assert.strictEqual(sum([20, 3]), 23);
  assert.strictEqual(sum([3, 20]), 23);
});

it("sum(array) observes values that can be coerced to numbers", () => {
  assert.strictEqual(sum(["20", "3"]), 23);
  assert.strictEqual(sum(["3", "20"]), 23);
  assert.strictEqual(sum(["3", 20]), 23);
  assert.strictEqual(sum([20, "3"]), 23);
  assert.strictEqual(sum([3, "20"]), 23);
  assert.strictEqual(sum(["20", 3]), 23);
});

it("sum(array) ignores non-numeric values", () => {
  assert.strictEqual(sum(["a", "b", "c"]), 0);
  assert.strictEqual(sum(["a", 1, "2"]), 3);
});

it("sum(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(sum([NaN, 1, 2, 3, 4, 5]), 15);
  assert.strictEqual(sum([1, 2, 3, 4, 5, NaN]), 15);
  assert.strictEqual(sum([10, null, 3, undefined, 5, NaN]), 18);
});

it("sum(array) returns zero if there are no numbers", () => {
  assert.strictEqual(sum([]), 0);
  assert.strictEqual(sum([NaN]), 0);
  assert.strictEqual(sum([undefined]), 0);
  assert.strictEqual(sum([undefined, NaN]), 0);
  assert.strictEqual(sum([undefined, NaN, {}]), 0);
});

it("sum(array, f) returns the sum of the specified numbers", () => {
  assert.strictEqual(sum([1].map(box), unbox), 1);
  assert.strictEqual(sum([5, 1, 2, 3, 4].map(box), unbox), 15);
  assert.strictEqual(sum([20, 3].map(box), unbox), 23);
  assert.strictEqual(sum([3, 20].map(box), unbox), 23);
});

it("sum(array, f) observes values that can be coerced to numbers", () => {
  assert.strictEqual(sum(["20", "3"].map(box), unbox), 23);
  assert.strictEqual(sum(["3", "20"].map(box), unbox), 23);
  assert.strictEqual(sum(["3", 20].map(box), unbox), 23);
  assert.strictEqual(sum([20, "3"].map(box), unbox), 23);
  assert.strictEqual(sum([3, "20"].map(box), unbox), 23);
  assert.strictEqual(sum(["20", 3].map(box), unbox), 23);
});

it("sum(array, f) ignores non-numeric values", () => {
  assert.strictEqual(sum(["a", "b", "c"].map(box), unbox), 0);
  assert.strictEqual(sum(["a", 1, "2"].map(box), unbox), 3);
});

it("sum(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(sum([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  assert.strictEqual(sum([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  assert.strictEqual(sum([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

it("sum(array, f) returns zero if there are no numbers", () => {
  assert.strictEqual(sum([].map(box), unbox), 0);
  assert.strictEqual(sum([NaN].map(box), unbox), 0);
  assert.strictEqual(sum([undefined].map(box), unbox), 0);
  assert.strictEqual(sum([undefined, NaN].map(box), unbox), 0);
  assert.strictEqual(sum([undefined, NaN, {}].map(box), unbox), 0);
});

it("sum(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  sum(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("sum(array, f) uses the undefined context", () => {
  const results = [];
  sum([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
