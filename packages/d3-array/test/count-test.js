import assert from "assert";
import {count} from "../src/index.js";

it("count() accepts an iterable", () => {
  assert.deepStrictEqual(count([1, 2]), 2);
  assert.deepStrictEqual(count(new Set([1, 2])), 2);
  assert.deepStrictEqual(count(generate(1, 2)), 2);
});

it("count() ignores NaN, null", () => {
  assert.deepStrictEqual(count([NaN, null, 0, 1]), 2);
});

it("count() coerces to a number", () => {
  assert.deepStrictEqual(count(["1", " 2", "Fred"]), 2);
});

it("count() accepts an accessor", () => {
  assert.deepStrictEqual(count([{v:NaN}, {}, {v:0}, {v:1}], d => d.v), 2);
  assert.deepStrictEqual(count([{n: "Alice", age: NaN}, {n: "Bob", age: 18}, {n: "Other"}], d => d.age), 1);
});

function* generate(...values) {
  yield* values;
}
