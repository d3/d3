import assert from "assert";
import {utcWednesday, utcWednesdays} from "../src/index.js";
import {utc} from "./date.js";

it("utcWednesdays in an alias for utcWednesday.range", () => {
  assert.strictEqual(utcWednesdays, utcWednesday.range);
});

it("utcWednesday.floor(date) returns Wednesdays", () => {
  assert.deepStrictEqual(utcWednesday.floor(utc(2011,  0,  3, 23, 59, 59)), utc(2010, 11, 29));
  assert.deepStrictEqual(utcWednesday.floor(utc(2011,  0,  4,  0,  0,  0)), utc(2010, 11, 29));
  assert.deepStrictEqual(utcWednesday.floor(utc(2011,  0,  4,  0,  0,  1)), utc(2010, 11, 29));
  assert.deepStrictEqual(utcWednesday.floor(utc(2011,  0,  4, 23, 59, 59)), utc(2010, 11, 29));
  assert.deepStrictEqual(utcWednesday.floor(utc(2011,  0,  5,  0,  0,  0)), utc(2011,  0,  5));
  assert.deepStrictEqual(utcWednesday.floor(utc(2011,  0,  5,  0,  0,  1)), utc(2011,  0,  5));
});

it("utcWednesday.count(start, end) counts Wednesdays after start (exclusive) and before end (inclusive)", () => {
  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  assert.strictEqual(utcWednesday.count(utc(2012,  0,  1), utc(2012,  0,  3)), 0);
  assert.strictEqual(utcWednesday.count(utc(2012,  0,  1), utc(2012,  0,  4)), 1);
  assert.strictEqual(utcWednesday.count(utc(2012,  0,  1), utc(2012,  0,  5)), 1);
  assert.strictEqual(utcWednesday.count(utc(2012,  0,  1), utc(2012,  0, 11)), 2);

  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(utcWednesday.count(utc(2014,  0,  1), utc(2014,  0,  7)), 0);
  assert.strictEqual(utcWednesday.count(utc(2014,  0,  1), utc(2014,  0,  8)), 1);
  assert.strictEqual(utcWednesday.count(utc(2014,  0,  1), utc(2014,  0,  9)), 1);
});

it("utcWednesday.count(start, end) does not observe daylight saving", () => {
  assert.strictEqual(utcWednesday.count(utc(2011,  0,  1), utc(2011,  2, 13,  1)), 10);
  assert.strictEqual(utcWednesday.count(utc(2011,  0,  1), utc(2011,  2, 13,  3)), 10);
  assert.strictEqual(utcWednesday.count(utc(2011,  0,  1), utc(2011,  2, 13,  4)), 10);
  assert.strictEqual(utcWednesday.count(utc(2011,  0,  1), utc(2011, 10,  6,  0)), 44);
  assert.strictEqual(utcWednesday.count(utc(2011,  0,  1), utc(2011, 10,  6,  1)), 44);
  assert.strictEqual(utcWednesday.count(utc(2011,  0,  1), utc(2011, 10,  6,  2)), 44);
});
