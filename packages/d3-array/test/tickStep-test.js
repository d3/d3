import assert from "assert";
import {tickStep} from "../src/index.js";

it("tickStep(start, stop, count) returns NaN if any argument is NaN", () => {
  assert(isNaN(tickStep(NaN, 1, 1)));
  assert(isNaN(tickStep(0, NaN, 1)));
  assert(isNaN(tickStep(0, 1, NaN)));
  assert(isNaN(tickStep(NaN, NaN, 1)));
  assert(isNaN(tickStep(0, NaN, NaN)));
  assert(isNaN(tickStep(NaN, 1, NaN)));
  assert(isNaN(tickStep(NaN, NaN, NaN)));
});

it("tickStep(start, stop, count) returns NaN or 0 if start === stop", () => {
  assert(isNaN(tickStep(1, 1, -1)));
  assert(isNaN(tickStep(1, 1, 0)));
  assert(isNaN(tickStep(1, 1, NaN)));
  assert.strictEqual(tickStep(1, 1, 1), 0);
  assert.strictEqual(tickStep(1, 1, 10), 0);
});

it("tickStep(start, stop, count) returns 0 or Infinity if count is not positive", () => {
  assert.strictEqual(tickStep(0, 1, -1), Infinity);
  assert.strictEqual(tickStep(0, 1, 0), Infinity);
});

it("tickStep(start, stop, count) returns 0 if count is infinity", () => {
  assert.strictEqual(tickStep(0, 1, Infinity), 0);
});

it("tickStep(start, stop, count) returns approximately count + 1 tickStep when start < stop", () => {
  assert.strictEqual(tickStep(  0,  1, 10), 0.1);
  assert.strictEqual(tickStep(  0,  1,  9), 0.1);
  assert.strictEqual(tickStep(  0,  1,  8), 0.1);
  assert.strictEqual(tickStep(  0,  1,  7), 0.2);
  assert.strictEqual(tickStep(  0,  1,  6), 0.2);
  assert.strictEqual(tickStep(  0,  1,  5), 0.2);
  assert.strictEqual(tickStep(  0,  1,  4), 0.2);
  assert.strictEqual(tickStep(  0,  1,  3), 0.5);
  assert.strictEqual(tickStep(  0,  1,  2), 0.5);
  assert.strictEqual(tickStep(  0,  1,  1), 1.0);
  assert.strictEqual(tickStep(  0, 10, 10), 1);
  assert.strictEqual(tickStep(  0, 10,  9), 1);
  assert.strictEqual(tickStep(  0, 10,  8), 1);
  assert.strictEqual(tickStep(  0, 10,  7), 2);
  assert.strictEqual(tickStep(  0, 10,  6), 2);
  assert.strictEqual(tickStep(  0, 10,  5), 2);
  assert.strictEqual(tickStep(  0, 10,  4), 2);
  assert.strictEqual(tickStep(  0, 10,  3), 5);
  assert.strictEqual(tickStep(  0, 10,  2), 5);
  assert.strictEqual(tickStep(  0, 10,  1), 10);
  assert.strictEqual(tickStep(-10, 10, 10),  2);
  assert.strictEqual(tickStep(-10, 10,  9),  2);
  assert.strictEqual(tickStep(-10, 10,  8),  2);
  assert.strictEqual(tickStep(-10, 10,  7),  2);
  assert.strictEqual(tickStep(-10, 10,  6),  5);
  assert.strictEqual(tickStep(-10, 10,  5),  5);
  assert.strictEqual(tickStep(-10, 10,  4),  5);
  assert.strictEqual(tickStep(-10, 10,  3),  5);
  assert.strictEqual(tickStep(-10, 10,  2), 10);
  assert.strictEqual(tickStep(-10, 10,  1), 20);
});

it("tickStep(start, stop, count) returns -tickStep(stop, start, count)", () => {
  assert.strictEqual(tickStep(  0,  1, 10), -tickStep( 1,   0, 10));
  assert.strictEqual(tickStep(  0,  1,  9), -tickStep( 1,   0,  9));
  assert.strictEqual(tickStep(  0,  1,  8), -tickStep( 1,   0,  8));
  assert.strictEqual(tickStep(  0,  1,  7), -tickStep( 1,   0,  7));
  assert.strictEqual(tickStep(  0,  1,  6), -tickStep( 1,   0,  6));
  assert.strictEqual(tickStep(  0,  1,  5), -tickStep( 1,   0,  5));
  assert.strictEqual(tickStep(  0,  1,  4), -tickStep( 1,   0,  4));
  assert.strictEqual(tickStep(  0,  1,  3), -tickStep( 1,   0,  3));
  assert.strictEqual(tickStep(  0,  1,  2), -tickStep( 1,   0,  2));
  assert.strictEqual(tickStep(  0,  1,  1), -tickStep( 1,   0,  1));
  assert.strictEqual(tickStep(  0, 10, 10), -tickStep(10,   0, 10));
  assert.strictEqual(tickStep(  0, 10,  9), -tickStep(10,   0,  9));
  assert.strictEqual(tickStep(  0, 10,  8), -tickStep(10,   0,  8));
  assert.strictEqual(tickStep(  0, 10,  7), -tickStep(10,   0,  7));
  assert.strictEqual(tickStep(  0, 10,  6), -tickStep(10,   0,  6));
  assert.strictEqual(tickStep(  0, 10,  5), -tickStep(10,   0,  5));
  assert.strictEqual(tickStep(  0, 10,  4), -tickStep(10,   0,  4));
  assert.strictEqual(tickStep(  0, 10,  3), -tickStep(10,   0,  3));
  assert.strictEqual(tickStep(  0, 10,  2), -tickStep(10,   0,  2));
  assert.strictEqual(tickStep(  0, 10,  1), -tickStep(10,   0,  1));
  assert.strictEqual(tickStep(-10, 10, 10), -tickStep(10, -10, 10));
  assert.strictEqual(tickStep(-10, 10,  9), -tickStep(10, -10,  9));
  assert.strictEqual(tickStep(-10, 10,  8), -tickStep(10, -10,  8));
  assert.strictEqual(tickStep(-10, 10,  7), -tickStep(10, -10,  7));
  assert.strictEqual(tickStep(-10, 10,  6), -tickStep(10, -10,  6));
  assert.strictEqual(tickStep(-10, 10,  5), -tickStep(10, -10,  5));
  assert.strictEqual(tickStep(-10, 10,  4), -tickStep(10, -10,  4));
  assert.strictEqual(tickStep(-10, 10,  3), -tickStep(10, -10,  3));
  assert.strictEqual(tickStep(-10, 10,  2), -tickStep(10, -10,  2));
  assert.strictEqual(tickStep(-10, 10,  1), -tickStep(10, -10,  1));
});
