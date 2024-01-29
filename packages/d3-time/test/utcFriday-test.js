import assert from "assert";
import {utcFriday, utcFridays} from "../src/index.js";
import {utc} from "./date.js";

it("utcFridays in an alias for utcFriday.range", () => {
  assert.strictEqual(utcFridays, utcFriday.range);
});

it("utcFriday.floor(date) returns Fridays", () => {
  assert.deepStrictEqual(utcFriday.floor(utc(2011,  0,  5, 23, 59, 59)), utc(2010, 11, 31));
  assert.deepStrictEqual(utcFriday.floor(utc(2011,  0,  6,  0,  0,  0)), utc(2010, 11, 31));
  assert.deepStrictEqual(utcFriday.floor(utc(2011,  0,  6,  0,  0,  1)), utc(2010, 11, 31));
  assert.deepStrictEqual(utcFriday.floor(utc(2011,  0,  6, 23, 59, 59)), utc(2010, 11, 31));
  assert.deepStrictEqual(utcFriday.floor(utc(2011,  0,  7,  0,  0,  0)), utc(2011,  0,  7));
  assert.deepStrictEqual(utcFriday.floor(utc(2011,  0,  7,  0,  0,  1)), utc(2011,  0,  7));
});

it("utcFriday.count(start, end) counts Fridays after start (exclusive) and before end (inclusive)", () => {
  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  assert.strictEqual(utcFriday.count(utc(2012,  0,  1), utc(2012,  0,  5)), 0);
  assert.strictEqual(utcFriday.count(utc(2012,  0,  1), utc(2012,  0,  6)), 1);
  assert.strictEqual(utcFriday.count(utc(2012,  0,  1), utc(2012,  0,  7)), 1);
  assert.strictEqual(utcFriday.count(utc(2012,  0,  1), utc(2012,  0, 13)), 2);

  //     January 2010
  // Su Mo Tu We Th Fr Sa
  //                 1  2
  //  3  4  5  6  7  8  9
  // 10 11 12 13 14 15 16
  // 17 18 19 20 21 22 23
  // 24 25 26 27 28 29 30
  // 31
  assert.strictEqual(utcFriday.count(utc(2010,  0,  1), utc(2010,  0,  7)), 0);
  assert.strictEqual(utcFriday.count(utc(2010,  0,  1), utc(2010,  0,  8)), 1);
  assert.strictEqual(utcFriday.count(utc(2010,  0,  1), utc(2010,  0,  9)), 1);
});

it("utcFriday.count(start, end) does not observe daylight saving", () => {
  assert.strictEqual(utcFriday.count(utc(2011,  0,  1), utc(2011,  2, 13,  1)), 10);
  assert.strictEqual(utcFriday.count(utc(2011,  0,  1), utc(2011,  2, 13,  3)), 10);
  assert.strictEqual(utcFriday.count(utc(2011,  0,  1), utc(2011,  2, 13,  4)), 10);
  assert.strictEqual(utcFriday.count(utc(2011,  0,  1), utc(2011, 10,  6,  0)), 44);
  assert.strictEqual(utcFriday.count(utc(2011,  0,  1), utc(2011, 10,  6,  1)), 44);
  assert.strictEqual(utcFriday.count(utc(2011,  0,  1), utc(2011, 10,  6,  2)), 44);
});
