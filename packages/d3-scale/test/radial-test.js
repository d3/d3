import assert from "assert";
import {scaleRadial} from "../src/index.js";

it("scaleRadial() has the expected defaults", () => {
  const s = scaleRadial();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.clamp(), false);
  assert.strictEqual(s.round(), false);
});

it("scaleRadial(range) sets the range", () => {
  const s = scaleRadial([100, 200]);
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [100, 200]);
  assert.strictEqual(s(0.5), 158.11388300841898);
});

it("scaleRadial(domain, range) sets the range", () => {
  const s = scaleRadial([1, 2], [10, 20]);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(s.range(), [10, 20]);
  assert.strictEqual(s(1.5), 15.811388300841896);
});

it("radial(x) maps a domain value x to a range value y", () => {
  assert.strictEqual(scaleRadial([1, 2])(0.5), 1.5811388300841898);
});

it("radial(x) ignores extra range values if the domain is smaller than the range", () => {
  assert.strictEqual(scaleRadial().domain([-10, 0]).range([2, 3, 4]).clamp(true)(-5), 2.5495097567963922);
  assert.strictEqual(scaleRadial().domain([-10, 0]).range([2, 3, 4]).clamp(true)(50), 3);
});

it("radial(x) ignores extra domain values if the range is smaller than the domain", () => {
  assert.strictEqual(scaleRadial().domain([-10, 0, 100]).range([2, 3]).clamp(true)(-5), 2.5495097567963922);
  assert.strictEqual(scaleRadial().domain([-10, 0, 100]).range([2, 3]).clamp(true)(50), 3);
});

it("radial(x) maps an empty domain to the middle of the range", () => {
  assert.strictEqual(scaleRadial().domain([0, 0]).range([1, 2])(0), 1.5811388300841898);
  assert.strictEqual(scaleRadial().domain([0, 0]).range([2, 1])(1), 1.5811388300841898);
});

it("radial(x) can map a bilinear domain with two values to the corresponding range", () => {
  const s = scaleRadial().domain([1, 2]);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.strictEqual(s(0.5), -0.7071067811865476);
  assert.strictEqual(s(1.0),  0.0);
  assert.strictEqual(s(1.5),  0.7071067811865476);
  assert.strictEqual(s(2.0),  1.0);
  assert.strictEqual(s(2.5),  1.224744871391589);
  assert.strictEqual(s.invert(-0.5), 0.75);
  assert.strictEqual(s.invert( 0.0), 1.0);
  assert.strictEqual(s.invert( 0.5), 1.25);
  assert.strictEqual(s.invert( 1.0), 2.0);
  assert.strictEqual(s.invert( 1.5), 3.25);
});

it("radial(NaN) returns undefined", () => {
  const s = scaleRadial();
  assert.strictEqual(s(NaN), undefined);
  assert.strictEqual(s(undefined), undefined);
  assert.strictEqual(s("foo"), undefined);
  assert.strictEqual(s({}), undefined);
});

it("radial.unknown(unknown)(NaN) returns the specified unknown value", () => {
  assert.strictEqual(scaleRadial().unknown("foo")(NaN), "foo");
});

it("radial(x) can handle a negative range", () => {
  assert.strictEqual(scaleRadial([-1, -2])(0.5), -1.5811388300841898);
});

it("radial(x) can clamp negative values", () => {
  assert.strictEqual(scaleRadial([-1, -2]).clamp(true)(-0.5), -1);
  assert.strictEqual(scaleRadial().clamp(true)(-0.5), 0);
  assert.strictEqual(scaleRadial([-0.25, 0], [1, 2]).clamp(true)(-0.5), 1);
});
