import assert from "assert";
import {pairs} from "../src/index.js";

it("pairs(array) returns the empty array if input array has fewer than two elements", () => {
  assert.deepStrictEqual(pairs([]), []);
  assert.deepStrictEqual(pairs([1]), []);
});

it("pairs(array) returns pairs of adjacent elements in the given array", () => {
  const a = {}, b = {}, c = {}, d = {};
  assert.deepStrictEqual(pairs([1, 2]), [[1, 2]]);
  assert.deepStrictEqual(pairs([1, 2, 3]), [[1, 2], [2, 3]]);
  assert.deepStrictEqual(pairs([a, b, c, d]), [[a, b], [b, c], [c, d]]);
});

it("pairs(array, f) invokes the function f for each pair of adjacent elements", () => {
  assert.deepStrictEqual(pairs([1, 3, 7], (a, b) => b - a), [2, 4]);
});

it("pairs(array) includes null or undefined elements in pairs", () => {
  assert.deepStrictEqual(pairs([1, null, 2]), [[1, null], [null, 2]]);
  assert.deepStrictEqual(pairs([1, 2, undefined]), [[1, 2], [2, undefined]]);
});
