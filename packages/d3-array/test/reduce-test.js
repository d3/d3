import assert from "assert";
import {reduce} from "../src/index.js";

it("reduce(values, reducer) returns the reduced value", () => {
  assert.strictEqual(reduce([1, 2, 3, 2, 1], (p, v) => p + v), 9);
  assert.strictEqual(reduce([1, 2], (p, v) => p + v), 3);
  assert.strictEqual(reduce([1], (p, v) => p + v), 1);
  assert.strictEqual(reduce([], (p, v) => p + v), undefined);
});

it("reduce(values, reducer, initial) returns the reduced value", () => {
  assert.strictEqual(reduce([1, 2, 3, 2, 1], (p, v) => p + v, 0), 9);
  assert.strictEqual(reduce([1], (p, v) => p + v, 0), 1);
  assert.strictEqual(reduce([], (p, v) => p + v, 0), 0);
  assert.deepStrictEqual(reduce([1, 2, 3, 2, 1], (p, v) => p.concat(v), []), [1, 2, 3, 2, 1]);
});

it("reduce(values, reducer) accepts an iterable", () => {
  assert.strictEqual(reduce(new Set([1, 2, 3, 2, 1]), (p, v) => p + v), 6);
  assert.strictEqual(reduce((function*() { yield* [1, 2, 3, 2, 1]; })(), (p, v) => p + v), 9);
  assert.strictEqual(reduce(Uint8Array.of(1, 2, 3, 2, 1), (p, v) => p + v), 9);
});

it("reduce(values, reducer) enforces that test is a function", () => {
  assert.throws(() => reduce([]), TypeError);
});

it("reduce(values, reducer) enforces that values is iterable", () => {
  assert.throws(() => reduce({}, () => true), TypeError);
});

it("reduce(values, reducer) passes reducer (reduced, value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  reduce(values, function(p, v) { calls.push([this, ...arguments]); return p + v; });
  assert.deepStrictEqual(calls, [
    [undefined, 5, 4, 1, values],
    [undefined, 9, 3, 2, values],
    [undefined, 12, 2, 3, values],
    [undefined, 14, 1, 4, values]
  ]);
});

it("reduce(values, reducer, initial) passes reducer (reduced, value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  reduce(values, function(p, v) { calls.push([this, ...arguments]); return p + v; }, 0);
  assert.deepStrictEqual(calls, [
    [undefined, 0, 5, 0, values],
    [undefined, 5, 4, 1, values],
    [undefined, 9, 3, 2, values],
    [undefined, 12, 2, 3, values],
    [undefined, 14, 1, 4, values]
  ]);
});

it("reduce(values, reducer, initial) does not skip sparse elements", () => {
  assert.strictEqual(reduce([, 1, 2,, ], (p, v) => p + (v === undefined ? -1 : v), 0), 1);
});
