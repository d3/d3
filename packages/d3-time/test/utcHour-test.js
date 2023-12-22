import assert from "assert";
import {utcHour} from "../src/index.js";
import {utc} from "./date.js";

it("utcHour.floor(date) returns hours", () => {
  assert.deepStrictEqual(utcHour.floor(utc(2010, 11, 31, 23, 59)), utc(2010, 11, 31, 23));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  0,  1,  0,  0)), utc(2011,  0,  1,  0));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  0,  1,  0,  1)), utc(2011,  0,  1,  0));
});

it("utcHour.floor(date) observes start of daylight savings time", () => {
  assert.deepStrictEqual(utcHour.floor(utc(2011,  2, 13,  8, 59)), utc(2011,  2, 13,  8));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  2, 13,  9,  0)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  2, 13,  9,  1)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  2, 13,  9, 59)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  2, 13, 10,  0)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(utcHour.floor(utc(2011,  2, 13, 10,  1)), utc(2011,  2, 13, 10));
});

it("utcHour.floor(date) observes end of daylight savings time", () => {
  assert.deepStrictEqual(utcHour.floor(utc(2011, 10,  6,  7, 59)), utc(2011, 10,  6,  7));
  assert.deepStrictEqual(utcHour.floor(utc(2011, 10,  6,  8,  0)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(utcHour.floor(utc(2011, 10,  6,  8,  1)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(utcHour.floor(utc(2011, 10,  6,  8, 59)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(utcHour.floor(utc(2011, 10,  6,  9,  0)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(utcHour.floor(utc(2011, 10,  6,  9,  1)), utc(2011, 10,  6,  9));
});


it("utcHour.ceil(date) returns hours", () => {
  assert.deepStrictEqual(utcHour.ceil(utc(2010, 11, 31, 23, 59)), utc(2011,  0,  1,  0));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  0,  1,  0,  0)), utc(2011,  0,  1,  0));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  0,  1,  0,  1)), utc(2011,  0,  1,  1));
});

it("utcHour.ceil(date) observes start of daylight savings time", () => {
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  2, 13,  8, 59)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  2, 13,  9,  0)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  2, 13,  9,  1)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  2, 13,  9, 59)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  2, 13, 10,  0)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(utcHour.ceil(utc(2011,  2, 13, 10,  1)), utc(2011,  2, 13, 11));
});

it("utcHour.ceil(date) observes end of daylight savings time", () => {
  assert.deepStrictEqual(utcHour.ceil(utc(2011, 10,  6,  7, 59)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(utcHour.ceil(utc(2011, 10,  6,  8,  0)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(utcHour.ceil(utc(2011, 10,  6,  8,  1)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(utcHour.ceil(utc(2011, 10,  6,  8, 59)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(utcHour.ceil(utc(2011, 10,  6,  9,  0)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(utcHour.ceil(utc(2011, 10,  6,  9,  1)), utc(2011, 10,  6, 10));
});

it("utcHour.offset(date) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  utcHour.offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("utcHour.offset(date) does not round the passed-in-date", () => {
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011,  0,  1,  0, 59, 59, 999));
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 31, 21, 59, 59, 456));
});

it("utcHour.offset(date) allows negative offsets", () => {
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 12), -1), utc(2010, 11, 31, 11));
  assert.deepStrictEqual(utcHour.offset(utc(2011,  0,  1,  1), -2), utc(2010, 11, 31, 23));
  assert.deepStrictEqual(utcHour.offset(utc(2011,  0,  1,  0), -1), utc(2010, 11, 31, 23));
});

it("utcHour.offset(date) allows positive offsets", () => {
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 11), +1), utc(2010, 11, 31, 12));
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 23), +2), utc(2011,  0,  1,  1));
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 23), +1), utc(2011,  0,  1,  0));
});

it("utcHour.offset(date) allows zero offset", () => {
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcHour.offset(utc(2010, 11, 31, 23, 59, 58,   0), 0), utc(2010, 11, 31, 23, 59, 58,   0));
});

it("utcHour.range(start, stop) returns hours", () => {
  assert.deepStrictEqual(utcHour.range(utc(2010, 11, 31, 12, 30), utc(2010, 11, 31, 15, 30)), [
    utc(2010, 11, 31, 13),
    utc(2010, 11, 31, 14),
    utc(2010, 11, 31, 15)
  ]);
});

it("utcHour.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(utcHour.range(utc(2010, 11, 31, 23), utc(2011, 0, 1, 2))[0], utc(2010, 11, 31, 23));
});

it("utcHour.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(utcHour.range(utc(2010, 11, 31, 23), utc(2011, 0, 1, 2))[2], utc(2011, 0, 1, 1));
});

it("utcHour.range(start, stop) can skip hours", () => {
  assert.deepStrictEqual(utcHour.range(utc(2011, 1, 1, 1), utc(2011, 1, 1, 13), 3), [
    utc(2011, 1, 1, 1),
    utc(2011, 1, 1, 4),
    utc(2011, 1, 1, 7),
    utc(2011, 1, 1, 10)
  ]);
});

it("utcHour.range(start, stop) does not observe the start of daylight savings time", () => {
  assert.deepStrictEqual(utcHour.range(utc(2011, 2, 13, 1), utc(2011, 2, 13, 5)), [
    utc(2011, 2, 13, 1),
    utc(2011, 2, 13, 2),
    utc(2011, 2, 13, 3),
    utc(2011, 2, 13, 4)
  ]);
});

it("utcHour.range(start, stop) does not observe the end of daylight savings time", () => {
  assert.deepStrictEqual(utcHour.range(utc(2011, 10, 6, 0), utc(2011, 10, 6, 2)), [
    utc(2011, 10, 6, 0),
    utc(2011, 10, 6, 1)
  ]);
});

it("utcHour.every(step) returns every stepth hour, starting with the first hour of the day", () => {
  assert.deepStrictEqual(utcHour.every(4).range(utc(2008, 11, 30, 12, 47), utc(2008, 11, 31, 13, 57)), [utc(2008, 11, 30, 16), utc(2008, 11, 30, 20), utc(2008, 11, 31, 0), utc(2008, 11, 31, 4), utc(2008, 11, 31, 8), utc(2008, 11, 31, 12)]);
  assert.deepStrictEqual(utcHour.every(12).range(utc(2008, 11, 30, 12, 47), utc(2008, 11, 31, 13, 57)), [utc(2008, 11, 31, 0), utc(2008, 11, 31, 12)]);
});
