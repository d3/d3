import assert from "assert";
import {timeDay, timeDays, timeYear} from "../src/index.js";
import {local, utc} from "./date.js";

it("timeDays in an alias for timeDay.range", () => {
  assert.strictEqual(timeDays, timeDay.range);
});

it("timeDay() is equivalent to timeDay.floor(new Date)", () => {
  const t = new Date;
  assert.deepStrictEqual(timeDay(), timeDay.floor(t));
});

it("timeDay(date) is equivalent to timeDay.floor(date)", () => {
  const t = new Date;
  assert.deepStrictEqual(timeDay(t), timeDay.floor(t));
});

it("timeDay.floor(date) returns days", () => {
  assert.deepStrictEqual(timeDay.floor(local(2010, 11, 31, 23)), local(2010, 11, 31));
  assert.deepStrictEqual(timeDay.floor(local(2011,  0,  1,  0)), local(2011,  0,  1));
  assert.deepStrictEqual(timeDay.floor(local(2011,  0,  1,  1)), local(2011,  0,  1));
});

it("timeDay.floor(date) observes daylight saving", () => {
  assert.deepStrictEqual(timeDay.floor(utc(2011,  2, 13,  7)), local(2011,  2, 12));
  assert.deepStrictEqual(timeDay.floor(utc(2011,  2, 13,  8)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.floor(utc(2011,  2, 13,  9)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.floor(utc(2011,  2, 13, 10)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.floor(utc(2011, 10,  6,  7)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.floor(utc(2011, 10,  6,  8)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.floor(utc(2011, 10,  6,  9)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.floor(utc(2011, 10,  6, 10)), local(2011, 10,  6));
});

it("timeDay.floor(date) handles years in the first century", () => {
  assert.deepStrictEqual(timeDay.floor(local(9, 10,  6,  7)), local(9, 10,  6));
});

it("timeDay.round(date) returns days", () => {
  assert.deepStrictEqual(timeDay.round(local(2010, 11, 30, 13)), local(2010, 11, 31));
  assert.deepStrictEqual(timeDay.round(local(2010, 11, 30, 11)), local(2010, 11, 30));
});

it("timeDay.round(date) observes daylight saving", () => {
  assert.deepStrictEqual(timeDay.round(utc(2011,  2, 13,  7)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.round(utc(2011,  2, 13,  8)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.round(utc(2011,  2, 13,  9)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.round(utc(2011,  2, 13, 20)), local(2011,  2, 14));
  assert.deepStrictEqual(timeDay.round(utc(2011, 10,  6,  7)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.round(utc(2011, 10,  6,  8)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.round(utc(2011, 10,  6,  9)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.round(utc(2011, 10,  6, 20)), local(2011, 10,  7));
});

it("timeDay.round(date) handles midnight in leap years", () => {
  assert.deepStrictEqual(timeDay.round(utc(2012,  2,  1,  0)), local(2012,  2,  1));
  assert.deepStrictEqual(timeDay.round(utc(2012,  2,  1,  0)), local(2012,  2,  1));
});

it("timeDay.ceil(date) returns days", () => {
  assert.deepStrictEqual(timeDay.ceil(local(2010, 11, 30, 23)), local(2010, 11, 31));
  assert.deepStrictEqual(timeDay.ceil(local(2010, 11, 31,  0)), local(2010, 11, 31));
  assert.deepStrictEqual(timeDay.ceil(local(2010, 11, 31,  1)), local(2011,  0,  1));
});

it("timeDay.ceil(date) observes start of daylight saving", () => {
  assert.deepStrictEqual(timeDay.ceil(utc(2011,  2, 13,  7)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.ceil(utc(2011,  2, 13,  8)), local(2011,  2, 13));
  assert.deepStrictEqual(timeDay.ceil(utc(2011,  2, 13,  9)), local(2011,  2, 14));
  assert.deepStrictEqual(timeDay.ceil(utc(2011,  2, 13, 10)), local(2011,  2, 14));
});

it("timeDay.ceil(date) observes end of daylight saving", () => {
  assert.deepStrictEqual(timeDay.ceil(utc(2011, 10,  6,  7)), local(2011, 10,  6));
  assert.deepStrictEqual(timeDay.ceil(utc(2011, 10,  6,  8)), local(2011, 10,  7));
  assert.deepStrictEqual(timeDay.ceil(utc(2011, 10,  6,  9)), local(2011, 10,  7));
  assert.deepStrictEqual(timeDay.ceil(utc(2011, 10,  6, 10)), local(2011, 10,  7));
});

it("timeDay.ceil(date) handles midnight for leap years", () => {
  assert.deepStrictEqual(timeDay.ceil(utc(2012,  2,  1,  0)), local(2012,  2,  1));
  assert.deepStrictEqual(timeDay.ceil(utc(2012,  2,  1,  0)), local(2012,  2,  1));
});

it("timeDay.offset(date) is an alias for timeDay.offset(date, 1)", () => {
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31, 23, 59, 59, 999)), local(2011,  0,  1, 23, 59, 59, 999));
});

it("timeDay.offset(date, step) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeDay.offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeDay.offset(date, step) does not round the passed-in date", () => {
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011,  0,  1, 23, 59, 59, 999));
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 29, 23, 59, 59, 456));
});

it("timeDay.offset(date, step) allows step to be negative", () => {
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31), -1), local(2010, 11, 30));
  assert.deepStrictEqual(timeDay.offset(local(2011,  0,  1), -2), local(2010, 11, 30));
  assert.deepStrictEqual(timeDay.offset(local(2011,  0,  1), -1), local(2010, 11, 31));
});

it("timeDay.offset(date, step) allows step to be positive", () => {
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31), +1), local(2011,  0,  1));
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 30), +2), local(2011,  0,  1));
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 30), +1), local(2010, 11, 31));
});

it("timeDay.offset(date, step) allows step to be zero", () => {
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeDay.offset(local(2010, 11, 31, 23, 59, 58,   0), 0), local(2010, 11, 31, 23, 59, 58,   0));
});

it("timeDay.range(start, stop) returns days between start (inclusive) and stop (exclusive)", () => {
  assert.deepStrictEqual(timeDay.range(local(2011, 10,  4), local(2011, 10, 10)), [
    local(2011, 10,  4),
    local(2011, 10,  5),
    local(2011, 10,  6),
    local(2011, 10,  7),
    local(2011, 10,  8),
    local(2011, 10,  9)
  ]);
});

it("timeDay.range(start, stop) returns days", () => {
  assert.deepStrictEqual(timeDay.range(local(2011, 10,  4,  2), local(2011, 10, 10, 13)), [
    local(2011, 10,  5),
    local(2011, 10,  6),
    local(2011, 10,  7),
    local(2011, 10,  8),
    local(2011, 10,  9),
    local(2011, 10, 10)
  ]);
});

it("timeDay.range(start, stop) coerces start and stop to dates", () => {
  assert.deepStrictEqual(timeDay.range(+local(2011, 10,  4), +local(2011, 10,  7)), [
    local(2011, 10,  4),
    local(2011, 10,  5),
    local(2011, 10,  6)
  ]);
});

it("timeDay.range(start, stop) returns the empty array for invalid dates", () => {
  assert.deepStrictEqual(timeDay.range(new Date(NaN), Infinity), []);
});

it("timeDay.range(start, stop) returns the empty array if start >= stop", () => {
  assert.deepStrictEqual(timeDay.range(local(2011, 10, 10), local(2011, 10,  4)), []);
  assert.deepStrictEqual(timeDay.range(local(2011, 10, 10), local(2011, 10, 10)), []);
});

it("timeDay.range(start, stop, step) returns every step day", () => {
  assert.deepStrictEqual(timeDay.range(local(2011, 10,  4,  2), local(2011, 10, 14, 13), 3), [
    local(2011, 10,  5),
    local(2011, 10,  8),
    local(2011, 10, 11),
    local(2011, 10, 14)
  ]);
});

it("timeDay.range(start, stop, step) returns the empty array if step is zero, negative or NaN", () => {
  assert.deepStrictEqual(timeDay.range(local(2011,  0,  1,  0), local(2011,  4,  9,  0), 0), []);
  assert.deepStrictEqual(timeDay.range(local(2011,  0,  1,  0), local(2011,  4,  9,  0), -1), []);
  assert.deepStrictEqual(timeDay.range(local(2011,  0,  1,  0), local(2011,  4,  9,  0), 0.5), []);
  assert.deepStrictEqual(timeDay.range(local(2011,  0,  1,  0), local(2011,  4,  9,  0), NaN), []);
});

it("timeDay.count(start, end) counts days after start (exclusive) and before end (inclusive)", () => {
  assert.strictEqual(timeDay.count(local(2011,  0,  1,  0), local(2011,  4,  9,  0)), 128);
  assert.strictEqual(timeDay.count(local(2011,  0,  1,  1), local(2011,  4,  9,  0)), 128);
  assert.strictEqual(timeDay.count(local(2010, 11, 31, 23), local(2011,  4,  9,  0)), 129);
  assert.strictEqual(timeDay.count(local(2011,  0,  1,  0), local(2011,  4,  8, 23)), 127);
  assert.strictEqual(timeDay.count(local(2011,  0,  1,  0), local(2011,  4,  9,  1)), 128);
});

it("timeDay.count(start, end) observes daylight saving", () => {
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011,  2, 13,  1)), 71);
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011,  2, 13,  3)), 71);
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011,  2, 13,  4)), 71);
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011, 10,  6,  0)), 309);
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011, 10,  6,  1)), 309);
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011, 10,  6,  2)), 309);
});

it("timeDay.count(start, stop) does not exhibit floating-point rounding error", () => {
  const date = new Date(2011, 4, 9);
  assert.strictEqual(timeDay.count(timeYear(date), date), 128);
});

it("timeDay.count(start, end) returns 364 or 365 for a full year", () => {
  assert.strictEqual(timeDay.count(local(1999,  0,  1), local(1999, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2000,  0,  1), local(2000, 11, 31)), 365); // leap year
  assert.strictEqual(timeDay.count(local(2001,  0,  1), local(2001, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2002,  0,  1), local(2002, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2003,  0,  1), local(2003, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2004,  0,  1), local(2004, 11, 31)), 365); // leap year
  assert.strictEqual(timeDay.count(local(2005,  0,  1), local(2005, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2006,  0,  1), local(2006, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2007,  0,  1), local(2007, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2008,  0,  1), local(2008, 11, 31)), 365); // leap year
  assert.strictEqual(timeDay.count(local(2009,  0,  1), local(2009, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2010,  0,  1), local(2010, 11, 31)), 364);
  assert.strictEqual(timeDay.count(local(2011,  0,  1), local(2011, 11, 31)), 364);
});

it("timeDay.every(step) returns every stepth day, starting with the first day of the month", () => {
  assert.deepStrictEqual(timeDay.every(3).range(local(2008, 11, 30, 0, 12), local(2009, 0, 5, 23, 48)), [local(2008, 11, 31), local(2009, 0, 1), local(2009, 0, 4)]);
  assert.deepStrictEqual(timeDay.every(5).range(local(2008, 11, 30, 0, 12), local(2009, 0, 6, 23, 48)), [local(2008, 11, 31), local(2009, 0, 1), local(2009, 0, 6)]);
  assert.deepStrictEqual(timeDay.every(7).range(local(2008, 11, 30, 0, 12), local(2009, 0, 8, 23, 48)), [local(2009, 0, 1), local(2009, 0, 8)]);
});
