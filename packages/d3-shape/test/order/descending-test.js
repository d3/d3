import assert from "assert";
import {stackOrderDescending} from "../../src/index.js";

it("stackOrderDescending(series) returns an order by sum", () => {
  assert.deepStrictEqual(stackOrderDescending([
    [[0, 1], [0, 2], [0, 3]],
    [[0, 2], [0, 3], [0, 4]],
    [[0, 0], [0, 1], [0, 2]]
  ]), [1, 0, 2]);
});

it("stackOrderDescending(series) treats NaN values as zero", () => {
  assert.deepStrictEqual(stackOrderDescending([
    [[0, 1], [0, 2], [0, 3], [0, NaN]],
    [[0, 2], [0, 3], [0, 4], [0, NaN]],
    [[0, 0], [0, 1], [0, 2], [0, NaN]]
  ]), [1, 0, 2]);
});
