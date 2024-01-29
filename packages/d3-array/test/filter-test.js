import assert from "assert";
import * as d3 from "../src/index.js";

it("filter(values, test) returns the values that pass the test", () => {
  assert.deepStrictEqual(d3.filter([1, 2, 3, 2, 1], x => x & 1), [1, 3, 1]);
});

it("filter(values, test) accepts an iterable", () => {
  assert.deepStrictEqual(d3.filter(new Set([1, 2, 3, 2, 1]), x => x & 1), [1, 3]);
  assert.deepStrictEqual(d3.filter((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x & 1), [1, 3, 1]);
});

it("filter(values, test) accepts a typed array", () => {
  assert.deepStrictEqual(d3.filter(Uint8Array.of(1, 2, 3, 2, 1), x => x & 1), [1, 3, 1]);
});

it("filter(values, test) enforces that test is a function", () => {
  assert.throws(() => d3.filter([]), TypeError);
});

it("filter(values, test) enforces that values is iterable", () => {
  assert.throws(() => d3.filter({}, () => true), TypeError);
});

it("filter(values, test) passes test (value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.filter(values, function() { calls.push([this, ...arguments]); });
  assert.deepStrictEqual(calls, [
    [undefined, 5, 0, values],
    [undefined, 4, 1, values],
    [undefined, 3, 2, values],
    [undefined, 2, 3, values],
    [undefined, 1, 4, values]
  ]);
});

it("filter(values, test) does not skip sparse elements", () => {
  assert.deepStrictEqual(d3.filter([, 1, 2,, ], () => true), [undefined, 1, 2, undefined]);
});
