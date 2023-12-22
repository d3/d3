import assert from "assert";
import {interpolateDate} from "../src/index.js";

it("interpolateDate(a, b) interpolates between two dates a and b", () => {
  const i = interpolateDate(new Date(2000, 0, 1), new Date(2000, 0, 2));
  assert.strictEqual(i(0.0) instanceof Date, true);
  assert.strictEqual(i(0.5) instanceof Date, true);
  assert.strictEqual(i(1.0) instanceof Date, true);
  assert.strictEqual(+i(0.2), +new Date(2000, 0, 1, 4, 48));
  assert.strictEqual(+i(0.4), +new Date(2000, 0, 1, 9, 36));
});

it("interpolateDate(a, b) reuses the output datea", () => {
  const i = interpolateDate(new Date(2000, 0, 1), new Date(2000, 0, 2));
  assert.strictEqual(i(0.2), i(0.4));
});

it("interpolateDate(a, b) gives exact ends for t=0 and t=1", () => {
  const a = new Date(1e8 * 24 * 60 * 60 * 1000), b = new Date(-1e8 * 24 * 60 * 60 * 1000 +1);
  assert.strictEqual(+interpolateDate(a, b)(1), +b);
  assert.strictEqual(+interpolateDate(a, b)(0), +a);
});
