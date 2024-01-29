import assert from "assert";
import ascending from "../src/ascending.js";
import descending from "../src/descending.js";
import rank from "../src/rank.js";

it("rank(numbers) returns the rank of numbers", () => {
  assert.deepStrictEqual(rank([1000, 10, 0]), Float64Array.of(2, 1, 0));
  assert.deepStrictEqual(rank([1.2, 1.1, 1.2, 1.0, 1.5, 1.2]), Float64Array.of(2, 1, 2, 0, 5, 2));
});

it("rank(strings) returns the rank of letters", () => {
  assert.deepStrictEqual(rank([..."EDGFCBA"]), Float64Array.of(4, 3, 6, 5, 2, 1, 0));
  assert.deepStrictEqual(rank("EDGFCBA"), Float64Array.of(4, 3, 6, 5, 2, 1, 0));
});

it("rank(dates) returns the rank of Dates", () => {
  assert.deepStrictEqual(rank([new Date("2000-01-01"), new Date("2000-01-01"), new Date("1999-01-01"), new Date("2001-01-01")]), Float64Array.of(1, 1, 0, 3));
});

it("rank(iterator) accepts an iterator", () => {
  assert.deepStrictEqual(rank(new Set(["B", "C", "A"])), Float64Array.of(1, 2, 0));
});

it("rank(undefineds) ranks undefined as NaN", () => {
  assert.deepStrictEqual(rank([1.2, 1.1, undefined, 1.0, undefined, 1.5]), Float64Array.of(2, 1, NaN, 0, NaN, 3));
  assert.deepStrictEqual(rank([, null, , 1.2, 1.1, undefined, 1.0, NaN, 1.5]), Float64Array.of(NaN, NaN, NaN, 2, 1, NaN, 0, NaN, 3));
});

it("rank(values, valueof) accepts an accessor", () => {
  assert.deepStrictEqual(rank([{x: 3}, {x: 1}, {x: 2}, {x: 4}, {}], d => d.x), Float64Array.of(2, 0, 1, 3, NaN));
});

it("rank(values, compare) accepts a comparator", () => {
  assert.deepStrictEqual(rank([{x: 3}, {x: 1}, {x: 2}, {x: 4}, {}], (a, b) => a.x - b.x), Float64Array.of(2, 0, 1, 3, NaN));
  assert.deepStrictEqual(rank([{x: 3}, {x: 1}, {x: 2}, {x: 4}, {}], (a, b) => b.x - a.x), Float64Array.of(1, 3, 2, 0, NaN));
  assert.deepStrictEqual(rank(["aa", "ba", "bc", "bb", "ca"], (a, b) => ascending(a[0], b[0]) || ascending(a[1], b[1])), Float64Array.of(0, 1, 3, 2, 4));
  assert.deepStrictEqual(rank(["A", null, "B", "C", "D"], descending), Float64Array.of(3, NaN, 2, 1, 0));
});

it("rank(values) computes the ties as expected", () => {
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"]), Float64Array.of(0, 1, 1, 1, 4));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"]), Float64Array.of(0, 1, 1, 1, 1, 5));
});

it("rank(values) handles NaNs as expected", () => {
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null]), Float64Array.of(0, 1, 1, 1, 4, NaN));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null]), Float64Array.of(0, 1, 1, 1, 1, 5, NaN));
});
