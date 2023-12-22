import assert from "assert";
import {stackOffsetNone, stackOrderNone, stackOrderReverse} from "../../src/index.js";

it("stackOffsetNone(series, order) stacks upon the first layer’s existing positions", () => {
  const series = [
    [[1, 2], [2, 4], [3, 4]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  stackOffsetNone(series, stackOrderNone(series));
  assert.deepStrictEqual(series, [
    [[1,  2], [2,  4], [3,  4]],
    [[2,  5], [4,  8], [4,  6]],
    [[5, 10], [8, 10], [6, 10]]
  ]);
});

it("stackOffsetNone(series, order) treats NaN as zero", () => {
  const series = [
    [[0, 1], [0,   2], [0, 1]],
    [[0, 3], [0, NaN], [0, 2]],
    [[0, 5], [0,   2], [0, 4]]
  ];
  stackOffsetNone(series, stackOrderNone(series));
  assert(isNaN(series[1][1][1]));
  series[1][1][1] = "NaN"; // can’t assert.strictEqual NaN
  assert.deepStrictEqual(series, [
    [[0, 1], [0,     2], [0, 1]],
    [[1, 4], [2, "NaN"], [1, 3]],
    [[4, 9], [2,     4], [3, 7]]
  ]);
});

it("stackOffsetNone(series, order) observes the specified order", () => {
  const series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  stackOffsetNone(series, stackOrderReverse(series));
  assert.deepStrictEqual(series, [
    [[8, 9], [6, 8], [6, 7]],
    [[5, 8], [2, 6], [4, 6]],
    [[0, 5], [0, 2], [0, 4]]
  ]);
});
