import assert from "assert";
import {zip} from "../src/index.js";

it("zip() and zip([]) return an empty array", () => {
  assert.deepStrictEqual(zip(), []);
  assert.deepStrictEqual(zip([]), []);
});

it("zip([a, b, …]) returns [[a], [b], …]", () => {
  assert.deepStrictEqual(zip([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]);
});

it("zip([a1, b1, …], [a2, b2, …]) returns [[a1, a2], [b1, b2], …]", () => {
  assert.deepStrictEqual(zip([1, 2], [3, 4]), [[1, 3], [2, 4]]);
  assert.deepStrictEqual(zip([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
});

it("zip([a1, b1, …], [a2, b2, …], [a3, b3, …]) returns [[a1, a2, a3], [b1, b2, b3], …]", () => {
  assert.deepStrictEqual(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

it("zip(…) ignores extra elements given an irregular matrix", () => {
  assert.deepStrictEqual(zip([1, 2], [3, 4], [5, 6, 7]), [[1, 3, 5], [2, 4, 6]]);
});
