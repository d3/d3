import assert from "assert";
import {scaleDiverging, scaleDivergingLog} from "../src/index.js";

it("scaleDiverging() has the expected defaults", () => {
  const s = scaleDiverging();
  assert.deepStrictEqual(s.domain(), [0, 0.5, 1]);
  assert.strictEqual(s.interpolator()(0.42), 0.42);
  assert.strictEqual(s.clamp(), false);
  assert.strictEqual(s(-0.5), -0.5);
  assert.strictEqual(s( 0.0),  0.0);
  assert.strictEqual(s( 0.5),  0.5);
  assert.strictEqual(s( 1.0),  1.0);
  assert.strictEqual(s( 1.5),  1.5);
});

it("diverging.clamp(true) enables clamping", () => {
  const s = scaleDiverging().clamp(true);
  assert.strictEqual(s.clamp(), true);
  assert.strictEqual(s(-0.5), 0.0);
  assert.strictEqual(s( 0.0), 0.0);
  assert.strictEqual(s( 0.5), 0.5);
  assert.strictEqual(s( 1.0), 1.0);
  assert.strictEqual(s( 1.5), 1.0);
});

it("diverging.domain() coerces domain values to numbers", () => {
  const s = scaleDiverging().domain(["-1.20", " 0", "2.40"]);
  assert.deepStrictEqual(s.domain(), [-1.2, 0, 2.4]);
  assert.strictEqual(s(-1.2), 0.000);
  assert.strictEqual(s( 0.6), 0.625);
  assert.strictEqual(s( 2.4), 1.000);
});

it("diverging.domain() accepts an iterable", () => {
  const s = scaleDiverging().domain(new Set([-1.2, 0, 2.4]));
  assert.deepStrictEqual(s.domain(), [-1.2, 0, 2.4]);
});

it("diverging.domain() handles a degenerate domain", () => {
  const s = scaleDiverging().domain([2, 2, 3]);
  assert.deepStrictEqual(s.domain(), [2, 2, 3]);
  assert.strictEqual(s(-1.2), 0.5);
  assert.strictEqual(s( 0.6), 0.5);
  assert.strictEqual(s( 2.4), 0.7);
  assert.deepStrictEqual(s.domain([1, 2, 2]).domain(), [1, 2, 2]);
  assert.strictEqual(s(-1.0), -1);
  assert.strictEqual(s( 0.5), -0.25);
  assert.strictEqual(s( 2.4), 0.5);
  assert.deepStrictEqual(s.domain([2, 2, 2]).domain(), [2, 2, 2]);
  assert.strictEqual(s(-1.0), 0.5);
  assert.strictEqual(s( 0.5), 0.5);
  assert.strictEqual(s( 2.4), 0.5);
});

it("diverging.domain() handles a descending domain", () => {
  const s = scaleDiverging().domain([4, 2, 1]);
  assert.deepStrictEqual(s.domain(), [4, 2, 1]);
  assert.strictEqual(s(1.2), 0.9);
  assert.strictEqual(s(2.0), 0.5);
  assert.strictEqual(s(3.0), 0.25);
});

it("divergingLog.domain() handles a descending domain", () => {
  const s = scaleDivergingLog().domain([3, 2, 1]);
  assert.deepStrictEqual(s.domain(), [3, 2, 1]);
  assert.strictEqual(s(1.2), 1 - 0.1315172029168969);
  assert.strictEqual(s(2.0), 1 - 0.5000000000000000);
  assert.strictEqual(s(2.8), 1 - 0.9149213210862197);
});

it("divergingLog.domain() handles a descending negative domain", () => {
  const s = scaleDivergingLog().domain([-1, -2, -3]);
  assert.deepStrictEqual(s.domain(), [-1, -2, -3]);
  assert.strictEqual(s(-1.2), 0.1315172029168969);
  assert.strictEqual(s(-2.0), 0.5000000000000000);
  assert.strictEqual(s(-2.8), 0.9149213210862197);
});

it("diverging.domain() handles a non-numeric domain", () => {
  const s = scaleDiverging().domain([NaN, 2, 3]);
  assert.strictEqual(isNaN(s.domain()[0]), true);
  assert.strictEqual(isNaN(s(-1.2)), true);
  assert.strictEqual(isNaN(s( 0.6)), true);
  assert.strictEqual(s( 2.4), 0.7);
  assert.strictEqual(isNaN(s.domain([1, NaN, 2]).domain()[1]), true);
  assert.strictEqual(isNaN(s(-1.0)), true);
  assert.strictEqual(isNaN(s( 0.5)), true);
  assert.strictEqual(isNaN(s( 2.4)), true);
  assert.strictEqual(isNaN(s.domain([0, 1, NaN]).domain()[2]), true);
  assert.strictEqual(s(-1.0), -0.5);
  assert.strictEqual(s( 0.5), 0.25);
  assert.strictEqual(isNaN(s( 2.4)), true);
});

it("diverging.domain() only considers the first three elements of the domain", () => {
  const s = scaleDiverging().domain([-1, 100, 200, 3]);
  assert.deepStrictEqual(s.domain(), [-1, 100, 200]);
});

it("diverging.copy() returns an isolated copy of the scale", () => {
  const s1 = scaleDiverging().domain([1, 2, 3]).clamp(true);
  const s2 = s1.copy();
  assert.deepStrictEqual(s2.domain(), [1, 2, 3]);
  assert.strictEqual(s2.clamp(), true);
  s1.domain([-1, 1, 2]);
  assert.deepStrictEqual(s2.domain(), [1, 2, 3]);
  s1.clamp(false);
  assert.strictEqual(s2.clamp(), true);
  s2.domain([3, 4, 5]);
  assert.deepStrictEqual(s1.domain(), [-1, 1, 2]);
  s2.clamp(true);
  assert.deepStrictEqual(s1.clamp(), false);
});

it("diverging.range() returns the computed range", () => {
  const s = scaleDiverging(function(t) { return t * 2 + 1; });
  assert.deepStrictEqual(s.range(), [1, 2, 3]);
});

it("diverging.interpolator(interpolator) sets the interpolator", () => {
  const i0 = function(t) { return t; };
  const i1 = function(t) { return t * 2; };
  const s = scaleDiverging(i0);
  assert.strictEqual(s.interpolator(), i0);
  assert.strictEqual(s.interpolator(i1), s);
  assert.strictEqual(s.interpolator(), i1);
  assert.strictEqual(s(-0.5), -1.0);
  assert.strictEqual(s( 0.0),  0.0);
  assert.strictEqual(s( 0.5),  1.0);
});

it("diverging.range(range) sets the interpolator", () => {
  const s = scaleDiverging().range([1, 3, 10]);
  assert.strictEqual(s.interpolator()(0.5), 3);
  assert.deepStrictEqual(s.range(), [1, 3, 10]);
});

it("diverging.range(range) ignores additional values", () => {
  const s = scaleDiverging().range([1, 3, 10, 20]);
  assert.strictEqual(s.interpolator()(0.5), 3);
  assert.deepStrictEqual(s.range(), [1, 3, 10]);
});

it("scaleDiverging(range) sets the interpolator", () => {
  const s = scaleDiverging([1, 3, 10]);
  assert.strictEqual(s.interpolator()(0.5), 3);
  assert.deepStrictEqual(s.range(), [1, 3, 10]);
});
