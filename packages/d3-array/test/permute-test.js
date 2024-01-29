import assert from "assert";
import {permute} from "../src/index.js";

it("permute(…) permutes according to the specified index", () => {
  assert.deepStrictEqual(permute([3, 4, 5], [2, 1, 0]), [5, 4, 3]);
  assert.deepStrictEqual(permute([3, 4, 5], [2, 0, 1]), [5, 3, 4]);
  assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 2]), [3, 4, 5]);
});

it("permute(…) does not modify the input array", () => {
  const input = [3, 4, 5];
  permute(input, [2, 1, 0]);
  assert.deepStrictEqual(input, [3, 4, 5]);
});

it("permute(…) can duplicate input values", () => {
  assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 0]), [3, 4, 3]);
  assert.deepStrictEqual(permute([3, 4, 5], [2, 2, 2]), [5, 5, 5]);
  assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 1]), [3, 4, 4]);
});

it("permute(…) can return more elements", () => {
  assert.deepStrictEqual(permute([3, 4, 5], [0, 0, 1, 2]), [3, 3, 4, 5]);
  assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 1, 1]), [3, 4, 4, 4]);
});

it("permute(…) can return fewer elements", () => {
  assert.deepStrictEqual(permute([3, 4, 5], [0]), [3]);
  assert.deepStrictEqual(permute([3, 4, 5], [1, 2]), [4, 5]);
  assert.deepStrictEqual(permute([3, 4, 5], []), []);
});

it("permute(…) can return undefined elements", () => {
  assert.deepStrictEqual(permute([3, 4, 5], [10]), [undefined]);
  assert.deepStrictEqual(permute([3, 4, 5], [-1]), [undefined]);
  assert.deepStrictEqual(permute([3, 4, 5], [0, -1]), [3, undefined]);
});

it("permute(…) can take an object as the source", () => {
  assert.deepStrictEqual(permute({foo: 1, bar: 2}, ["bar", "foo"]), [2, 1]);
});

it("permute(…) can take a typed array as the source", () => {
  assert.deepStrictEqual(permute(Float32Array.of(1, 2), [0, 0, 1, 0]), [1, 1, 2, 1]);
  assert.strictEqual(Array.isArray(permute(Float32Array.of(1, 2), [0])), true);
});

it("permute(…) can take an iterable as the keys", () => {
  assert.deepStrictEqual(permute({foo: 1, bar: 2}, new Set(["bar", "foo"])), [2, 1]);
});
