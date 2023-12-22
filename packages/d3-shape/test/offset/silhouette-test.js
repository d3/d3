import assert from "assert";
import {stackOffsetSilhouette, stackOrderNone, stackOrderReverse} from "../../src/index.js";

it("stackOffsetSilhouette(series, order) centers the stack around zero", () => {
  const series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  stackOffsetSilhouette(series, stackOrderNone(series));
  assert.deepStrictEqual(series, [
    [[0 - 9 / 2, 1 - 9 / 2], [0 - 8 / 2, 2 - 8 / 2], [0 - 7 / 2, 1 - 7 / 2]],
    [[1 - 9 / 2, 4 - 9 / 2], [2 - 8 / 2, 6 - 8 / 2], [1 - 7 / 2, 3 - 7 / 2]],
    [[4 - 9 / 2, 9 - 9 / 2], [6 - 8 / 2, 8 - 8 / 2], [3 - 7 / 2, 7 - 7 / 2]]
  ]);
});

it("stackOffsetSilhouette(series, order) treats NaN as zero", () => {
  const series = [
    [[0, 1], [0,   2], [0, 1]],
    [[0, 3], [0, NaN], [0, 2]],
    [[0, 5], [0,   2], [0, 4]]
  ];
  stackOffsetSilhouette(series, stackOrderNone(series));
  assert(isNaN(series[1][1][1]));
  series[1][1][1] = "NaN"; // can’t assert.strictEqual NaN
  assert.deepStrictEqual(series, [
    [[0 - 9 / 2, 1 - 9 / 2], [0 - 4 / 2, 2 - 4 / 2], [0 - 7 / 2, 1 - 7 / 2]],
    [[1 - 9 / 2, 4 - 9 / 2], [2 - 4 / 2,     "NaN"], [1 - 7 / 2, 3 - 7 / 2]],
    [[4 - 9 / 2, 9 - 9 / 2], [2 - 4 / 2, 4 - 4 / 2], [3 - 7 / 2, 7 - 7 / 2]]
  ]);
});

it("stackOffsetSilhouette(series, order) observes the specified order", () => {
  const series = [
    [[0, 1], [0, 2], [0, 1]],
    [[0, 3], [0, 4], [0, 2]],
    [[0, 5], [0, 2], [0, 4]]
  ];
  stackOffsetSilhouette(series, stackOrderReverse(series));
  assert.deepStrictEqual(series, [
    [[8 - 9 / 2, 9 - 9 / 2], [6 - 8 / 2, 8 - 8 / 2], [6 - 7 / 2, 7 - 7 / 2]],
    [[5 - 9 / 2, 8 - 9 / 2], [2 - 8 / 2, 6 - 8 / 2], [4 - 7 / 2, 6 - 7 / 2]],
    [[0 - 9 / 2, 5 - 9 / 2], [0 - 8 / 2, 2 - 8 / 2], [0 - 7 / 2, 4 - 7 / 2]]
  ]);
});
