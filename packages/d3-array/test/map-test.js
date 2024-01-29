import assert from "assert";
import {map} from "../src/index.js";

it("map(values, mapper) returns the mapped values", () => {
  assert.deepStrictEqual(map([1, 2, 3, 2, 1], x => x * 2), [2, 4, 6, 4, 2]);
});

it("map(values, mapper) accepts an iterable", () => {
  assert.deepStrictEqual(map(new Set([1, 2, 3, 2, 1]), x => x * 2), [2, 4, 6]);
  assert.deepStrictEqual(map((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x * 2), [2, 4, 6, 4, 2]);
});

it("map(values, mapper) accepts a typed array", () => {
  assert.deepStrictEqual(map(Uint8Array.of(1, 2, 3, 2, 1), x => x * 2), [2, 4, 6, 4, 2]);
});

it("map(values, mapper) enforces that test is a function", () => {
  assert.throws(() => map([]), TypeError);
});

it("map(values, mapper) enforces that values is iterable", () => {
  assert.throws(() => map({}, () => true), TypeError);
});

it("map(values, mapper) passes test (value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  map(values, function() { calls.push([this, ...arguments]); });
  assert.deepStrictEqual(calls, [
    [undefined, 5, 0, values],
    [undefined, 4, 1, values],
    [undefined, 3, 2, values],
    [undefined, 2, 3, values],
    [undefined, 1, 4, values]
  ]);
});

it("map(values, mapper) does not skip sparse elements", () => {
  assert.deepStrictEqual(map([, 1, 2,, ], x => x * 2), [NaN, 2, 4, NaN]);
});
