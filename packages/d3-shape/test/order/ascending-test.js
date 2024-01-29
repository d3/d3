import assert from "assert";
import {stackOrderAscending} from "../../src/index.js";

it("stackOrderAscending(series) returns an order by sum", () => {
  assert.deepStrictEqual(stackOrderAscending([
    [[0, 1], [0, 2], [0, 3]],
    [[0, 2], [0, 3], [0, 4]],
    [[0, 0], [0, 1], [0, 2]]
  ]), [2, 0, 1]);
});

it("stackOrderAscending(series) treats NaN values as zero", () => {
  assert.deepStrictEqual(stackOrderAscending([
    [[0, 1], [0, 2], [0, NaN], [0, 3]],
    [[0, 2], [0, 3], [0, NaN], [0, 4]],
    [[0, 0], [0, 1], [0, NaN], [0, 2]]
  ]), [2, 0, 1]);
});
