import assert from "assert";
import {stackOrderAppearance} from "../../src/index.js";

it("stackOrderAppearance(series) returns an order by appearance", () => {
  assert.deepStrictEqual(stackOrderAppearance([
    [[0, 0], [0, 0], [0, 1]],
    [[0, 3], [0, 2], [0, 0]],
    [[0, 0], [0, 4], [0, 0]]
  ]), [1, 2, 0]);
});

it("stackOrderAppearance(series) treats NaN values as zero", () => {
  assert.deepStrictEqual(stackOrderAppearance([
    [[0, NaN], [0, NaN], [0, 1]],
    [[0, 3], [0, 2], [0, NaN]],
    [[0, NaN], [0, 4], [0, NaN]]
  ]), [1, 2, 0]);
});
