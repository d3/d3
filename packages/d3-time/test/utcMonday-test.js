import assert from "assert";
import {utcMonday, utcMondays} from "../src/index.js";
import {utc} from "./date.js";

it("utcMondays in an alias for utcMonday.range", () => {
  assert.strictEqual(utcMondays, utcMonday.range);
});

it("utcMonday.floor(date) returns Mondays", () => {
  assert.deepStrictEqual(utcMonday.floor(utc(2011,  0,  1, 23, 59, 59)), utc(2010, 11, 27));
  assert.deepStrictEqual(utcMonday.floor(utc(2011,  0,  2,  0,  0,  0)), utc(2010, 11, 27));
  assert.deepStrictEqual(utcMonday.floor(utc(2011,  0,  2,  0,  0,  1)), utc(2010, 11, 27));
  assert.deepStrictEqual(utcMonday.floor(utc(2011,  0,  2, 23, 59, 59)), utc(2010, 11, 27));
  assert.deepStrictEqual(utcMonday.floor(utc(2011,  0,  3,  0,  0,  0)), utc(2011,  0,  3));
  assert.deepStrictEqual(utcMonday.floor(utc(2011,  0,  3,  0,  0,  1)), utc(2011,  0,  3));
});

it("utcMonday.range(start, stop, step) returns every step Monday", () => {
  assert.deepStrictEqual(utcMonday.range(utc(2011, 11,  1), utc(2012,  0, 15), 2), [
    utc(2011, 11,  5),
    utc(2011, 11, 19),
    utc(2012,  0,  2)
  ]);
});

it("utcMonday.count(start, end) counts Mondays after start (exclusive) and before end (inclusive)", () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(utcMonday.count(utc(2014,  0,  1), utc(2014,  0,  5)), 0);
  assert.strictEqual(utcMonday.count(utc(2014,  0,  1), utc(2014,  0,  6)), 1);
  assert.strictEqual(utcMonday.count(utc(2014,  0,  1), utc(2014,  0,  7)), 1);
  assert.strictEqual(utcMonday.count(utc(2014,  0,  1), utc(2014,  0, 13)), 2);

  //     January 2018
  // Su Mo Tu We Th Fr Sa
  //     1  2  3  4  5  6
  //  7  8  9 10 11 12 13
  // 14 15 16 17 18 19 20
  // 21 22 23 24 25 26 27
  // 28 29 30 31
  assert.strictEqual(utcMonday.count(utc(2018,  0,  1), utc(2018,  0,  7)), 0);
  assert.strictEqual(utcMonday.count(utc(2018,  0,  1), utc(2018,  0,  8)), 1);
  assert.strictEqual(utcMonday.count(utc(2018,  0,  1), utc(2018,  0,  9)), 1);
});

it("utcMonday.count(start, end) does not observe daylight saving", () => {
  assert.strictEqual(utcMonday.count(utc(2011,  0,  1), utc(2011,  2, 13,  1)), 10);
  assert.strictEqual(utcMonday.count(utc(2011,  0,  1), utc(2011,  2, 13,  3)), 10);
  assert.strictEqual(utcMonday.count(utc(2011,  0,  1), utc(2011,  2, 13,  4)), 10);
  assert.strictEqual(utcMonday.count(utc(2011,  0,  1), utc(2011, 10,  6,  0)), 44);
  assert.strictEqual(utcMonday.count(utc(2011,  0,  1), utc(2011, 10,  6,  1)), 44);
  assert.strictEqual(utcMonday.count(utc(2011,  0,  1), utc(2011, 10,  6,  2)), 44);
});
