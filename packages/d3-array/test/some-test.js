import assert from "assert";
import {some} from "../src/index.js";

it("some(values, test) returns true if any test passes", () => {
  assert.strictEqual(some([1, 2, 3, 2, 1], x => x & 1), true);
  assert.strictEqual(some([1, 2, 3, 2, 1], x => x > 3), false);
});

it("some(values, test) returns false if values is empty", () => {
  assert.strictEqual(some([], () => true), false);
});

it("some(values, test) accepts an iterable", () => {
  assert.strictEqual(some(new Set([1, 2, 3, 2, 1]), x => x >= 3), true);
  assert.strictEqual(some((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x >= 3), true);
  assert.strictEqual(some(Uint8Array.of(1, 2, 3, 2, 1), x => x >= 3), true);
});

it("some(values, test) enforces that test is a function", () => {
  assert.throws(() => some([]), TypeError);
});

it("some(values, test) enforces that values is iterable", () => {
  assert.throws(() => some({}, () => true), TypeError);
});

it("some(values, test) passes test (value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  some(values, function() { calls.push([this, ...arguments]); });
  assert.deepStrictEqual(calls, [
    [undefined, 5, 0, values],
    [undefined, 4, 1, values],
    [undefined, 3, 2, values],
    [undefined, 2, 3, values],
    [undefined, 1, 4, values]
  ]);
});

it("some(values, test) short-circuts when test returns truthy", () => {
  let calls = 0;
  assert.strictEqual(some([1, 2, 3], x => (++calls, x >= 2)), true);
  assert.strictEqual(calls, 2);
  assert.strictEqual(some([1, 2, 3], x => (++calls, x - 1)), true);
  assert.strictEqual(calls, 4);
});

it("some(values, test) does not skip sparse elements", () => {
  assert.deepStrictEqual(some([, 1, 2,, ], x => x === undefined), true);
});
