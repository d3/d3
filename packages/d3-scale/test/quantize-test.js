import assert from "assert";
import {range} from "d3-array";
import {scaleQuantize} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("scaleQuantize() has the expected defaults", () => {
  const s = scaleQuantize();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.deepStrictEqual(s.thresholds(), [0.5]);
  assert.strictEqual(s(0.25), 0);
  assert.strictEqual(s(0.75), 1);
});

it("quantize(value) maps a number to a discrete value in the range", () => {
  const s = scaleQuantize().range([0, 1, 2]);
  assert.deepStrictEqual(s.thresholds(), [1 / 3, 2 / 3]);
  assert.strictEqual(s(0.0), 0);
  assert.strictEqual(s(0.2), 0);
  assert.strictEqual(s(0.4), 1);
  assert.strictEqual(s(0.6), 1);
  assert.strictEqual(s(0.8), 2);
  assert.strictEqual(s(1.0), 2);
});

it("quantize(value) clamps input values to the domain", () => {
  const a = {};
  const b = {};
  const c = {};
  const s = scaleQuantize().range([a, b, c]);
  assert.strictEqual(s(-0.5), a);
  assert.strictEqual(s(+1.5), c);
});

it("quantize.unknown(value) sets the return value for undefined, null, and NaN input", () => {
  const s = scaleQuantize().range([0, 1, 2]).unknown(-1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(null), -1);
  assert.strictEqual(s(NaN), -1);
});

it("quantize.domain() coerces domain values to numbers", () => {
  const s = scaleQuantize().domain(["-1.20", "2.40"]);
  assert.deepStrictEqual(s.domain(), [-1.2, 2.4]);
  assert.strictEqual(s(-1.2), 0);
  assert.strictEqual(s( 0.5), 0);
  assert.strictEqual(s( 0.7), 1);
  assert.strictEqual(s( 2.4), 1);
});

it("quantize.domain() accepts an iterable", () => {
  const s = scaleQuantize().domain(new Set([1, 2]));
  assert.deepStrictEqual(s.domain(), [1, 2]);
});

it("quantize.domain() only considers the first and second element of the domain", () => {
  const s = scaleQuantize().domain([-1, 100, 200]);
  assert.deepStrictEqual(s.domain(), [-1, 100]);
});

it("quantize.range() cardinality determines the degree of quantization", () => {
  const s = scaleQuantize();
  assertInDelta(s.range(range(0, 1.001, 0.001))(1/3), 0.333, 1e-6);
  assertInDelta(s.range(range(0, 1.010, 0.010))(1/3), 0.330, 1e-6);
  assertInDelta(s.range(range(0, 1.100, 0.100))(1/3), 0.300, 1e-6);
  assertInDelta(s.range(range(0, 1.200, 0.200))(1/3), 0.400, 1e-6);
  assertInDelta(s.range(range(0, 1.250, 0.250))(1/3), 0.250, 1e-6);
  assertInDelta(s.range(range(0, 1.500, 0.500))(1/3), 0.500, 1e-6);
  assertInDelta(s.range(range(1))(1/3), 0, 1e-6);
});

it("quantize.range() values are arbitrary", () => {
  const a = {};
  const b = {};
  const c = {};
  const s = scaleQuantize().range([a, b, c]);
  assert.strictEqual(s(0.0), a);
  assert.strictEqual(s(0.2), a);
  assert.strictEqual(s(0.4), b);
  assert.strictEqual(s(0.6), b);
  assert.strictEqual(s(0.8), c);
  assert.strictEqual(s(1.0), c);
});

it("quantize.invertExtent() maps a value in the range to a domain extent", () => {
  const s = scaleQuantize().range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.invertExtent(0), [0.00, 0.25]);
  assert.deepStrictEqual(s.invertExtent(1), [0.25, 0.50]);
  assert.deepStrictEqual(s.invertExtent(2), [0.50, 0.75]);
  assert.deepStrictEqual(s.invertExtent(3), [0.75, 1.00]);
});

it("quantize.invertExtent() allows arbitrary range values", () => {
  const a = {};
  const b = {};
  const s = scaleQuantize().range([a, b]);
  assert.deepStrictEqual(s.invertExtent(a), [0.0, 0.5]);
  assert.deepStrictEqual(s.invertExtent(b), [0.5, 1.0]);
});

it("quantize.invertExtent() returns [NaN, NaN] when the given value is not in the range", () => {
  const s = scaleQuantize();
  assert(s.invertExtent(-1).every(Number.isNaN));
  assert(s.invertExtent(0.5).every(Number.isNaN));
  assert(s.invertExtent(2).every(Number.isNaN));
  assert(s.invertExtent("a").every(Number.isNaN));
});

it("quantize.invertExtent() returns the first match if duplicate values exist in the range", () => {
  const s = scaleQuantize().range([0, 1, 2, 0]);
  assert.deepStrictEqual(s.invertExtent(0), [0.00, 0.25]);
  assert.deepStrictEqual(s.invertExtent(1), [0.25, 0.50]);
});

it("quantize.invertExtent(y) is exactly consistent with quantize(x)", () => {
  const s = scaleQuantize().domain([4.2, 6.2]).range(range(10));
  s.range().forEach(function(y) {
    const e = s.invertExtent(y);
    assert.strictEqual(s(e[0]), y);
    assert.strictEqual(s(e[1]), y < 9 ? y + 1 : y);
  });
});
