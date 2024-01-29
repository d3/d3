import assert from "assert";
import {mode} from "../src/index.js";

it("mode(array) returns the most frequent value for numbers", () => {
  assert.strictEqual(mode([1]), 1);
  assert.strictEqual(mode([5, 1, 1, 3, 4]), 1);
});

it("mode(array) returns the most frequent value for strings", () => {
  assert.strictEqual(mode(["1"]), "1");
  assert.strictEqual(mode(["5", "1", "1", "3", "4"]), "1");
});

it("mode(array) returns the most frequent value for heterogenous types", () => {
  assert.strictEqual(mode(["1"]), "1");
  assert.strictEqual(mode(["5", "1", "1", 2, 2, "2", 1, 1, 1, "3", "4"]), 1);
  assert.strictEqual(mode(["5", 2, 2, "2", "2", 1, 1, 1, "3", "4"]), 1);
});

it("mode(array) returns the first of the most frequent values", () => {
  assert.strictEqual(mode(["5", "1", "1", "2", "2", "3", "4"]), "1");
});

it("mode(array) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.strictEqual(mode([NaN, 1, 1, 3, 4, 5]), 1);
  assert.strictEqual(mode([o, 1, null, null, 1, null]), 1);
  assert.strictEqual(mode([1, NaN, NaN, 1, 5, NaN]), 1);
  assert.strictEqual(mode([1, o, o, 1, 5, o]), 1);
  assert.strictEqual(mode([1, undefined, undefined, 1, 5, undefined]), 1);
});

it("mode(array) returns undefined if the array contains no comparable values", () => {
  assert.strictEqual(mode([]), undefined);
  assert.strictEqual(mode([null]), undefined);
  assert.strictEqual(mode([undefined]), undefined);
  assert.strictEqual(mode([NaN]), undefined);
  assert.strictEqual(mode([NaN, NaN]), undefined);
});

it("mode(array, f) returns the most frequent value for numbers", () => {
  assert.strictEqual(mode([1].map(box), unbox), 1);
  assert.strictEqual(mode([5, 1, 1, 3, 4].map(box), unbox), 1);
});

it("mode(array, f) returns the most frequent value for strings", () => {
  assert.strictEqual(mode(["1"].map(box), unbox), "1");
  assert.strictEqual(mode(["5", "1", "1", "3", "4"].map(box), unbox), "1");
});

it("mode(array, f) returns the most frequent value for heterogenous types", () => {
  assert.strictEqual(mode(["1"].map(box), unbox), "1");
  assert.strictEqual(mode(["5", "1", "1", 2, 2, "2", 1, 1, 1, "3", "4"].map(box), unbox), 1);
});

it("mode(array, f) returns the first of the most frequent values", () => {
  assert.strictEqual(mode(["5", "1", "1", "2", "2", "3", "4"].map(box), unbox), "1");
});

it("mode(array, f) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.strictEqual(mode([NaN, 1, 1, 3, 4, 5].map(box), unbox), 1);
  assert.strictEqual(mode([o, 1, null, null, 1, null].map(box), unbox), 1);
  assert.strictEqual(mode([1, NaN, NaN, 1, 5, NaN].map(box), unbox), 1);
  assert.strictEqual(mode([1, o, o, 1, 5, o].map(box), unbox), 1);
  assert.strictEqual(mode([1, undefined, undefined, 1, 5, undefined].map(box), unbox), 1);
});

it("mode(array, f) returns undefined if the array contains no comparable values", () => {
  assert.strictEqual(mode([].map(box), unbox), undefined);
  assert.strictEqual(mode([null].map(box), unbox), undefined);
  assert.strictEqual(mode([undefined].map(box), unbox), undefined);
  assert.strictEqual(mode([NaN].map(box), unbox), undefined);
  assert.strictEqual(mode([NaN, NaN].map(box), unbox), undefined);
});

it("mode(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  mode(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("mode(array, f) uses the undefined context", () => {
  const results = [];
  mode([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
