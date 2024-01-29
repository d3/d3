import assert from "assert";
import {reverse} from "../src/index.js";

it("reverse(values) returns a reversed copy", () => {
  const input = [1, 3, 2, 5, 4];
  assert.deepStrictEqual(reverse(input), [4, 5, 2, 3, 1]);
  assert.deepStrictEqual(input, [1, 3, 2, 5, 4]); // does not mutate
});

it("reverse(values) returns an array", () => {
  assert.strictEqual(Array.isArray(reverse(Uint8Array.of(1, 2))), true);
});

it("reverse(values) accepts an iterable", () => {
  assert.deepStrictEqual(reverse(new Set([1, 2, 3, 2, 1])), [3, 2, 1]);
  assert.deepStrictEqual(reverse((function*() { yield* [1, 3, 2, 5, 4]; })()), [4, 5, 2, 3, 1]);
  assert.deepStrictEqual(reverse(Uint8Array.of(1, 3, 2, 5, 4)), [4, 5, 2, 3, 1]);
});

it("reverse(values) enforces that values is iterable", () => {
  assert.throws(() => reverse({}), TypeError);
});

it("reverse(values) does not skip sparse elements", () => {
  assert.deepStrictEqual(reverse([, 1, 2,, ]), [undefined, 2, 1, undefined]);
});
