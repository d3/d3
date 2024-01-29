import assert from "assert";
import {timeHour} from "../src/index.js";
import {local, utc} from "./date.js";

it("timeHour.floor(date) returns hours", () => {
  assert.deepStrictEqual(timeHour.floor(local(2010, 11, 31, 23, 59)), local(2010, 11, 31, 23));
  assert.deepStrictEqual(timeHour.floor(local(2011,  0,  1,  0,  0)), local(2011,  0,  1,  0));
  assert.deepStrictEqual(timeHour.floor(local(2011,  0,  1,  0,  1)), local(2011,  0,  1,  0));
});

it("timeHour.floor(date) observes start of daylight savings time", () => {
  assert.deepStrictEqual(timeHour.floor(utc(2011,  2, 13,  8, 59)), utc(2011,  2, 13,  8));
  assert.deepStrictEqual(timeHour.floor(utc(2011,  2, 13,  9,  0)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(timeHour.floor(utc(2011,  2, 13,  9,  1)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(timeHour.floor(utc(2011,  2, 13,  9, 59)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(timeHour.floor(utc(2011,  2, 13, 10,  0)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(timeHour.floor(utc(2011,  2, 13, 10,  1)), utc(2011,  2, 13, 10));
});

it("timeHour.floor(date) observes end of daylight savings time", () => {
  assert.deepStrictEqual(timeHour.floor(utc(2011, 10,  6,  7, 59)), utc(2011, 10,  6,  7));
  assert.deepStrictEqual(timeHour.floor(utc(2011, 10,  6,  8,  0)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(timeHour.floor(utc(2011, 10,  6,  8,  1)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(timeHour.floor(utc(2011, 10,  6,  8, 59)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(timeHour.floor(utc(2011, 10,  6,  9,  0)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(timeHour.floor(utc(2011, 10,  6,  9,  1)), utc(2011, 10,  6,  9));
});

it("timeHour.ceil(date) returns hours", () => {
  assert.deepStrictEqual(timeHour.ceil(local(2010, 11, 31, 23, 59)), local(2011,  0,  1,  0));
  assert.deepStrictEqual(timeHour.ceil(local(2011,  0,  1,  0,  0)), local(2011,  0,  1,  0));
  assert.deepStrictEqual(timeHour.ceil(local(2011,  0,  1,  0,  1)), local(2011,  0,  1,  1));
});

it("timeHour.ceil(date) observes start of daylight savings time", () => {
  assert.deepStrictEqual(timeHour.ceil(utc(2011,  2, 13,  8, 59)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(timeHour.ceil(utc(2011,  2, 13,  9,  0)), utc(2011,  2, 13,  9));
  assert.deepStrictEqual(timeHour.ceil(utc(2011,  2, 13,  9,  1)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(timeHour.ceil(utc(2011,  2, 13,  9, 59)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(timeHour.ceil(utc(2011,  2, 13, 10,  0)), utc(2011,  2, 13, 10));
  assert.deepStrictEqual(timeHour.ceil(utc(2011,  2, 13, 10,  1)), utc(2011,  2, 13, 11));
});

it("timeHour.ceil(date) observes end of daylight savings time", () => {
  assert.deepStrictEqual(timeHour.ceil(utc(2011, 10,  6,  7, 59)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(timeHour.ceil(utc(2011, 10,  6,  8,  0)), utc(2011, 10,  6,  8));
  assert.deepStrictEqual(timeHour.ceil(utc(2011, 10,  6,  8,  1)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(timeHour.ceil(utc(2011, 10,  6,  8, 59)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(timeHour.ceil(utc(2011, 10,  6,  9,  0)), utc(2011, 10,  6,  9));
  assert.deepStrictEqual(timeHour.ceil(utc(2011, 10,  6,  9,  1)), utc(2011, 10,  6, 10));
});

it("timeHour.offset(date) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeHour.offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeHour.offset(date) does not round the passed-in-date", () => {
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011,  0,  1,  0, 59, 59, 999));
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 31, 21, 59, 59, 456));
});

it("timeHour.offset(date) allows negative offsets", () => {
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 12), -1), local(2010, 11, 31, 11));
  assert.deepStrictEqual(timeHour.offset(local(2011,  0,  1,  1), -2), local(2010, 11, 31, 23));
  assert.deepStrictEqual(timeHour.offset(local(2011,  0,  1,  0), -1), local(2010, 11, 31, 23));
});

it("timeHour.offset(date) allows positive offsets", () => {
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 11), +1), local(2010, 11, 31, 12));
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 23), +2), local(2011,  0,  1,  1));
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 23), +1), local(2011,  0,  1,  0));
});

it("timeHour.offset(date) allows zero offset", () => {
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeHour.offset(local(2010, 11, 31, 23, 59, 58,   0), 0), local(2010, 11, 31, 23, 59, 58,   0));
});

it("timeHour.range(start, stop) returns hours", () => {
  assert.deepStrictEqual(timeHour.range(local(2010, 11, 31, 12, 30), local(2010, 11, 31, 15, 30)), [
    local(2010, 11, 31, 13),
    local(2010, 11, 31, 14),
    local(2010, 11, 31, 15)
  ]);
});

it("timeHour.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(timeHour.range(local(2010, 11, 31, 23), local(2011, 0, 1, 2))[0], local(2010, 11, 31, 23));
});

it("timeHour.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(timeHour.range(local(2010, 11, 31, 23), local(2011, 0, 1, 2))[2], local(2011, 0, 1, 1));
});

it("timeHour.range(start, stop) can skip hours", () => {
  assert.deepStrictEqual(timeHour.range(local(2011, 1, 1, 1), local(2011, 1, 1, 13), 3), [
    local(2011, 1, 1, 1),
    local(2011, 1, 1, 4),
    local(2011, 1, 1, 7),
    local(2011, 1, 1, 10)
  ]);
});

it("timeHour.range(start, stop) observes start of daylight savings time", () => {
  assert.deepStrictEqual(timeHour.range(local(2011, 2, 13, 1), local(2011, 2, 13, 5)), [
    utc(2011, 2, 13, 9),
    utc(2011, 2, 13, 10),
    utc(2011, 2, 13, 11)
  ]);
});

it("timeHour.range(start, stop) observes end of daylight savings time", () => {
  assert.deepStrictEqual(timeHour.range(local(2011, 10, 6, 0), local(2011, 10, 6, 2)), [
    utc(2011, 10, 6, 7),
    utc(2011, 10, 6, 8),
    utc(2011, 10, 6, 9)
  ]);
});

it("timeHour.every(step) returns every stepth hour, starting with the first hour of the day", () => {
  assert.deepStrictEqual(timeHour.every(4).range(local(2008, 11, 30, 12, 47), local(2008, 11, 31, 13, 57)), [local(2008, 11, 30, 16), local(2008, 11, 30, 20), local(2008, 11, 31, 0), local(2008, 11, 31, 4), local(2008, 11, 31, 8), local(2008, 11, 31, 12)]);
  assert.deepStrictEqual(timeHour.every(12).range(local(2008, 11, 30, 12, 47), local(2008, 11, 31, 13, 57)), [local(2008, 11, 31, 0), local(2008, 11, 31, 12)]);
});

it("timeHour.range(start, stop) returns every hour crossing the daylight savings boundary", () => {
  assert.deepStrictEqual(timeHour.range(new Date(1478422800000 - 2 * 36e5), new Date(1478422800000 + 2 * 36e5)), [
    new Date(1478415600000), // Sun Nov  6 2016  0:00:00 GMT-0700 (PDT)
    new Date(1478419200000), // Sun Nov  6 2016  1:00:00 GMT-0700 (PDT)
    new Date(1478422800000), // Sun Nov  6 2016  1:00:00 GMT-0800 (PDT)
    new Date(1478426400000)  // Sun Nov  6 2016  2:00:00 GMT-0800 (PDT)
  ]);
});
