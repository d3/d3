import assert from "assert";
import {quickselect} from "../src/index.js";

it("quickselect(array, k) does nothing if k is not a number", () => {
  const array = [3, 1, 2];
  assert.strictEqual(quickselect(array), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
  assert.strictEqual(quickselect(array, NaN), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
  assert.strictEqual(quickselect(array, "no"), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
  assert.strictEqual(quickselect(array, undefined), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
  assert.strictEqual(quickselect(array, null), array); // coerced to zero
  assert.deepStrictEqual(array, [1, 2, 3]);
});

it("quickselect(array, k) does nothing if k is less than left", () => {
  const array = [3, 1, 2];
  assert.strictEqual(quickselect(array, -1), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
  assert.strictEqual(quickselect(array, -0.5), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
});

it("quickselect(array, k) does nothing if k is greater than right", () => {
  const array = [3, 1, 2];
  assert.strictEqual(quickselect(array, 3), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
  assert.strictEqual(quickselect(array, 3.4), array);
  assert.deepStrictEqual(array, [3, 1, 2]);
});

it("quickselect(array, k) implicitly floors k, left, and right", () => {
  assert.deepStrictEqual(quickselect([3, 1, 2], 0.5), [1, 2, 3]);
  assert.deepStrictEqual(quickselect([3, 1, 2, 5, 4], 4.1), [3, 1, 2, 4, 5]);
  assert.deepStrictEqual(quickselect([3, 1, 2], 0, 0.5), [1, 2, 3]);
  assert.deepStrictEqual(quickselect([3, 1, 2], 0, 0, 2.5), [1, 2, 3]);
});
