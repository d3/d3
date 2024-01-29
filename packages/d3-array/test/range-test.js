import assert from "assert";
import {range} from "../src/index.js";

it("range(stop) returns [0, 1, 2, … stop - 1]", () => {
  assert.deepStrictEqual(range(5), [0, 1, 2, 3, 4]);
  assert.deepStrictEqual(range(2.01), [0, 1, 2]);
  assert.deepStrictEqual(range(1), [0]);
  assert.deepStrictEqual(range(.5), [0]);
});

it("range(stop) returns an empty array if stop <= 0", () => {
  assert.deepStrictEqual(range(0), []);
  assert.deepStrictEqual(range(-0.5), []);
  assert.deepStrictEqual(range(-1), []);
});

it("range(stop) returns an empty array if stop is NaN", () => {
  assert.deepStrictEqual(range(NaN), []);
  assert.deepStrictEqual(range(), []);
});

it("range(start, stop) returns [start, start + 1, … stop - 1]", () => {
  assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4]);
  assert.deepStrictEqual(range(2, 5), [2, 3, 4]);
  assert.deepStrictEqual(range(2.5, 5), [2.5, 3.5, 4.5]);
  assert.deepStrictEqual(range(-1, 3), [-1, 0, 1, 2]);
});

it("range(start, stop) returns an empty array if start or stop is NaN", () => {
  assert.deepStrictEqual(range(0, NaN), []);
  assert.deepStrictEqual(range(1, NaN), []);
  assert.deepStrictEqual(range(-1, NaN), []);
  assert.deepStrictEqual(range(0, undefined), []);
  assert.deepStrictEqual(range(1, undefined), []);
  assert.deepStrictEqual(range(-1, undefined), []);
  assert.deepStrictEqual(range(NaN, 0), []);
  assert.deepStrictEqual(range(NaN, 1), []);
  assert.deepStrictEqual(range(NaN, -1), []);
  assert.deepStrictEqual(range(undefined, 0), []);
  assert.deepStrictEqual(range(undefined, 1), []);
  assert.deepStrictEqual(range(undefined, -1), []);
  assert.deepStrictEqual(range(NaN, NaN), []);
  assert.deepStrictEqual(range(undefined, undefined), []);
});

it("range(start, stop) returns an empty array if start >= stop", () => {
  assert.deepStrictEqual(range(0, 0), []);
  assert.deepStrictEqual(range(5, 5), []);
  assert.deepStrictEqual(range(6, 5), []);
  assert.deepStrictEqual(range(10, 10), []);
  assert.deepStrictEqual(range(20, 10), []);
});

it("range(start, stop, step) returns [start, start + step, start + 2 * step, … stop - step]", () => {
  assert.deepStrictEqual(range(0, 5, 1), [0, 1, 2, 3, 4]);
  assert.deepStrictEqual(range(0, 5, 2), [0, 2, 4]);
  assert.deepStrictEqual(range(2, 5, 2), [2, 4]);
  assert.deepStrictEqual(range(-1, 3, 2), [-1, 1]);
});

it("range(start, stop, step) allows a negative step", () => {
  assert.deepStrictEqual(range(5, 0, -1), [5, 4, 3, 2, 1]);
  assert.deepStrictEqual(range(5, 0, -2), [5, 3, 1]);
  assert.deepStrictEqual(range(5, 2, -2), [5, 3]);
  assert.deepStrictEqual(range(3, -1, -2), [3, 1]);
});

it("range(start, stop, step) returns an empty array if start >= stop and step > 0", () => {
  assert.deepStrictEqual(range(5, 5, 2), []);
  assert.deepStrictEqual(range(6, 5, 2), []);
  assert.deepStrictEqual(range(10, 10, 1), []);
  assert.deepStrictEqual(range(10, 10, 0.5), []);
  assert.deepStrictEqual(range(0, 0, 1), []);
  assert.deepStrictEqual(range(0, 0, 0.5), []);
  assert.deepStrictEqual(range(20, 10, 2), []);
  assert.deepStrictEqual(range(20, 10, 1), []);
  assert.deepStrictEqual(range(20, 10, 0.5), []);
});

it("range(start, stop, step) returns an empty array if start >= stop and step < 0", () => {
  assert.deepStrictEqual(range(5, 5, -2), []);
  assert.deepStrictEqual(range(5, 6, -2), []);
  assert.deepStrictEqual(range(10, 10, -1), []);
  assert.deepStrictEqual(range(10, 10, -0.5), []);
  assert.deepStrictEqual(range(0, 0, -1), []);
  assert.deepStrictEqual(range(0, 0, -0.5), []);
  assert.deepStrictEqual(range(10, 20, -2), []);
  assert.deepStrictEqual(range(10, 20, -1), []);
  assert.deepStrictEqual(range(10, 20, -0.5), []);
});

it("range(start, stop, step) returns an empty array if start, stop or step is NaN", () => {
  assert.deepStrictEqual(range(NaN, 3, 2), []);
  assert.deepStrictEqual(range(3, NaN, 2), []);
  assert.deepStrictEqual(range(0, 5, NaN), []);
  assert.deepStrictEqual(range(NaN, NaN, NaN), []);
  assert.deepStrictEqual(range(NaN, NaN, NaN), []);
  assert.deepStrictEqual(range(undefined, undefined, undefined), []);
  assert.deepStrictEqual(range(0, 10, NaN), []);
  assert.deepStrictEqual(range(10, 0, NaN), []);
  assert.deepStrictEqual(range(0, 10, undefined), []);
  assert.deepStrictEqual(range(10, 0, undefined), []);
});

it("range(start, stop, step) returns an empty array if step is zero", () => {
  assert.deepStrictEqual(range(0, 5, 0), []);
});

it("range(start, stop, step) returns exactly [start + step * i, …] for fractional steps", () => {
  assert.deepStrictEqual(range(0, 0.5, 0.1), [0 + 0.1 * 0, 0 + 0.1 * 1, 0 + 0.1 * 2, 0 + 0.1 * 3, 0 + 0.1 * 4]);
  assert.deepStrictEqual(range(0.5, 0, -0.1), [0.5 - 0.1 * 0, 0.5 - 0.1 * 1, 0.5 - 0.1 * 2, 0.5 - 0.1 * 3, 0.5 - 0.1 * 4]);
  assert.deepStrictEqual(range(-2, -1.2, 0.1), [-2 + 0.1 * 0, -2 + 0.1 * 1, -2 + 0.1 * 2, -2 + 0.1 * 3, -2 + 0.1 * 4, -2 + 0.1 * 5, -2 + 0.1 * 6, -2 + 0.1 * 7]);
  assert.deepStrictEqual(range(-1.2, -2, -0.1), [-1.2 - 0.1 * 0, -1.2 - 0.1 * 1, -1.2 - 0.1 * 2, -1.2 - 0.1 * 3, -1.2 - 0.1 * 4, -1.2 - 0.1 * 5, -1.2 - 0.1 * 6, -1.2 - 0.1 * 7]);
});

it("range(start, stop, step) returns exactly [start + step * i, …] for very small fractional steps", () => {
  assert.deepStrictEqual(range(2.1e-31, 5e-31, 1.1e-31), [2.1e-31 + 1.1e-31 * 0, 2.1e-31 + 1.1e-31 * 1, 2.1e-31 + 1.1e-31 * 2]);
  assert.deepStrictEqual(range(5e-31, 2.1e-31, -1.1e-31), [5e-31 - 1.1e-31 * 0, 5e-31 - 1.1e-31 * 1, 5e-31 - 1.1e-31 * 2]);
});

it("range(start, stop, step) returns exactly [start + step * i, …] for very large fractional steps", () => {
  assert.deepStrictEqual(range(1e300, 2e300, 0.3e300), [1e300 + 0.3e300 * 0, 1e300 + 0.3e300 * 1, 1e300 + 0.3e300 * 2, 1e300 + 0.3e300 * 3]);
  assert.deepStrictEqual(range(2e300, 1e300, -0.3e300), [2e300 - 0.3e300 * 0, 2e300 - 0.3e300 * 1, 2e300 - 0.3e300 * 2, 2e300 - 0.3e300 * 3]);
});
``
