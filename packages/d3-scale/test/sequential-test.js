import assert from "assert";
import {scaleSequential} from "../src/index.js";

it("scaleSequential() has the expected defaults", () => {
  const s = scaleSequential();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.strictEqual(s.interpolator()(0.42), 0.42);
  assert.strictEqual(s.clamp(), false);
  assert.strictEqual(s.unknown(), undefined);
  assert.strictEqual(s(-0.5), -0.5);
  assert.strictEqual(s( 0.0),  0.0);
  assert.strictEqual(s( 0.5),  0.5);
  assert.strictEqual(s( 1.0),  1.0);
  assert.strictEqual(s( 1.5),  1.5);
});

it("sequential.clamp(true) enables clamping", () => {
  const s = scaleSequential().clamp(true);
  assert.strictEqual(s.clamp(), true);
  assert.strictEqual(s(-0.5), 0.0);
  assert.strictEqual(s( 0.0), 0.0);
  assert.strictEqual(s( 0.5), 0.5);
  assert.strictEqual(s( 1.0), 1.0);
  assert.strictEqual(s( 1.5), 1.0);
});

it("sequential.unknown(value) sets the return value for undefined and NaN input", () => {
  const s = scaleSequential().unknown(-1);
  assert.strictEqual(s.unknown(), -1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(NaN), -1);
  assert.strictEqual(s("N/A"), -1);
  assert.strictEqual(s(0.4), 0.4);
});

it("sequential.domain() coerces domain values to numbers", () => {
  const s = scaleSequential().domain(["-1.20", "2.40"]);
  assert.deepStrictEqual(s.domain(), [-1.2, 2.4]);
  assert.strictEqual(s(-1.2), 0.0);
  assert.strictEqual(s( 0.6), 0.5);
  assert.strictEqual(s( 2.4), 1.0);
});

it("sequential.domain() accepts an iterable", () => {
  const s = scaleSequential().domain(new Set(["-1.20", "2.40"]));
  assert.deepStrictEqual(s.domain(), [-1.2, 2.4]);
});

it("sequential.domain() handles a degenerate domain", () => {
  const s = scaleSequential().domain([2, 2]);
  assert.deepStrictEqual(s.domain(), [2, 2]);
  assert.strictEqual(s(-1.2), 0.5);
  assert.strictEqual(s( 0.6), 0.5);
  assert.strictEqual(s( 2.4), 0.5);
});

it("sequential.domain() handles a non-numeric domain", () => {
  const s = scaleSequential().domain([NaN, 2]);
  assert.strictEqual(isNaN(s.domain()[0]), true);
  assert.strictEqual(s.domain()[1], 2);
  assert.strictEqual(isNaN(s(-1.2)), true);
  assert.strictEqual(isNaN(s( 0.6)), true);
  assert.strictEqual(isNaN(s( 2.4)), true);
});

it("sequential.domain() only considers the first and second element of the domain", () => {
  const s = scaleSequential().domain([-1, 100, 200]);
  assert.deepStrictEqual(s.domain(), [-1, 100]);
});

it("sequential.copy() returns an isolated copy of the scale", () => {
  const s1 = scaleSequential().domain([1, 3]).clamp(true);
  const s2 = s1.copy();
  assert.deepStrictEqual(s2.domain(), [1, 3]);
  assert.strictEqual(s2.clamp(), true);
  s1.domain([-1, 2]);
  assert.deepStrictEqual(s2.domain(), [1, 3]);
  s1.clamp(false);
  assert.strictEqual(s2.clamp(), true);
  s2.domain([3, 4]);
  assert.deepStrictEqual(s1.domain(), [-1, 2]);
  s2.clamp(true);
  assert.deepStrictEqual(s1.clamp(), false);
});

it("sequential.interpolator(interpolator) sets the interpolator", () => {
  const i0 = function(t) { return t; };
  const i1 = function(t) { return t * 2; };
  const s = scaleSequential(i0);
  assert.strictEqual(s.interpolator(), i0);
  assert.strictEqual(s.interpolator(i1), s);
  assert.strictEqual(s.interpolator(), i1);
  assert.strictEqual(s(-0.5), -1.0);
  assert.strictEqual(s( 0.0),  0.0);
  assert.strictEqual(s( 0.5),  1.0);
});

it("sequential.range() returns the computed range", () => {
  const s = scaleSequential(function(t) { return t * 2 + 1; });
  assert.deepStrictEqual(s.range(), [1, 3]);
});

it("sequential.range(range) sets the interpolator", () => {
  const s = scaleSequential().range([1, 3]);
  assert.strictEqual(s.interpolator()(0.5), 2);
  assert.deepStrictEqual(s.range(), [1, 3]);
});

it("sequential.range(range) ignores additional values", () => {
  const s = scaleSequential().range([1, 3, 10]);
  assert.strictEqual(s.interpolator()(0.5), 2);
  assert.deepStrictEqual(s.range(), [1, 3]);
});

it("scaleSequential(range) sets the interpolator", () => {
  const s = scaleSequential([1, 3]);
  assert.strictEqual(s.interpolator()(0.5), 2);
  assert.deepStrictEqual(s.range(), [1, 3]);
});
