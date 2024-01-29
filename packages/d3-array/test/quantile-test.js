import assert from "assert";
import {quantile, quantileIndex, quantileSorted} from "../src/index.js";

it("quantileSorted(array, p) requires sorted numeric input, quantile doesn't", () => {
  assert.strictEqual(quantileSorted([1, 2, 3, 4], 0), 1);
  assert.strictEqual(quantileSorted([1, 2, 3, 4], 1), 4);
  assert.strictEqual(quantileSorted([4, 3, 2, 1], 0), 4);
  assert.strictEqual(quantileSorted([4, 3, 2, 1], 1), 1);
  assert.strictEqual(quantile([1, 2, 3, 4], 0), 1);
  assert.strictEqual(quantile([1, 2, 3, 4], 1), 4);
  assert.strictEqual(quantile([4, 3, 2, 1], 0), 1);
  assert.strictEqual(quantile([4, 3, 2, 1], 1), 4);
});

it("quantile() accepts an iterable", () => {
  assert.strictEqual(quantile(new Set([1, 2, 3, 4]), 1), 4);
});

it("quantile(array, p) uses the R-7 method", () => {
  const even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
  assert.strictEqual(quantile(even, 0), 3);
  assert.strictEqual(quantile(even, 0.25), 7.25);
  assert.strictEqual(quantile(even, 0.5), 9);
  assert.strictEqual(quantile(even, 0.75), 14.5);
  assert.strictEqual(quantile(even, 1), 20);
  const odd = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
  assert.strictEqual(quantile(odd, 0), 3);
  assert.strictEqual(quantile(odd, 0.25), 7.5);
  assert.strictEqual(quantile(odd, 0.5), 9);
  assert.strictEqual(quantile(odd, 0.75), 14);
  assert.strictEqual(quantile(odd, 1), 20);
});

it("quantile(array, p) coerces values to numbers", () => {
  const strings = ["1", "2", "3", "4"];
  assert.strictEqual(quantile(strings, 1 / 3), 2);
  assert.strictEqual(quantile(strings, 1 / 2), 2.5);
  assert.strictEqual(quantile(strings, 2 / 3), 3);
  const dates = [new Date(Date.UTC(2011, 0, 1)), new Date(Date.UTC(2012, 0, 1))];
  assert.strictEqual(quantile(dates, 0), +new Date(Date.UTC(2011, 0, 1)));
  assert.strictEqual(quantile(dates, 1 / 2), +new Date(Date.UTC(2011, 6, 2, 12)));
  assert.strictEqual(quantile(dates, 1), +new Date(Date.UTC(2012, 0, 1)));
});

it("quantile(array, p) returns an exact value for integer p-values", () => {
  const data = [1, 2, 3, 4];
  assert.strictEqual(quantile(data, 1 / 3), 2);
  assert.strictEqual(quantile(data, 2 / 3), 3);
});

it("quantile(array, p) returns the expected value for integer or fractional p", () => {
  const data = [3, 1, 2, 4, 0];
  assert.strictEqual(quantile(data, 0 / 4), 0);
  assert.strictEqual(quantile(data, 0.1 / 4), 0.1);
  assert.strictEqual(quantile(data, 1 / 4), 1);
  assert.strictEqual(quantile(data, 1.5 / 4), 1.5);
  assert.strictEqual(quantile(data, 2 / 4), 2);
  assert.strictEqual(quantile(data, 2.5 / 4), 2.5);
  assert.strictEqual(quantile(data, 3 / 4), 3);
  assert.strictEqual(quantile(data, 3.2 / 4), 3.2);
  assert.strictEqual(quantile(data, 4 / 4), 4);
});

it("quantile(array, p) returns the first value for p = 0", () => {
  const data = [1, 2, 3, 4];
  assert.strictEqual(quantile(data, 0), 1);
});

it("quantile(array, p) returns the last value for p = 1", () => {
  const data = [1, 2, 3, 4];
  assert.strictEqual(quantile(data, 1), 4);
});

it("quantile(array, p) returns undefined if p is not a number", () => {
  assert.strictEqual(quantile([1, 2, 3]), undefined);
  assert.strictEqual(quantile([1, 2, 3], "no"), undefined);
  assert.strictEqual(quantile([1, 2, 3], NaN), undefined);
  assert.strictEqual(quantile([1, 2, 3], null), 1); // +null is 0
});

it("quantile(array, p, f) observes the specified accessor", () => {
  assert.strictEqual(quantile([1, 2, 3, 4].map(box), 0.5, unbox), 2.5);
  assert.strictEqual(quantile([1, 2, 3, 4].map(box), 0, unbox), 1);
  assert.strictEqual(quantile([1, 2, 3, 4].map(box), 1, unbox), 4);
  assert.strictEqual(quantile([2].map(box), 0, unbox), 2);
  assert.strictEqual(quantile([2].map(box), 0.5, unbox), 2);
  assert.strictEqual(quantile([2].map(box), 1, unbox), 2);
  assert.strictEqual(quantile([], 0, unbox), undefined);
  assert.strictEqual(quantile([], 0.5, unbox), undefined);
  assert.strictEqual(quantile([], 1, unbox), undefined);
});

it("quantileIndex(array, p) returns the index", () => {
  assert.deepStrictEqual(quantileIndex([1, 2], 0.2), 0);
  assert.deepStrictEqual(quantileIndex([1, 2, 3], 0.2), 0);
  assert.deepStrictEqual(quantileIndex([1, 3, 2], 0.2), 0);
  assert.deepStrictEqual(quantileIndex([2, 3, 1], 0.2), 2);
  assert.deepStrictEqual(quantileIndex([1], 0.2), 0);
  assert.deepStrictEqual(quantileIndex([], 0.2), -1);
});

it("quantileIndex(array, 0) returns the minimum index", () => {
  assert.deepStrictEqual(quantileIndex([1, 2], 0), 0);
  assert.deepStrictEqual(quantileIndex([1, 2, 3], 0), 0);
  assert.deepStrictEqual(quantileIndex([1, 3, 2], 0), 0);
  assert.deepStrictEqual(quantileIndex([2, 3, 1], 0), 2);
  assert.deepStrictEqual(quantileIndex([1], 0), 0);
  assert.deepStrictEqual(quantileIndex([], 0), -1);
});

it("quantileIndex(array, 1) returns the maximum index", () => {
  assert.deepStrictEqual(quantileIndex([1, 2], 1), 1);
  assert.deepStrictEqual(quantileIndex([1, 2, 3], 1), 2);
  assert.deepStrictEqual(quantileIndex([1, 3, 2], 1), 1);
  assert.deepStrictEqual(quantileIndex([2, 3, 1], 1), 1);
  assert.deepStrictEqual(quantileIndex([1], 1), 0);
  assert.deepStrictEqual(quantileIndex([], 1), -1);
});

it("quantileIndex(array, 0.5) handles undefined values", () => {
  assert.deepStrictEqual(quantileIndex([1, 1, 1, null, 2, 3, 3, 3], 0.5), 4);
  assert.deepStrictEqual(quantileIndex([1, 1, 1, null, 2, 3, 3, 3], 0.5, (d) => d), 4);
});

it("quantileIndex(array, 0.5) returns the first of equivalent values", () => {
  assert.deepStrictEqual(quantileIndex([1, 1, 1, 2, 2, 3, 3, 3], 0.5), 4);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
