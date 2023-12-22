import assert from "assert";
import {utcMonth, utcMonths} from "../src/index.js";
import {utc} from "./date.js";

it("utcMonths in an alias for utcMonth.range", () => {
  assert.strictEqual(utcMonths, utcMonth.range);
});

it("utcMonth.floor(date) returns months", () => {
  assert.deepStrictEqual(utcMonth.floor(utc(2010, 11, 31, 23)), utc(2010, 11,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011,  0,  1,  0)), utc(2011,  0,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011,  0,  1,  1)), utc(2011,  0,  1));
});

it("utcMonth.floor(date) observes daylight saving", () => {
  assert.deepStrictEqual(utcMonth.floor(utc(2011,  2, 13,  7)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011,  2, 13,  8)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011,  2, 13,  9)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011,  2, 13, 10)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011, 10,  6,  7)), utc(2011, 10,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011, 10,  6,  8)), utc(2011, 10,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011, 10,  6,  9)), utc(2011, 10,  1));
  assert.deepStrictEqual(utcMonth.floor(utc(2011, 10,  6, 10)), utc(2011, 10,  1));
});

it("utcMonth.floor(date) handles years in the first century", () => {
  assert.deepStrictEqual(utcMonth.floor(utc(9, 10,  6,  7)), utc(9, 10,  1));
});

it("utcMonth.round(date) returns months", () => {
  assert.deepStrictEqual(utcMonth.round(utc(2010, 11, 16, 12)), utc(2011,  0,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2010, 11, 16, 11)), utc(2010, 11,  1));
});

it("utcMonth.round(date) observes daylight saving", () => {
  assert.deepStrictEqual(utcMonth.round(utc(2011,  2, 13,  7)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011,  2, 13,  8)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011,  2, 13,  9)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011,  2, 13, 20)), utc(2011,  2,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011, 10,  6,  7)), utc(2011, 10,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011, 10,  6,  8)), utc(2011, 10,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011, 10,  6,  9)), utc(2011, 10,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2011, 10,  6, 20)), utc(2011, 10,  1));
});

it("utcMonth.round(date) handles midnight for leap years", () => {
  assert.deepStrictEqual(utcMonth.round(utc(2012,  2,  1,  0)), utc(2012,  2,  1));
  assert.deepStrictEqual(utcMonth.round(utc(2012,  2,  1,  0)), utc(2012,  2,  1));
});

it("utcMonth.ceil(date) returns months", () => {
  assert.deepStrictEqual(utcMonth.ceil(utc(2010, 10, 30, 23)), utc(2010, 11,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2010, 11,  1,  1)), utc(2011,  0,  1));
});

it("utcMonth.ceil(date) observes daylight saving", () => {
  assert.deepStrictEqual(utcMonth.ceil(utc(2011,  2, 13,  7)), utc(2011,  3,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011,  2, 13,  8)), utc(2011,  3,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011,  2, 13,  9)), utc(2011,  3,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011,  2, 13, 10)), utc(2011,  3,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011, 10,  6,  7)), utc(2011, 11,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011, 10,  6,  8)), utc(2011, 11,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011, 10,  6,  9)), utc(2011, 11,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2011, 10,  6, 10)), utc(2011, 11,  1));
});

it("utcMonth.ceil(date) handles midnight for leap years", () => {
  assert.deepStrictEqual(utcMonth.ceil(utc(2012,  2,  1,  0)), utc(2012,  2,  1));
  assert.deepStrictEqual(utcMonth.ceil(utc(2012,  2,  1,  0)), utc(2012,  2,  1));
});

it("utcMonth.offset(date) is an alias for utcMonth.offset(date, 1)", () => {
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011,  0, 31, 23, 59, 59, 999));
});

it("utcMonth.offset(date, step) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  utcMonth.offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("utcMonth.offset(date, step) does not round the passed-in date", () => {
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011,  0, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010,  9, 31, 23, 59, 59, 456));
});

it("utcMonth.offset(date, step) allows step to be negative", () => {
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31), -1), utc(2010, 10, 31));
  assert.deepStrictEqual(utcMonth.offset(utc(2011,  0,  1), -2), utc(2010, 10,  1));
  assert.deepStrictEqual(utcMonth.offset(utc(2011,  0,  1), -1), utc(2010, 11,  1));
});

it("utcMonth.offset(date, step) allows step to be positive", () => {
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31), +1), utc(2011,  0, 31));
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 30), +2), utc(2011,  1, 30));
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 30), +1), utc(2011,  0, 30));
});

it("utcMonth.offset(date, step) allows step to be zero", () => {
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcMonth.offset(utc(2010, 11, 31, 23, 59, 58,   0), 0), utc(2010, 11, 31, 23, 59, 58,   0));
});

it("utcMonth.range(start, stop) returns months between start (inclusive) and stop (exclusive)", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2011, 11,  1), utc(2012,  5,  1)), [
    utc(2011, 11,  1),
    utc(2012,  0,  1),
    utc(2012,  1,  1),
    utc(2012,  2,  1),
    utc(2012,  3,  1),
    utc(2012,  4,  1)
  ]);
});

it("utcMonth.range(start, stop) returns months", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2011, 10,  4,  2), utc(2012,  4, 10, 13)), [
    utc(2011, 11,  1),
    utc(2012,  0,  1),
    utc(2012,  1,  1),
    utc(2012,  2,  1),
    utc(2012,  3,  1),
    utc(2012,  4,  1)
  ]);
});

it("utcMonth.range(start, stop) coerces start and stop to dates", () => {
  assert.deepStrictEqual(utcMonth.range(+utc(2011, 10,  4), +utc(2012,  1,  7)), [
    utc(2011, 11,  1),
    utc(2012,  0,  1),
    utc(2012,  1,  1)
  ]);
});

it("utcMonth.range(start, stop) returns the empty array for invalid dates", () => {
  assert.deepStrictEqual(utcMonth.range(new Date(NaN), Infinity), []);
});

it("utcMonth.range(start, stop) returns the empty array if start >= stop", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2011, 11, 10), utc(2011, 10,  4)), []);
  assert.deepStrictEqual(utcMonth.range(utc(2011, 10,  1), utc(2011, 10,  1)), []);
});

it("utcMonth.range(start, stop) returns months", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2010, 10, 31), utc(2011, 2, 1)), [
    utc(2010, 11, 1),
    utc(2011, 0, 1),
    utc(2011, 1, 1)
  ]);
});

it("utcMonth.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2010, 10, 31), utc(2011, 2, 1))[0], utc(2010, 11, 1));
});

it("utcMonth.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2010, 10, 31), utc(2011, 2, 1))[2], utc(2011, 1, 1));
});

it("utcMonth.range(start, stop) can skip months", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2011, 1, 1), utc(2012, 1, 1), 3), [
    utc(2011, 1, 1),
    utc(2011, 4, 1),
    utc(2011, 7, 1),
    utc(2011, 10, 1)
  ]);
});

it("utcMonth.range(start, stop) observes start of daylight savings time", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2011, 0, 1), utc(2011, 4, 1)), [
    utc(2011, 0, 1),
    utc(2011, 1, 1),
    utc(2011, 2, 1),
    utc(2011, 3, 1)
  ]);
});

it("utcMonth.range(start, stop) observes end of daylight savings time", () => {
  assert.deepStrictEqual(utcMonth.range(utc(2011, 9, 1), utc(2012, 1, 1)), [
    utc(2011, 9, 1),
    utc(2011, 10, 1),
    utc(2011, 11, 1),
    utc(2012, 0, 1)
  ]);
});

it("utcMonth.count(start, end) counts months after start (exclusive) and before end (inclusive)", () => {
  assert.strictEqual(utcMonth.count(utc(2011,  0,  1), utc(2011,  4,  1)), 4);
  assert.strictEqual(utcMonth.count(utc(2011,  0,  1), utc(2011,  3, 30)), 3);
  assert.strictEqual(utcMonth.count(utc(2010, 11, 31), utc(2011,  3, 30)), 4);
  assert.strictEqual(utcMonth.count(utc(2010, 11, 31), utc(2011,  4,  1)), 5);
  assert.strictEqual(utcMonth.count(utc(2009, 11, 31), utc(2012,  4,  1)), 29);
  assert.strictEqual(utcMonth.count(utc(2012,  4,  1), utc(2009, 11, 31)), -29);
});

it("utcMonth.every(step) returns every stepth month, starting with the first month of the year", () => {
  assert.deepStrictEqual(utcMonth.every(3).range(utc(2008, 11, 3), utc(2010, 6, 5)), [utc(2009, 0, 1), utc(2009, 3, 1), utc(2009, 6, 1), utc(2009, 9, 1), utc(2010, 0, 1), utc(2010, 3, 1), utc(2010, 6, 1)]);
});
