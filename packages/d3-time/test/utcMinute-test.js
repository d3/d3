import assert from "assert";
import {utcMinute} from "../src/index.js";
import {utc} from "./date.js";

it("utcMinute.floor(date) returns minutes", () => {
  assert.deepStrictEqual(utcMinute.floor(utc(2010, 11, 31, 23, 59, 59)), utc(2010, 11, 31, 23, 59));
  assert.deepStrictEqual(utcMinute.floor(utc(2011,  0,  1,  0,  0,  0)), utc(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(utcMinute.floor(utc(2011,  0,  1,  0,  0, 59)), utc(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(utcMinute.floor(utc(2011,  0,  1,  0,  1,  0)), utc(2011,  0,  1,  0,  1));
});

it("utcMinute.ceil(date) returns minutes", () => {
  assert.deepStrictEqual(utcMinute.ceil(utc(2010, 11, 31, 23, 59, 59)), utc(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(utcMinute.ceil(utc(2011,  0,  1,  0,  0,  0)), utc(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(utcMinute.ceil(utc(2011,  0,  1,  0,  0, 59)), utc(2011,  0,  1,  0,  1));
  assert.deepStrictEqual(utcMinute.ceil(utc(2011,  0,  1,  0,  1,  0)), utc(2011,  0,  1,  0,  1));
});

it("utcMinute.offset(date) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  utcMinute.offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("utcMinute.offset(date) does not round the passed-in-date", () => {
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2011,  0,  1,  0,  0, 59, 999));
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2010, 11, 31, 23, 57, 59, 456));
});

it("utcMinute.offset(date) allows negative offsets", () => {
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 12), -1), utc(2010, 11, 31, 23, 11));
  assert.deepStrictEqual(utcMinute.offset(utc(2011,  0,  1,  0,  1), -2), utc(2010, 11, 31, 23, 59));
  assert.deepStrictEqual(utcMinute.offset(utc(2011,  0,  1,  0,  0), -1), utc(2010, 11, 31, 23, 59));
});

it("utcMinute.offset(date) allows positive offsets", () => {
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 11), +1), utc(2010, 11, 31, 23, 12));
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 59), +2), utc(2011,  0,  1,  0,  1));
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 59), +1), utc(2011,  0,  1,  0,  0));
});

it("utcMinute.offset(date) allows zero offset", () => {
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 59, 59, 999), 0), utc(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcMinute.offset(utc(2010, 11, 31, 23, 59, 58,   0), 0), utc(2010, 11, 31, 23, 59, 58,   0));
});

it("utcMinute.range(start, stop), returns minutes", () => {
  assert.deepStrictEqual(utcMinute.range(utc(2010, 11, 31, 23, 59), utc(2011, 0, 1, 0, 2)), [
    utc(2010, 11, 31, 23, 59),
    utc(2011, 0, 1, 0, 0),
    utc(2011, 0, 1, 0, 1)
  ]);
});

it("utcMinute.range(start, stop), has an inclusive lower bound", () => {
  assert.deepStrictEqual(utcMinute.range(utc(2010, 11, 31, 23, 59), utc(2011, 0, 1, 0, 2))[0], utc(2010, 11, 31, 23, 59));
});

it("utcMinute.range(start, stop), has an exclusive upper bound", () => {
  assert.deepStrictEqual(utcMinute.range(utc(2010, 11, 31, 23, 59), utc(2011, 0, 1, 0, 2))[2], utc(2011, 0, 1, 0, 1));
});

it("utcMinute.range(start, stop), can skip minutes", () => {
  assert.deepStrictEqual(utcMinute.range(utc(2011, 1, 1, 12, 7), utc(2011, 1, 1, 13, 7), 15), [
    utc(2011, 1, 1, 12, 7),
    utc(2011, 1, 1, 12, 22),
    utc(2011, 1, 1, 12, 37),
    utc(2011, 1, 1, 12, 52)
  ]);
});

it("utcMinute.range(start, stop), observes start of daylight savings time", () => {
  assert.deepStrictEqual(utcMinute.range(utc(2011, 2, 13, 9, 59), utc(2011, 2, 13, 10, 2)), [
    utc(2011, 2, 13, 9, 59),
    utc(2011, 2, 13, 10, 0),
    utc(2011, 2, 13, 10, 1)
  ]);
});

it("utcMinute.range(start, stop), observes end of daylight savings time", () => {
  assert.deepStrictEqual(utcMinute.range(utc(2011, 10, 6, 8, 59), utc(2011, 10, 6, 9, 2)), [
    utc(2011, 10, 6, 8, 59),
    utc(2011, 10, 6, 9, 0),
    utc(2011, 10, 6, 9, 1)
  ]);
});

it("utcMinute.every(step) returns every stepth minute, starting with the first minute of the hour", () => {
  assert.deepStrictEqual(utcMinute.every(15).range(utc(2008, 11, 30, 12, 47), utc(2008, 11, 30, 13, 57)), [utc(2008, 11, 30, 13, 0), utc(2008, 11, 30, 13, 15), utc(2008, 11, 30, 13, 30), utc(2008, 11, 30, 13, 45)]);
  assert.deepStrictEqual(utcMinute.every(30).range(utc(2008, 11, 30, 12, 47), utc(2008, 11, 30, 13, 57)), [utc(2008, 11, 30, 13, 0), utc(2008, 11, 30, 13, 30)]);
});
