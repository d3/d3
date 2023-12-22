import assert from "assert";
import {unixDay, unixDays} from "../src/index.js";
import {utc} from "./date.js";

it("unixDays in an alias for unixDay.range", () => {
  assert.strictEqual(unixDays, unixDay.range);
});

it("unixDay.floor(date) returns days", () => {
  assert.deepStrictEqual(unixDay.floor(utc(2010, 11, 31, 23)), utc(2010, 11, 31));
  assert.deepStrictEqual(unixDay.floor(utc(2011,  0,  1,  0)), utc(2011,  0,  1));
  assert.deepStrictEqual(unixDay.floor(utc(2011,  0,  1,  1)), utc(2011,  0,  1));
});

it("unixDay.floor(date) does not observe daylight saving", () => {
  assert.deepStrictEqual(unixDay.floor(utc(2011,  2, 13,  7)), utc(2011,  2, 13));
  assert.deepStrictEqual(unixDay.floor(utc(2011,  2, 13,  8)), utc(2011,  2, 13));
  assert.deepStrictEqual(unixDay.floor(utc(2011,  2, 13,  9)), utc(2011,  2, 13));
  assert.deepStrictEqual(unixDay.floor(utc(2011,  2, 13, 10)), utc(2011,  2, 13));
  assert.deepStrictEqual(unixDay.floor(utc(2011, 10,  6,  5)), utc(2011, 10,  6));
  assert.deepStrictEqual(unixDay.floor(utc(2011, 10,  6,  6)), utc(2011, 10,  6));
  assert.deepStrictEqual(unixDay.floor(utc(2011, 10,  6,  7)), utc(2011, 10,  6));
  assert.deepStrictEqual(unixDay.floor(utc(2011, 10,  6,  8)), utc(2011, 10,  6));
});

it("unixDay.round(date) returns days", () => {
  assert.deepStrictEqual(unixDay.round(utc(2010, 11, 30, 13)), utc(2010, 11, 31));
  assert.deepStrictEqual(unixDay.round(utc(2010, 11, 30, 11)), utc(2010, 11, 30));
});

it("unixDay.ceil(date) returns days", () => {
  assert.deepStrictEqual(unixDay.ceil(utc(2010, 11, 30, 23)), utc(2010, 11, 31));
  assert.deepStrictEqual(unixDay.ceil(utc(2010, 11, 31,  0)), utc(2010, 11, 31));
  assert.deepStrictEqual(unixDay.ceil(utc(2010, 11, 31,  1)), utc(2011,  0,  1));
});

it("unixDay.ceil(date) does not observe daylight saving", () => {
  assert.deepStrictEqual(unixDay.ceil(utc(2011,  2, 13,  7)), utc(2011,  2, 14));
  assert.deepStrictEqual(unixDay.ceil(utc(2011,  2, 13,  8)), utc(2011,  2, 14));
  assert.deepStrictEqual(unixDay.ceil(utc(2011,  2, 13,  9)), utc(2011,  2, 14));
  assert.deepStrictEqual(unixDay.ceil(utc(2011,  2, 13, 10)), utc(2011,  2, 14));
  assert.deepStrictEqual(unixDay.ceil(utc(2011, 10,  6,  5)), utc(2011, 10,  7));
  assert.deepStrictEqual(unixDay.ceil(utc(2011, 10,  6,  6)), utc(2011, 10,  7));
  assert.deepStrictEqual(unixDay.ceil(utc(2011, 10,  6,  7)), utc(2011, 10,  7));
  assert.deepStrictEqual(unixDay.ceil(utc(2011, 10,  6,  8)), utc(2011, 10,  7));
});

it("unixDay.offset(date) is an alias for unixDay.offset(date, 1)", () => {
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011,  0,  1, 23, 59, 59, 999));
});

it("unixDay.offset(date, step) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  unixDay.offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("unixDay.offset(date, step) does not round the passed-in date", () => {
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011,  0,  1, 23, 59, 59, 999));
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 29, 23, 59, 59, 456));
});

it("unixDay.offset(date, step) allows step to be negative", () => {
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31), -1), utc(2010, 11, 30));
  assert.deepStrictEqual(unixDay.offset(utc(2011,  0,  1), -2), utc(2010, 11, 30));
  assert.deepStrictEqual(unixDay.offset(utc(2011,  0,  1), -1), utc(2010, 11, 31));
});

it("unixDay.offset(date, step) allows step to be positive", () => {
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31), +1), utc(2011,  0,  1));
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 30), +2), utc(2011,  0,  1));
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 30), +1), utc(2010, 11, 31));
});

it("unixDay.offset(date, step) allows step to be zero", () => {
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(unixDay.offset(utc(2010, 11, 31, 23, 59, 58,   0), 0), utc(2010, 11, 31, 23, 59, 58,   0));
});

it("unixDay.count(start, end) counts days after start (exclusive) and before end (inclusive)", () => {
  assert.strictEqual(unixDay.count(utc(2011,  0,  1,  0), utc(2011,  4,  9,  0)), 128);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1,  1), utc(2011,  4,  9,  0)), 128);
  assert.strictEqual(unixDay.count(utc(2010, 11, 31, 23), utc(2011,  4,  9,  0)), 129);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1,  0), utc(2011,  4,  8, 23)), 127);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1,  0), utc(2011,  4,  9,  1)), 128);
});

it("unixDay.count(start, end) does not observe daylight saving", () => {
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011,  2, 13,  1)), 71);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011,  2, 13,  3)), 71);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011,  2, 13,  4)), 71);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011, 10,  6,  0)), 309);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011, 10,  6,  1)), 309);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011, 10,  6,  2)), 309);
});

it("unixDay.count(start, end) returns 364 or 365 for a full year", () => {
  assert.strictEqual(unixDay.count(utc(1999,  0,  1), utc(1999, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2000,  0,  1), utc(2000, 11, 31)), 365); // leap year
  assert.strictEqual(unixDay.count(utc(2001,  0,  1), utc(2001, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2002,  0,  1), utc(2002, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2003,  0,  1), utc(2003, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2004,  0,  1), utc(2004, 11, 31)), 365); // leap year
  assert.strictEqual(unixDay.count(utc(2005,  0,  1), utc(2005, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2006,  0,  1), utc(2006, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2007,  0,  1), utc(2007, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2008,  0,  1), utc(2008, 11, 31)), 365); // leap year
  assert.strictEqual(unixDay.count(utc(2009,  0,  1), utc(2009, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2010,  0,  1), utc(2010, 11, 31)), 364);
  assert.strictEqual(unixDay.count(utc(2011,  0,  1), utc(2011, 11, 31)), 364);
});

it("unixDay.every(step) returns every stepth day", () => {
  assert.deepStrictEqual(unixDay.every(3).range(utc(2008, 11, 30, 0, 12), utc(2009, 0, 5, 23, 48)), [utc(2008, 11, 31), utc(2009, 0, 3)]);
  assert.deepStrictEqual(unixDay.every(5).range(utc(2008, 11, 30, 0, 12), utc(2009, 0, 6, 23, 48)), [utc(2009, 0, 1), utc(2009, 0, 6)]);
  assert.deepStrictEqual(unixDay.every(7).range(utc(2008, 11, 30, 0, 12), utc(2009, 0, 8, 23, 48)), [utc(2009, 0, 1), utc(2009, 0, 8)]);
});
