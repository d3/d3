import assert from "assert";
import {thresholdScott} from "../../src/index.js";

it("thresholdScott(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdScott([4, 3, 2, 1, NaN], 1, 4), 2);
});

it("thresholdScott(values, min, max) handles values with zero deviation", () => {
  assert.strictEqual(thresholdScott([1, 1, 1, 1], 1, 4), 1);
});

it("thresholdScott(values, min, max) handles single-value arrays", () => {
  assert.strictEqual(thresholdScott([1], 1, 4), 1);
});

it("thresholdScott(values, min, max) handles empty arrays", () => {
  assert.strictEqual(thresholdScott([], 1, 4), 1);
});
