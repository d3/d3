import assert from "assert";
import {extent, mean, range} from "d3-array";
import {randomInt, randomLcg} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("randomInt(max) returns random integers with a mean of (max - 1) / 2", () => {
  const r = randomInt.source(randomLcg(0.7350864698209636));
  assertInDelta(mean(range(10000).map(r(3))), 1.0, 0.05);
  assertInDelta(mean(range(10000).map(r(21))), 10.0, 0.5);
});

it("randomInt(max) returns random integers in the range [0, max - 1]", () => {
  const r = randomInt.source(randomLcg(0.17809137433591848));
  assert.deepStrictEqual(extent(range(10000).map(r(3))), [0, 2]);
  assert.deepStrictEqual(extent(range(10000).map(r(21))), [0, 20]);
});

it("randomInt(min, max) returns random integers with a mean of (min + max - 1) / 2", () => {
  const r = randomInt.source(randomLcg(0.46394764422984647));
  assertInDelta(mean(range(10000).map(r(10, 43))), 26, 0.5);
});

it("randomInt(min, max) returns random integers in the range [min, max - 1]", () => {
  const r = randomInt.source(randomLcg(0.9598431138570096));
  assert.deepStrictEqual(extent(range(10000).map(r(10, 42))), [10, 41]);
});
