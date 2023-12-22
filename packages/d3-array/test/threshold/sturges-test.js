import assert from "assert";
import {thresholdSturges} from "../../src/index.js";

it("thresholdSturges(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdSturges([4, 3, 2, 1, NaN], 1, 4), 3);
  assert.strictEqual(thresholdSturges([1], 1, 4), 1);
});

it("thresholdSturges(values, min, max) handles empty arrays", () => {
  assert.strictEqual(thresholdSturges([], 1, 4), 1);
});
