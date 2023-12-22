import assert from "assert";
import {scaleQuantile} from "../src/index.js";

it("scaleQuantile() has the expected default", () => {
  const s = scaleQuantile();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), []);
  assert.strictEqual(s.unknown(), undefined);
});

it("quantile(x) uses the R-7 algorithm to compute quantiles", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual([3, 6, 6.9, 7, 7.1].map(s), [0, 0, 0, 0, 0]);
  assert.deepStrictEqual([8, 8.9].map(s), [1, 1]);
  assert.deepStrictEqual([9, 9.1, 10, 13].map(s), [2, 2, 2, 2]);
  assert.deepStrictEqual([14.9, 15, 15.1, 16, 20].map(s), [3, 3, 3, 3, 3]);
  s.domain([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual([3, 6, 6.9, 7, 7.1].map(s), [0, 0, 0, 0, 0]);
  assert.deepStrictEqual([8, 8.9].map(s), [1, 1]);
  assert.deepStrictEqual([9, 9.1, 10, 13].map(s), [2, 2, 2, 2]);
  assert.deepStrictEqual([14.9, 15, 15.1, 16, 20].map(s), [3, 3, 3, 3, 3]);
});

it("quantile(x) returns undefined if the input value is NaN", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.strictEqual(s(NaN), undefined);
});

it("quantile.domain() values are sorted in ascending order", () => {
  const s = scaleQuantile().domain([6, 3, 7, 8, 8, 13, 20, 15, 16, 10]);
  assert.deepStrictEqual(s.domain(), [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
});

it("quantile.domain() values are coerced to numbers", () => {
  const s = scaleQuantile().domain(["6", "13", "20"]);
  assert.deepStrictEqual(s.domain(), [6, 13, 20]);
});

it("quantile.domain() accepts an iterable", () => {
  const s = scaleQuantile().domain(new Set([6, 13, 20]));
  assert.deepStrictEqual(s.domain(), [6, 13, 20]);
});

it("quantile.domain() values are allowed to be zero", () => {
  const s = scaleQuantile().domain([1, 2, 0, 0, null]);
  assert.deepStrictEqual(s.domain(), [0, 0, 1, 2]);
});

it("quantile.domain() non-numeric values are ignored", () => {
  const s = scaleQuantile().domain([6, 3, NaN, undefined, 7, 8, 8, 13, null, 20, 15, 16, 10, NaN]);
  assert.deepStrictEqual(s.domain(), [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
});

it("quantile.quantiles() returns the inner thresholds", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.quantiles(), [7.25, 9, 14.5]);
  s.domain([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.quantiles(), [7.5, 9, 14]);
});

it("quantile.range() cardinality determines the number of quantiles", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
  assert.deepStrictEqual(s.range([0, 1, 2, 3]).quantiles(), [7.25, 9, 14.5]);
  assert.deepStrictEqual(s.range([0, 1]).quantiles(), [9]);
  assert.deepStrictEqual(s.range([,,,,,]).quantiles(), [6.8, 8, 11.2, 15.2]);
  assert.deepStrictEqual(s.range([,,,,,,]).quantiles(), [6.5, 8, 9, 13, 15.5]);
});

it("quantile.range() accepts an iterable", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range(new Set([0, 1, 2, 3]));
  assert.deepStrictEqual(s.range(), [0, 1, 2, 3]);
});

it("quantile.range() values are arbitrary", () => {
  const a = {};
  const b = {};
  const c = {};
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([a, b, c, a]);
  assert.deepStrictEqual([3, 6, 6.9, 7, 7.1].map(s), [a, a, a, a, a]);
  assert.deepStrictEqual([8, 8.9].map(s), [b, b]);
  assert.deepStrictEqual([9, 9.1, 10, 13].map(s), [c, c, c, c]);
  assert.deepStrictEqual([14.9, 15, 15.1, 16, 20].map(s), [a, a, a, a, a]);
});

it("quantile.invertExtent() maps a value in the range to a domain extent", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.invertExtent(0), [3, 7.25]);
  assert.deepStrictEqual(s.invertExtent(1), [7.25, 9]);
  assert.deepStrictEqual(s.invertExtent(2), [9, 14.5]);
  assert.deepStrictEqual(s.invertExtent(3), [14.5, 20]);
});

it("quantile.invertExtent() allows arbitrary range values", () => {
  const a = {};
  const b = {};
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([a, b]);
  assert.deepStrictEqual(s.invertExtent(a), [3, 9]);
  assert.deepStrictEqual(s.invertExtent(b), [9, 20]);
});

it("quantile.invertExtent() returns [NaN, NaN] when the given value is not in the range", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
  assert(s.invertExtent(-1).every(isNaN));
  assert(s.invertExtent(0.5).every(isNaN));
  assert(s.invertExtent(2).every(isNaN));
  assert(s.invertExtent('a').every(isNaN));
});

it("quantile.invertExtent() returns the first match if duplicate values exist in the range", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 0]);
  assert.deepStrictEqual(s.invertExtent(0), [3, 7.25]);
  assert.deepStrictEqual(s.invertExtent(1), [7.25, 9]);
  assert.deepStrictEqual(s.invertExtent(2), [9, 14.5]);
});

it("quantile.unknown(value) sets the return value for undefined, null, and NaN input", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]).unknown(-1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(null), -1);
  assert.strictEqual(s(NaN), -1);
  assert.strictEqual(s("N/A"), -1);
  assert.strictEqual(s(2), 0);
  assert.strictEqual(s(3), 0);
  assert.strictEqual(s(21), 3);
});
