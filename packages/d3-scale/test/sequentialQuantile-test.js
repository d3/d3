import assert from "assert";
import {scaleSequentialQuantile} from "../src/index.js";

it("sequentialQuantile() clamps", () => {
  const s = scaleSequentialQuantile().domain([0, 1, 2, 3, 10]);
  assert.strictEqual(s(-1), 0);
  assert.strictEqual(s(0), 0);
  assert.strictEqual(s(1), 0.25);
  assert.strictEqual(s(10), 1);
  assert.strictEqual(s(20), 1);
});

it("sequentialQuantile().domain() sorts the domain", () => {
  const s = scaleSequentialQuantile().domain([0, 2, 9, 0.1, 10]);
  assert.deepStrictEqual(s.domain(), [0, 0.1, 2, 9, 10]);
});

it("sequentialQuantile().range() returns the computed range", () => {
  const s = scaleSequentialQuantile().domain([0, 2, 9, 0.1, 10]);
  assert.deepStrictEqual(s.range(), [0 / 4, 1 / 4, 2 / 4, 3 / 4, 4 / 4]);
});

it("sequentialQuantile().quantiles(n) computes n + 1 quantiles", () => {
  const s = scaleSequentialQuantile().domain(Array.from({length: 2000}, (_, i) => 2 * i / 1999));
  assert.deepStrictEqual(s.quantiles(4), [0, 0.5, 1, 1.5, 2]);
});
