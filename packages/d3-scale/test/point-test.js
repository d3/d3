import assert from "assert";
import {scaleBand, scalePoint} from "../src/index.js";

it("scalePoint() has the expected defaults", () => {
  const s = scalePoint();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.bandwidth(), 0);
  assert.strictEqual(s.step(), 1);
  assert.strictEqual(s.round(), false);
  assert.strictEqual(s.padding(), 0);
  assert.strictEqual(s.align(), 0.5);
});

it("scalePoint() does not expose paddingInner and paddingOuter", () => {
  const s = scalePoint();
  assert.strictEqual(s.paddingInner, undefined);
  assert.strictEqual(s.paddingOuter, undefined);
});

it("scalePoint() is similar to scaleBand().paddingInner(1)", () => {
  const p = scalePoint().domain(["foo", "bar"]).range([0, 960]);
  const b = scaleBand().domain(["foo", "bar"]).range([0, 960]).paddingInner(1);
  assert.deepStrictEqual(p.domain().map(p), b.domain().map(b));
  assert.strictEqual(p.bandwidth(), b.bandwidth());
  assert.strictEqual(p.step(), b.step());
});

it("point.padding(p) sets the band outer padding to p", () => {
  const p = scalePoint().domain(["foo", "bar"]).range([0, 960]).padding(0.5);
  const b = scaleBand().domain(["foo", "bar"]).range([0, 960]).paddingInner(1).paddingOuter(0.5);
  assert.deepStrictEqual(p.domain().map(p), b.domain().map(b));
  assert.strictEqual(p.bandwidth(), b.bandwidth());
  assert.strictEqual(p.step(), b.step());
});

it("point.copy() returns a copy", () => {
  const s = scalePoint();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.bandwidth(), 0);
  assert.strictEqual(s.step(), 1);
  assert.strictEqual(s.round(), false);
  assert.strictEqual(s.padding(), 0);
  assert.strictEqual(s.align(), 0.5);
});
