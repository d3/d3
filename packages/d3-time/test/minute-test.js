import assert from "assert";
import {timeMinute} from "../src/index.js";
import {local, utc} from "./date.js";

it("timeMinute.floor(date) returns minutes", () => {
  assert.deepStrictEqual(timeMinute.floor(local(2010, 11, 31, 23, 59, 59)), local(2010, 11, 31, 23, 59));
  assert.deepStrictEqual(timeMinute.floor(local(2011,  0,  1,  0,  0,  0)), local(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(timeMinute.floor(local(2011,  0,  1,  0,  0, 59)), local(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(timeMinute.floor(local(2011,  0,  1,  0,  1,  0)), local(2011,  0,  1,  0,  1));
});

it("timeMinute.ceil(date) returns minutes", () => {
  assert.deepStrictEqual(timeMinute.ceil(local(2010, 11, 31, 23, 59, 59)), local(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(timeMinute.ceil(local(2011,  0,  1,  0,  0,  0)), local(2011,  0,  1,  0,  0));
  assert.deepStrictEqual(timeMinute.ceil(local(2011,  0,  1,  0,  0, 59)), local(2011,  0,  1,  0,  1));
  assert.deepStrictEqual(timeMinute.ceil(local(2011,  0,  1,  0,  1,  0)), local(2011,  0,  1,  0,  1));
});

it("timeMinute.offset(date) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeMinute.offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeMinute.offset(date) does not round the passed-in-date", () => {
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011,  0,  1,  0,  0, 59, 999));
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 31, 23, 57, 59, 456));
});

it("timeMinute.offset(date) allows negative offsets", () => {
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 12), -1), local(2010, 11, 31, 23, 11));
  assert.deepStrictEqual(timeMinute.offset(local(2011,  0,  1,  0,  1), -2), local(2010, 11, 31, 23, 59));
  assert.deepStrictEqual(timeMinute.offset(local(2011,  0,  1,  0,  0), -1), local(2010, 11, 31, 23, 59));
});

it("timeMinute.offset(date) allows positive offsets", () => {
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 11), +1), local(2010, 11, 31, 23, 12));
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 59), +2), local(2011,  0,  1,  0,  1));
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 59), +1), local(2011,  0,  1,  0,  0));
});

it("timeMinute.offset(date) allows zero offset", () => {
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeMinute.offset(local(2010, 11, 31, 23, 59, 58,   0), 0), local(2010, 11, 31, 23, 59, 58,   0));
});

it("timeMinute.range(start, stop), returns minutes", () => {
  assert.deepStrictEqual(timeMinute.range(local(2010, 11, 31, 23, 59), local(2011, 0, 1, 0, 2)), [
    local(2010, 11, 31, 23, 59),
    local(2011, 0, 1, 0, 0),
    local(2011, 0, 1, 0, 1)
  ]);
});

it("timeMinute.range(start, stop), has an inclusive lower bound", () => {
  assert.deepStrictEqual(timeMinute.range(local(2010, 11, 31, 23, 59), local(2011, 0, 1, 0, 2))[0], local(2010, 11, 31, 23, 59));
});

it("timeMinute.range(start, stop), has an exclusive upper bound", () => {
  assert.deepStrictEqual(timeMinute.range(local(2010, 11, 31, 23, 59), local(2011, 0, 1, 0, 2))[2], local(2011, 0, 1, 0, 1));
});

it("timeMinute.range(start, stop), can skip minutes", () => {
  assert.deepStrictEqual(timeMinute.range(local(2011, 1, 1, 12, 7), local(2011, 1, 1, 13, 7), 15), [
    local(2011, 1, 1, 12, 7),
    local(2011, 1, 1, 12, 22),
    local(2011, 1, 1, 12, 37),
    local(2011, 1, 1, 12, 52)
  ]);
});

it("timeMinute.range(start, stop), observes start of daylight savings time", () => {
  assert.deepStrictEqual(timeMinute.range(utc(2011, 2, 13, 9, 59), utc(2011, 2, 13, 10, 2)), [
    utc(2011, 2, 13, 9, 59),
    utc(2011, 2, 13, 10, 0),
    utc(2011, 2, 13, 10, 1)
  ]);
});

it("timeMinute.range(start, stop), observes end of daylight savings time", () => {
  assert.deepStrictEqual(timeMinute.range(utc(2011, 10, 6, 8, 59), utc(2011, 10, 6, 9, 2)), [
    utc(2011, 10, 6, 8, 59),
    utc(2011, 10, 6, 9, 0),
    utc(2011, 10, 6, 9, 1)
  ]);
});

it("timeMinute.every(step) returns every stepth minute, starting with the first minute of the hour", () => {
  assert.deepStrictEqual(timeMinute.every(15).range(local(2008, 11, 30, 12, 47), local(2008, 11, 30, 13, 57)), [local(2008, 11, 30, 13, 0), local(2008, 11, 30, 13, 15), local(2008, 11, 30, 13, 30), local(2008, 11, 30, 13, 45)]);
  assert.deepStrictEqual(timeMinute.every(30).range(local(2008, 11, 30, 12, 47), local(2008, 11, 30, 13, 57)), [local(2008, 11, 30, 13, 0), local(2008, 11, 30, 13, 30)]);
});

it("timeMinute.range(start, stop) returns every minute crossing the daylight savings boundary", () => {
  assert.deepStrictEqual(timeMinute.range(new Date(1478422800000 - 2 * 6e4), new Date(1478422800000 + 2 * 6e4)), [
    new Date(1478422680000), // Sun Nov  6 2016  1:58:00 GMT-0700 (PDT)
    new Date(1478422740000), // Sun Nov  6 2016  1:59:00 GMT-0700 (PDT)
    new Date(1478422800000), // Sun Nov  6 2016  1:00:00 GMT-0800 (PDT)
    new Date(1478422860000)  // Sun Nov  6 2016  1:01:00 GMT-0800 (PDT)
  ]);
});
