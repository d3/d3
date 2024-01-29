import assert from "assert";
import {utcSecond} from "../src/index.js";
import {utc} from "./date.js";

it("utcSecond.floor(date) returns seconds", () => {
  assert.deepStrictEqual(utcSecond.floor(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2010, 11, 31, 23, 59, 59));
  assert.deepStrictEqual(utcSecond.floor(utc(2011,  0,  1,  0,  0,  0,   0)), utc(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(utcSecond.floor(utc(2011,  0,  1,  0,  0,  0,   1)), utc(2011,  0,  1,  0,  0,  0));
});

it("utcSecond.round(date) returns seconds", () => {
  assert.deepStrictEqual(utcSecond.round(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(utcSecond.round(utc(2011,  0,  1,  0,  0,  0, 499)), utc(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(utcSecond.round(utc(2011,  0,  1,  0,  0,  0, 500)), utc(2011,  0,  1,  0,  0,  1));
});

it("utcSecond.ceil(date) returns seconds", () => {
  assert.deepStrictEqual(utcSecond.ceil(utc(2010, 11, 31, 23, 59, 59, 999)), utc(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(utcSecond.ceil(utc(2011,  0,  1,  0,  0,  0,   0)), utc(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(utcSecond.ceil(utc(2011,  0,  1,  0,  0,  0,   1)), utc(2011,  0,  1,  0,  0,  1));
});

it("utcSecond.offset(date, step) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  utcSecond.offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("utcSecond.offset(date, step) does not round the passed-in-date", () => {
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011,  0,  1,  0,  0,  0, 999));
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 31, 23, 59, 57, 456));
});

it("utcSecond.offset(date, step) allows negative offsets", () => {
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 59), -1), utc(2010, 11, 31, 23, 59, 58));
  assert.deepStrictEqual(utcSecond.offset(utc(2011,  0,  1,  0,  0,  0), -2), utc(2010, 11, 31, 23, 59, 58));
  assert.deepStrictEqual(utcSecond.offset(utc(2011,  0,  1,  0,  0,  0), -1), utc(2010, 11, 31, 23, 59, 59));
});

it("utcSecond.offset(date, step) allows positive offsets", () => {
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 58), +1), utc(2010, 11, 31, 23, 59, 59));
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 58), +2), utc(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 59), +1), utc(2011,  0,  1,  0,  0,  0));
});

it("utcSecond.offset(date, step) allows zero offset", () => {
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcSecond.offset(utc(2010, 11, 31, 23, 59, 58,   0), 0), utc(2010, 11, 31, 23, 59, 58,   0));
});

it("utcSecond.range(start, stop) returns seconds", () => {
  assert.deepStrictEqual(utcSecond.range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2)), [
    utc(2010, 11, 31, 23, 59, 59),
    utc(2011, 0, 1, 0, 0, 0),
    utc(2011, 0, 1, 0, 0, 1)
  ]);
});

it("utcSecond.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(utcSecond.range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2))[0], utc(2010, 11, 31, 23, 59, 59));
});

it("utcSecond.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(utcSecond.range(utc(2010, 11, 31, 23, 59, 59), utc(2011, 0, 1, 0, 0, 2))[2], utc(2011, 0, 1, 0, 0, 1));
});

it("utcSecond.range(start, stop, step) can skip seconds", () => {
  assert.deepStrictEqual(utcSecond.range(utc(2011, 1, 1, 12, 0, 7), utc(2011, 1, 1, 12, 1, 7), 15), [
    utc(2011, 1, 1, 12, 0, 7),
    utc(2011, 1, 1, 12, 0, 22),
    utc(2011, 1, 1, 12, 0, 37),
    utc(2011, 1, 1, 12, 0, 52)
  ]);
});

it("utcSecond.range(start, stop) observes start of daylight savings time", () => {
  assert.deepStrictEqual(utcSecond.range(utc(2011, 2, 13, 9, 59, 59), utc(2011, 2, 13, 10, 0, 2)), [
    utc(2011, 2, 13, 9, 59, 59),
    utc(2011, 2, 13, 10, 0, 0),
    utc(2011, 2, 13, 10, 0, 1)
  ]);
});

it("utcSecond.range(start, stop) observes end of daylight savings time", () => {
  assert.deepStrictEqual(utcSecond.range(utc(2011, 10, 6, 8, 59, 59), utc(2011, 10, 6, 9, 0, 2)), [
    utc(2011, 10, 6, 8, 59, 59),
    utc(2011, 10, 6, 9, 0, 0),
    utc(2011, 10, 6, 9, 0, 1)
  ]);
});

it("utcSecond.every(step) returns every stepth second, starting with the first second of the minute", () => {
  assert.deepStrictEqual(utcSecond.every(15).range(utc(2008, 11, 30, 12, 36, 47), utc(2008, 11, 30, 12, 37, 57)), [utc(2008, 11, 30, 12, 37, 0), utc(2008, 11, 30, 12, 37, 15), utc(2008, 11, 30, 12, 37, 30), utc(2008, 11, 30, 12, 37, 45)]);
  assert.deepStrictEqual(utcSecond.every(30).range(utc(2008, 11, 30, 12, 36, 47), utc(2008, 11, 30, 12, 37, 57)), [utc(2008, 11, 30, 12, 37, 0), utc(2008, 11, 30, 12, 37, 30)]);
});
