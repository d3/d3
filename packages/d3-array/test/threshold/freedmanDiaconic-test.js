import assert from "assert";
import {thresholdFreedmanDiaconis} from "../../src/index.js";

it("thresholdFreedmanDiaconis(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdFreedmanDiaconis([4, 3, 2, 1, NaN], 1, 4), 2);
});

it("thresholdFreedmanDiaconis(values, min, max) handles values with zero deviation", () => {
  assert.strictEqual(thresholdFreedmanDiaconis([1, 1, 1, 1], 1, 4), 1);
});

it("thresholdFreedmanDiaconis(values, min, max) handles single-value arrays", () => {
  assert.strictEqual(thresholdFreedmanDiaconis([1], 1, 4), 1);
});

it("thresholdFreedmanDiaconis(values, min, max) handles empty arrays", () => {
  assert.strictEqual(thresholdFreedmanDiaconis([], 1, 4), 1);
});
