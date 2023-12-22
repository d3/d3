import assert from "assert";
import {ticks} from "../src/index.js";

it("ticks(start, stop, count) returns the empty array if any argument is NaN", () => {
  assert.deepStrictEqual(ticks(NaN, 1, 1), []);
  assert.deepStrictEqual(ticks(0, NaN, 1), []);
  assert.deepStrictEqual(ticks(0, 1, NaN), []);
  assert.deepStrictEqual(ticks(NaN, NaN, 1), []);
  assert.deepStrictEqual(ticks(0, NaN, NaN), []);
  assert.deepStrictEqual(ticks(NaN, 1, NaN), []);
  assert.deepStrictEqual(ticks(NaN, NaN, NaN), []);
});

it("ticks(start, stop, count) returns the empty array if start === stop and count is non-positive", () => {
  assert.deepStrictEqual(ticks(1, 1, -1), []);
  assert.deepStrictEqual(ticks(1, 1, 0), []);
  assert.deepStrictEqual(ticks(1, 1, NaN), []);
});

it("ticks(start, stop, count) returns the empty array if start === stop and count is positive", () => {
  assert.deepStrictEqual(ticks(1, 1, 1), [1]);
  assert.deepStrictEqual(ticks(1, 1, 10), [1]);
});

it("ticks(start, stop, count) returns the empty array if count is not positive", () => {
  assert.deepStrictEqual(ticks(0, 1, 0), []);
  assert.deepStrictEqual(ticks(0, 1, -1), []);
  assert.deepStrictEqual(ticks(0, 1, NaN), []);
});

it("ticks(start, stop, count) returns the empty array if count is infinity", () => {
  assert.deepStrictEqual(ticks(0, 1, Infinity), []);
});

it("ticks(start, stop, count) does not include negative zero", () => {
  assert.strictEqual(1 / ticks(-1, 0, 5).pop(), Infinity);
});

it("ticks(start, stop, count) remains within the domain", () => {
  assert.deepStrictEqual(ticks(0, 2.2, 3), [0, 1, 2]);
});

it("ticks(start, stop, count) returns approximately count + 1 ticks when start < stop", () => {
  assert.deepStrictEqual(ticks(  0,  1, 10), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  9), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  8), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  7), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  6), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  5), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  4), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  3), [0.0,                     0.5,                     1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  2), [0.0,                     0.5,                     1.0]);
  assert.deepStrictEqual(ticks(  0,  1,  1), [0.0,                                              1.0]);
  assert.deepStrictEqual(ticks(  0, 10, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(ticks(  0, 10,  9), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(ticks(  0, 10,  8), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(ticks(  0, 10,  7), [0,    2,    4,    6,    8,    10]);
  assert.deepStrictEqual(ticks(  0, 10,  6), [0,    2,    4,    6,    8,    10]);
  assert.deepStrictEqual(ticks(  0, 10,  5), [0,    2,    4,    6,    8,    10]);
  assert.deepStrictEqual(ticks(  0, 10,  4), [0,    2,    4,    6,    8,    10]);
  assert.deepStrictEqual(ticks(  0, 10,  3), [0,             5,             10]);
  assert.deepStrictEqual(ticks(  0, 10,  2), [0,             5,             10]);
  assert.deepStrictEqual(ticks(  0, 10,  1), [0,                            10]);
  assert.deepStrictEqual(ticks(-10, 10, 10), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepStrictEqual(ticks(-10, 10,  9), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepStrictEqual(ticks(-10, 10,  8), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepStrictEqual(ticks(-10, 10,  7), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepStrictEqual(ticks(-10, 10,  6), [-10,       -5,       0,      5,     10]);
  assert.deepStrictEqual(ticks(-10, 10,  5), [-10,       -5,       0,      5,     10]);
  assert.deepStrictEqual(ticks(-10, 10,  4), [-10,       -5,       0,      5,     10]);
  assert.deepStrictEqual(ticks(-10, 10,  3), [-10,       -5,       0,      5,     10]);
  assert.deepStrictEqual(ticks(-10, 10,  2), [-10,                 0,             10]);
  assert.deepStrictEqual(ticks(-10, 10,  1), [                     0,               ]);
});

it("ticks(start, stop, count) returns the reverse of ticks(stop, start, count)", () => {
  assert.deepStrictEqual(ticks( 1,   0, 10), ticks(  0,  1, 10).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  9), ticks(  0,  1,  9).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  8), ticks(  0,  1,  8).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  7), ticks(  0,  1,  7).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  6), ticks(  0,  1,  6).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  5), ticks(  0,  1,  5).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  4), ticks(  0,  1,  4).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  3), ticks(  0,  1,  3).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  2), ticks(  0,  1,  2).reverse());
  assert.deepStrictEqual(ticks( 1,   0,  1), ticks(  0,  1,  1).reverse());
  assert.deepStrictEqual(ticks(10,   0, 10), ticks(  0, 10, 10).reverse());
  assert.deepStrictEqual(ticks(10,   0,  9), ticks(  0, 10,  9).reverse());
  assert.deepStrictEqual(ticks(10,   0,  8), ticks(  0, 10,  8).reverse());
  assert.deepStrictEqual(ticks(10,   0,  7), ticks(  0, 10,  7).reverse());
  assert.deepStrictEqual(ticks(10,   0,  6), ticks(  0, 10,  6).reverse());
  assert.deepStrictEqual(ticks(10,   0,  5), ticks(  0, 10,  5).reverse());
  assert.deepStrictEqual(ticks(10,   0,  4), ticks(  0, 10,  4).reverse());
  assert.deepStrictEqual(ticks(10,   0,  3), ticks(  0, 10,  3).reverse());
  assert.deepStrictEqual(ticks(10,   0,  2), ticks(  0, 10,  2).reverse());
  assert.deepStrictEqual(ticks(10,   0,  1), ticks(  0, 10,  1).reverse());
  assert.deepStrictEqual(ticks(10, -10, 10), ticks(-10, 10, 10).reverse());
  assert.deepStrictEqual(ticks(10, -10,  9), ticks(-10, 10,  9).reverse());
  assert.deepStrictEqual(ticks(10, -10,  8), ticks(-10, 10,  8).reverse());
  assert.deepStrictEqual(ticks(10, -10,  7), ticks(-10, 10,  7).reverse());
  assert.deepStrictEqual(ticks(10, -10,  6), ticks(-10, 10,  6).reverse());
  assert.deepStrictEqual(ticks(10, -10,  5), ticks(-10, 10,  5).reverse());
  assert.deepStrictEqual(ticks(10, -10,  4), ticks(-10, 10,  4).reverse());
  assert.deepStrictEqual(ticks(10, -10,  3), ticks(-10, 10,  3).reverse());
  assert.deepStrictEqual(ticks(10, -10,  2), ticks(-10, 10,  2).reverse());
  assert.deepStrictEqual(ticks(10, -10,  1), ticks(-10, 10,  1).reverse());
});

it("ticks(start, stop, count) handles precision problems", () => {
  assert.deepStrictEqual(ticks(0.98, 1.14, 10), [0.98, 1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14]);
});

it("ticks(start, stop, count) tries to return at least one tick if count >= 0.5", () => {
  assert.deepStrictEqual(ticks(1, 364, 0.1), []);
  assert.deepStrictEqual(ticks(1, 364, 0.499), []);
  assert.deepStrictEqual(ticks(1, 364, 0.5), [200]);
  assert.deepStrictEqual(ticks(1, 364, 1), [200]);
  assert.deepStrictEqual(ticks(1, 364, 1.5), [200]);
  assert.deepStrictEqual(ticks(1, 499, 1), [200, 400]);
  assert.deepStrictEqual(ticks(364, 1, 0.5), [200]);
  assert.deepStrictEqual(ticks(0.001, 0.364, 0.5), [0.2]);
  assert.deepStrictEqual(ticks(0.364, 0.001, 0.5), [0.2]);
  assert.deepStrictEqual(ticks(-1, -364, 0.5), [-200]);
  assert.deepStrictEqual(ticks(-364, -1, 0.5), [-200]);
  assert.deepStrictEqual(ticks(-0.001, -0.364, 0.5), [-0.2]);
  assert.deepStrictEqual(ticks(-0.364, -0.001, 0.5), [-0.2]);
});
