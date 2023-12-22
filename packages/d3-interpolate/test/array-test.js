import assert from "assert";
import {interpolateArray} from "../src/index.js";

it("interpolateArray(a, b) interpolates defined elements in a and b", () => {
  assert.deepStrictEqual(interpolateArray([2, 12], [4, 24])(0.5), [3, 18]);
});

it("interpolateArray(a, b) interpolates nested objects and arrays", () => {
  assert.deepStrictEqual(interpolateArray([[2, 12]], [[4, 24]])(0.5), [[3, 18]]);
  assert.deepStrictEqual(interpolateArray([{foo: [2, 12]}], [{foo: [4, 24]}])(0.5), [{foo: [3, 18]}]);
});

it("interpolateArray(a, b) ignores elements in a that are not in b", () => {
  assert.deepStrictEqual(interpolateArray([2, 12, 12], [4, 24])(0.5), [3, 18]);
});

it("interpolateArray(a, b) uses constant elements in b that are not in a", () => {
  assert.deepStrictEqual(interpolateArray([2, 12], [4, 24, 12])(0.5), [3, 18, 12]);
});

it("interpolateArray(a, b) treats undefined as an empty array", () => {
  assert.deepStrictEqual(interpolateArray(undefined, [2, 12])(0.5), [2, 12]);
  assert.deepStrictEqual(interpolateArray([2, 12], undefined)(0.5), []);
  assert.deepStrictEqual(interpolateArray(undefined, undefined)(0.5), []);
});

it("interpolateArray(a, b) interpolates array-like objects", () => {
  const array = new Float64Array(2);
  const args = (function() { return arguments; })(2, 12);
  array[0] = 2;
  array[1] = 12;
  assert.deepStrictEqual(interpolateArray(array, [4, 24])(0.5), [3, 18]);
  assert.deepStrictEqual(interpolateArray(args, [4, 24])(0.5), [3, 18]);
});

it("interpolateArray(a, b) gives exact ends for t=0 and t=1", () => {
  const a = [2e+42], b = [335];
  assert.deepStrictEqual(interpolateArray(a, b)(1), b);
  assert.deepStrictEqual(interpolateArray(a, b)(0), a);
});
