import assert from "assert";
import {timeSecond} from "../src/index.js";
import {local, utc} from "./date.js";

it("timeSecond.floor(date) returns seconds", () => {
  assert.deepStrictEqual(timeSecond.floor(local(2010, 11, 31, 23, 59, 59, 999)), local(2010, 11, 31, 23, 59, 59));
  assert.deepStrictEqual(timeSecond.floor(local(2011,  0,  1,  0,  0,  0,   0)), local(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(timeSecond.floor(local(2011,  0,  1,  0,  0,  0,   1)), local(2011,  0,  1,  0,  0,  0));
});

it("timeSecond.round(date) returns seconds", () => {
  assert.deepStrictEqual(timeSecond.round(local(2010, 11, 31, 23, 59, 59, 999)), local(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(timeSecond.round(local(2011,  0,  1,  0,  0,  0, 499)), local(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(timeSecond.round(local(2011,  0,  1,  0,  0,  0, 500)), local(2011,  0,  1,  0,  0,  1));
});

it("timeSecond.ceil(date) returns seconds", () => {
  assert.deepStrictEqual(timeSecond.ceil(local(2010, 11, 31, 23, 59, 59, 999)), local(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(timeSecond.ceil(local(2011,  0,  1,  0,  0,  0,   0)), local(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(timeSecond.ceil(local(2011,  0,  1,  0,  0,  0,   1)), local(2011,  0,  1,  0,  0,  1));
});

it("timeSecond.offset(date, step) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeSecond.offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeSecond.offset(date, step) does not round the passed-in-date", () => {
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011,  0,  1,  0,  0,  0, 999));
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 31, 23, 59, 57, 456));
});

it("timeSecond.offset(date, step) allows negative offsets", () => {
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 59), -1), local(2010, 11, 31, 23, 59, 58));
  assert.deepStrictEqual(timeSecond.offset(local(2011,  0,  1,  0,  0,  0), -2), local(2010, 11, 31, 23, 59, 58));
  assert.deepStrictEqual(timeSecond.offset(local(2011,  0,  1,  0,  0,  0), -1), local(2010, 11, 31, 23, 59, 59));
});

it("timeSecond.offset(date, step) allows positive offsets", () => {
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 58), +1), local(2010, 11, 31, 23, 59, 59));
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 58), +2), local(2011,  0,  1,  0,  0,  0));
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 59), +1), local(2011,  0,  1,  0,  0,  0));
});

it("timeSecond.offset(date, step) allows zero offset", () => {
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeSecond.offset(local(2010, 11, 31, 23, 59, 58,   0), 0), local(2010, 11, 31, 23, 59, 58,   0));
});

it("timeSecond.range(start, stop) returns seconds", () => {
  assert.deepStrictEqual(timeSecond.range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2)), [
    local(2010, 11, 31, 23, 59, 59),
    local(2011, 0, 1, 0, 0, 0),
    local(2011, 0, 1, 0, 0, 1)
  ]);
});

it("timeSecond.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(timeSecond.range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2))[0], local(2010, 11, 31, 23, 59, 59));
});

it("timeSecond.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(timeSecond.range(local(2010, 11, 31, 23, 59, 59), local(2011, 0, 1, 0, 0, 2))[2], local(2011, 0, 1, 0, 0, 1));
});

it("timeSecond.range(start, stop, step) can skip seconds", () => {
  assert.deepStrictEqual(timeSecond.range(local(2011, 1, 1, 12, 0, 7), local(2011, 1, 1, 12, 1, 7), 15), [
    local(2011, 1, 1, 12, 0, 7),
    local(2011, 1, 1, 12, 0, 22),
    local(2011, 1, 1, 12, 0, 37),
    local(2011, 1, 1, 12, 0, 52)
  ]);
});

it("timeSecond.range(start, stop) observes start of daylight savings time", () => {
  assert.deepStrictEqual(timeSecond.range(utc(2011, 2, 13, 9, 59, 59), utc(2011, 2, 13, 10, 0, 2)), [
    utc(2011, 2, 13, 9, 59, 59),
    utc(2011, 2, 13, 10, 0, 0),
    utc(2011, 2, 13, 10, 0, 1)
  ]);
});

it("timeSecond.range(start, stop) observes end of daylight savings time", () => {
  assert.deepStrictEqual(timeSecond.range(utc(2011, 10, 6, 8, 59, 59), utc(2011, 10, 6, 9, 0, 2)), [
    utc(2011, 10, 6, 8, 59, 59),
    utc(2011, 10, 6, 9, 0, 0),
    utc(2011, 10, 6, 9, 0, 1)
  ]);
});

it("timeSecond.every(step) returns every stepth second, starting with the first second of the minute", () => {
  assert.deepStrictEqual(timeSecond.every(15).range(local(2008, 11, 30, 12, 36, 47), local(2008, 11, 30, 12, 37, 57)), [local(2008, 11, 30, 12, 37, 0), local(2008, 11, 30, 12, 37, 15), local(2008, 11, 30, 12, 37, 30), local(2008, 11, 30, 12, 37, 45)]);
  assert.deepStrictEqual(timeSecond.every(30).range(local(2008, 11, 30, 12, 36, 47), local(2008, 11, 30, 12, 37, 57)), [local(2008, 11, 30, 12, 37, 0), local(2008, 11, 30, 12, 37, 30)]);
});

it("timeSecond.range(start, stop) returns every second crossing the daylight savings boundary", () => {
  assert.deepStrictEqual(timeSecond.range(new Date(1478422800000 - 2 * 1e3), new Date(1478422800000 + 2 * 1e3)), [
    new Date(1478422798000), // Sun Nov  6 2016  1:59:58 GMT-0700 (PDT)
    new Date(1478422799000), // Sun Nov  6 2016  1:59:59 GMT-0700 (PDT)
    new Date(1478422800000), // Sun Nov  6 2016  1:00:00 GMT-0800 (PDT)
    new Date(1478422801000)  // Sun Nov  6 2016  1:00:01 GMT-0800 (PDT)
  ]);
});
