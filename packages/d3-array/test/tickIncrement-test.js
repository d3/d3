import assert from "assert";
import {tickIncrement} from "../src/index.js";

it("tickIncrement(start, stop, count) returns NaN if any argument is NaN", () => {
  assert(isNaN(tickIncrement(NaN, 1, 1)));
  assert(isNaN(tickIncrement(0, NaN, 1)));
  assert(isNaN(tickIncrement(0, 1, NaN)));
  assert(isNaN(tickIncrement(NaN, NaN, 1)));
  assert(isNaN(tickIncrement(0, NaN, NaN)));
  assert(isNaN(tickIncrement(NaN, 1, NaN)));
  assert(isNaN(tickIncrement(NaN, NaN, NaN)));
});

it("tickIncrement(start, stop, count) returns NaN or -Infinity if start === stop", () => {
  assert(isNaN(tickIncrement(1, 1, -1)));
  assert(isNaN(tickIncrement(1, 1, 0)));
  assert(isNaN(tickIncrement(1, 1, NaN)));
  assert.strictEqual(tickIncrement(1, 1, 1), -Infinity);
  assert.strictEqual(tickIncrement(1, 1, 10), -Infinity);
});

it("tickIncrement(start, stop, count) returns 0 or Infinity if count is not positive", () => {
  assert.strictEqual(tickIncrement(0, 1, -1), Infinity);
  assert.strictEqual(tickIncrement(0, 1, 0), Infinity);
});

it("tickIncrement(start, stop, count) returns -Infinity if count is infinity", () => {
  assert.strictEqual(tickIncrement(0, 1, Infinity), -Infinity);
});

it("tickIncrement(start, stop, count) returns approximately count + 1 tickIncrement when start < stop", () => {
  assert.strictEqual(tickIncrement(  0,  1, 10), -10);
  assert.strictEqual(tickIncrement(  0,  1,  9), -10);
  assert.strictEqual(tickIncrement(  0,  1,  8), -10);
  assert.strictEqual(tickIncrement(  0,  1,  7), -5);
  assert.strictEqual(tickIncrement(  0,  1,  6), -5);
  assert.strictEqual(tickIncrement(  0,  1,  5), -5);
  assert.strictEqual(tickIncrement(  0,  1,  4), -5);
  assert.strictEqual(tickIncrement(  0,  1,  3), -2);
  assert.strictEqual(tickIncrement(  0,  1,  2), -2);
  assert.strictEqual(tickIncrement(  0,  1,  1), 1);
  assert.strictEqual(tickIncrement(  0, 10, 10), 1);
  assert.strictEqual(tickIncrement(  0, 10,  9), 1);
  assert.strictEqual(tickIncrement(  0, 10,  8), 1);
  assert.strictEqual(tickIncrement(  0, 10,  7), 2);
  assert.strictEqual(tickIncrement(  0, 10,  6), 2);
  assert.strictEqual(tickIncrement(  0, 10,  5), 2);
  assert.strictEqual(tickIncrement(  0, 10,  4), 2);
  assert.strictEqual(tickIncrement(  0, 10,  3), 5);
  assert.strictEqual(tickIncrement(  0, 10,  2), 5);
  assert.strictEqual(tickIncrement(  0, 10,  1), 10);
  assert.strictEqual(tickIncrement(-10, 10, 10),  2);
  assert.strictEqual(tickIncrement(-10, 10,  9),  2);
  assert.strictEqual(tickIncrement(-10, 10,  8),  2);
  assert.strictEqual(tickIncrement(-10, 10,  7),  2);
  assert.strictEqual(tickIncrement(-10, 10,  6),  5);
  assert.strictEqual(tickIncrement(-10, 10,  5),  5);
  assert.strictEqual(tickIncrement(-10, 10,  4),  5);
  assert.strictEqual(tickIncrement(-10, 10,  3),  5);
  assert.strictEqual(tickIncrement(-10, 10,  2), 10);
  assert.strictEqual(tickIncrement(-10, 10,  1), 20);
});
