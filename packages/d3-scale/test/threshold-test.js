import assert from "assert";
import {scaleThreshold} from "../src/index.js";

it("scaleThreshold() has the expected defaults", () => {
  const x = scaleThreshold();
  assert.deepStrictEqual(x.domain(), [0.5]);
  assert.deepStrictEqual(x.range(), [0, 1]);
  assert.strictEqual(x(0.50), 1);
  assert.strictEqual(x(0.49), 0);
});

it("threshold(x) maps a number to a discrete value in the range", () => {
  const x = scaleThreshold().domain([1/3, 2/3]).range(["a", "b", "c"]);
  assert.strictEqual(x(0), "a");
  assert.strictEqual(x(0.2), "a");
  assert.strictEqual(x(0.4), "b");
  assert.strictEqual(x(0.6), "b");
  assert.strictEqual(x(0.8), "c");
  assert.strictEqual(x(1), "c");
});

it("threshold(x) returns undefined if the specified value x is not orderable", () => {
  const x = scaleThreshold().domain([1/3, 2/3]).range(["a", "b", "c"]);
  assert.strictEqual(x(), undefined);
  assert.strictEqual(x(undefined), undefined);
  assert.strictEqual(x(NaN), undefined);
  assert.strictEqual(x(null), undefined);
});

it("threshold.domain(…) supports arbitrary orderable values", () => {
  const x = scaleThreshold().domain(["10", "2"]).range([0, 1, 2]);
  assert.strictEqual(x.domain()[0], "10");
  assert.strictEqual(x.domain()[1], "2");
  assert.strictEqual(x("0"), 0);
  assert.strictEqual(x("12"), 1);
  assert.strictEqual(x("3"), 2);
});

it("threshold.domain(…) accepts an iterable", () => {
  const x = scaleThreshold().domain(new Set(["10", "2"])).range([0, 1, 2]);
  assert.deepStrictEqual(x.domain(), ["10", "2"]);
});

it("threshold.range(…) supports arbitrary values", () => {
  const a = {}, b = {}, c = {}, x = scaleThreshold().domain([1/3, 2/3]).range([a, b, c]);
  assert.strictEqual(x(0), a);
  assert.strictEqual(x(0.2), a);
  assert.strictEqual(x(0.4), b);
  assert.strictEqual(x(0.6), b);
  assert.strictEqual(x(0.8), c);
  assert.strictEqual(x(1), c);
});

it("threshold.range(…) accepts an iterable", () => {
  const x = scaleThreshold().domain(["10", "2"]).range(new Set([0, 1, 2]));
  assert.deepStrictEqual(x.range(), [0, 1, 2]);
});

it("threshold.invertExtent(y) returns the domain extent for the specified range value", () => {
  const a = {}, b = {}, c = {}, x = scaleThreshold().domain([1/3, 2/3]).range([a, b, c]);
  assert.deepStrictEqual(x.invertExtent(a), [undefined, 1/3]);
  assert.deepStrictEqual(x.invertExtent(b), [1/3, 2/3]);
  assert.deepStrictEqual(x.invertExtent(c), [2/3, undefined]);
  assert.deepStrictEqual(x.invertExtent({}), [undefined, undefined]);
});
