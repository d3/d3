import assert from "assert";
import {utcSunday, utcSundays} from "../src/index.js";
import {utc} from "./date.js";

it("utcSundays in an alias for utcSunday.range", () => {
  assert.strictEqual(utcSundays, utcSunday.range);
});

it("utcSunday.floor(date) returns Sundays", () => {
  assert.deepStrictEqual(utcSunday.floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 26));
  assert.deepStrictEqual(utcSunday.floor(utc(2011,  0,  1,  0,  0,  0)), utc(2010, 11, 26));
  assert.deepStrictEqual(utcSunday.floor(utc(2011,  0,  1,  0,  0,  1)), utc(2010, 11, 26));
  assert.deepStrictEqual(utcSunday.floor(utc(2011,  0,  1, 23, 59, 59)), utc(2010, 11, 26));
  assert.deepStrictEqual(utcSunday.floor(utc(2011,  0,  2,  0,  0,  0)), utc(2011,  0,  2));
  assert.deepStrictEqual(utcSunday.floor(utc(2011,  0,  2,  0,  0,  1)), utc(2011,  0,  2));
});

it("utcSunday.floor(date) observes daylight saving", () => {
  assert.deepStrictEqual(utcSunday.floor(utc(2011,  2, 13,  1)), utc(2011,  2, 13));
  assert.deepStrictEqual(utcSunday.floor(utc(2011, 10,  6,  1)), utc(2011, 10,  6));
});

it("utcSunday.floor(date) handles years in the first century", () => {
  assert.deepStrictEqual(utcSunday.floor(utc(9, 10,  6,  7)), utc(9, 10,  1));
});

it("utcSunday.ceil(date) returns Sundays", () => {
  assert.deepStrictEqual(utcSunday.ceil(utc(2010, 11, 31, 23, 59, 59)), utc(2011,  0,  2));
  assert.deepStrictEqual(utcSunday.ceil(utc(2011,  0,  1,  0,  0,  0)), utc(2011,  0,  2));
  assert.deepStrictEqual(utcSunday.ceil(utc(2011,  0,  1,  0,  0,  1)), utc(2011,  0,  2));
  assert.deepStrictEqual(utcSunday.ceil(utc(2011,  0,  1, 23, 59, 59)), utc(2011,  0,  2));
  assert.deepStrictEqual(utcSunday.ceil(utc(2011,  0,  2,  0,  0,  0)), utc(2011,  0,  2));
  assert.deepStrictEqual(utcSunday.ceil(utc(2011,  0,  2,  0,  0,  1)), utc(2011,  0,  9));
});

it("utcSunday.ceil(date) observes daylight saving", () => {
  assert.deepStrictEqual(utcSunday.ceil(utc(2011,  2, 13,  1)), utc(2011,  2, 20));
  assert.deepStrictEqual(utcSunday.ceil(utc(2011, 10,  6,  1)), utc(2011, 10, 13));
});

it("utcSunday.offset(date) is an alias for utcSunday.offset(date, 1)", () => {
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011,  0,  7, 23, 59, 59, 999));
});

it("utcSunday.offset(date, step) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  utcSunday.offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("utcSunday.offset(date, step) does not round the passed-in date", () => {
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011,  0,  7, 23, 59, 59, 999));
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 17, 23, 59, 59, 456));
});

it("utcSunday.offset(date, step) allows step to be negative", () => {
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11,  1), -1), utc(2010, 10, 24));
  assert.deepStrictEqual(utcSunday.offset(utc(2011,  0,  1), -2), utc(2010, 11, 18));
  assert.deepStrictEqual(utcSunday.offset(utc(2011,  0,  1), -1), utc(2010, 11, 25));
});

it("utcSunday.offset(date, step) allows step to be positive", () => {
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 10, 24), +1), utc(2010, 11,  1));
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 18), +2), utc(2011,  0,  1));
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 25), +1), utc(2011,  0,  1));
});

it("utcSunday.offset(date, step) allows step to be zero", () => {
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcSunday.offset(utc(2010, 11, 31, 23, 59, 58,   0), 0), utc(2010, 11, 31, 23, 59, 58,   0));
});

it("utcSunday.range(start, stop) returns Sundays between start (inclusive) and stop (exclusive)", () => {
  assert.deepStrictEqual(utcSunday.range(utc(2011, 11,  1), utc(2012,  0, 15)), [
    utc(2011, 11,  4),
    utc(2011, 11, 11),
    utc(2011, 11, 18),
    utc(2011, 11, 25),
    utc(2012,  0,  1),
    utc(2012,  0,  8)
  ]);
});

it("utcSunday.range(start, stop) returns Sundays", () => {
  assert.deepStrictEqual(utcSunday.range(utc(2011, 11,  1, 12, 23), utc(2012,  0, 14, 12, 23)), [
    utc(2011, 11,  4),
    utc(2011, 11, 11),
    utc(2011, 11, 18),
    utc(2011, 11, 25),
    utc(2012,  0,  1),
    utc(2012,  0,  8)
  ]);
});

it("utcSunday.range(start, stop) coerces start and stop to dates", () => {
  assert.deepStrictEqual(utcSunday.range(+utc(2011, 11,  1), +utc(2012,  0, 15)), [
    utc(2011, 11,  4),
    utc(2011, 11, 11),
    utc(2011, 11, 18),
    utc(2011, 11, 25),
    utc(2012,  0,  1),
    utc(2012,  0,  8)
  ]);
});

it("utcSunday.range(start, stop) returns the empty array for invalid dates", () => {
  assert.deepStrictEqual(utcSunday.range(new Date(NaN), Infinity), []);
});

it("utcSunday.range(start, stop) returns the empty array if start >= stop", () => {
  assert.deepStrictEqual(utcSunday.range(utc(2011, 11, 10), utc(2011, 10,  4)), []);
  assert.deepStrictEqual(utcSunday.range(utc(2011, 10,  1), utc(2011, 10,  1)), []);
});

it("utcSunday.range(start, stop, step) returns every step Sunday", () => {
  assert.deepStrictEqual(utcSunday.range(utc(2011, 11,  1), utc(2012,  0, 15), 2), [
    utc(2011, 11,  4),
    utc(2011, 11, 18),
    utc(2012,  0,  1)
  ]);
});

it("utcSunday.count(start, end) counts Sundays after start (exclusive) and before end (inclusive)", () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(utcSunday.count(utc(2014,  0,  1), utc(2014,  0,  4)), 0);
  assert.strictEqual(utcSunday.count(utc(2014,  0,  1), utc(2014,  0,  5)), 1);
  assert.strictEqual(utcSunday.count(utc(2014,  0,  1), utc(2014,  0,  6)), 1);
  assert.strictEqual(utcSunday.count(utc(2014,  0,  1), utc(2014,  0, 12)), 2);

  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  assert.strictEqual(utcSunday.count(utc(2012,  0,  1), utc(2012,  0,  7)), 0);
  assert.strictEqual(utcSunday.count(utc(2012,  0,  1), utc(2012,  0,  8)), 1);
  assert.strictEqual(utcSunday.count(utc(2012,  0,  1), utc(2012,  0,  9)), 1);
});

it("utcSunday.count(start, end) does not observe daylight saving", () => {
  assert.strictEqual(utcSunday.count(utc(2011,  0,  1), utc(2011,  2, 13,  1)), 11);
  assert.strictEqual(utcSunday.count(utc(2011,  0,  1), utc(2011,  2, 13,  3)), 11);
  assert.strictEqual(utcSunday.count(utc(2011,  0,  1), utc(2011,  2, 13,  4)), 11);
  assert.strictEqual(utcSunday.count(utc(2011,  0,  1), utc(2011, 10,  6,  0)), 45);
  assert.strictEqual(utcSunday.count(utc(2011,  0,  1), utc(2011, 10,  6,  1)), 45);
  assert.strictEqual(utcSunday.count(utc(2011,  0,  1), utc(2011, 10,  6,  2)), 45);
});
