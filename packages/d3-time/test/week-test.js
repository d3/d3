import assert from "assert";
import {timeSunday, timeWeek} from "../src/index.js";
import {local} from "./date.js";

it("timeWeek.floor(date) returns sundays", () => {
  assert.deepStrictEqual(timeWeek.floor(local(2010, 11, 31, 23, 59, 59)), local(2010, 11, 26));
  assert.deepStrictEqual(timeWeek.floor(local(2011,  0,  1,  0,  0,  0)), local(2010, 11, 26));
  assert.deepStrictEqual(timeWeek.floor(local(2011,  0,  1,  0,  0,  1)), local(2010, 11, 26));
  assert.deepStrictEqual(timeWeek.floor(local(2011,  0,  1, 23, 59, 59)), local(2010, 11, 26));
  assert.deepStrictEqual(timeWeek.floor(local(2011,  0,  2,  0,  0,  0)), local(2011,  0,  2));
  assert.deepStrictEqual(timeWeek.floor(local(2011,  0,  2,  0,  0,  1)), local(2011,  0,  2));
});

it("timeWeek.floor(date) observes the start of daylight savings time", () => {
  assert.deepStrictEqual(timeWeek.floor(local(2011,  2, 13,  1)), local(2011,  2, 13));
});

it("timeWeek.floor(date) observes the end of the daylight savings time", () => {
  assert.deepStrictEqual(timeWeek.floor(local(2011, 10,  6,  1)), local(2011, 10,  6));
});

it("timeWeek.floor(date) correctly handles years in the first century", () => {
  assert.deepStrictEqual(timeWeek.floor(local(9, 10,  6,  7)), local(9, 10,  1));
});

it("timeWeek.ceil(date) returns sundays", () => {
  assert.deepStrictEqual(timeWeek.ceil(local(2010, 11, 31, 23, 59, 59)), local(2011,  0,  2));
  assert.deepStrictEqual(timeWeek.ceil(local(2011,  0,  1,  0,  0,  0)), local(2011,  0,  2));
  assert.deepStrictEqual(timeWeek.ceil(local(2011,  0,  1,  0,  0,  1)), local(2011,  0,  2));
  assert.deepStrictEqual(timeWeek.ceil(local(2011,  0,  1, 23, 59, 59)), local(2011,  0,  2));
  assert.deepStrictEqual(timeWeek.ceil(local(2011,  0,  2,  0,  0,  0)), local(2011,  0,  2));
  assert.deepStrictEqual(timeWeek.ceil(local(2011,  0,  2,  0,  0,  1)), local(2011,  0,  9));
});

it("timeWeek.ceil(date) observes the start of daylight savings time", () => {
  assert.deepStrictEqual(timeWeek.ceil(local(2011,  2, 13,  1)), local(2011,  2, 20));
});

it("timeWeek.ceil(date) observes the end of the daylight savings time", () => {
  assert.deepStrictEqual(timeWeek.ceil(local(2011, 10,  6,  1)), local(2011, 10, 13));
});

it("timeWeek.offset(date, step) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeWeek.offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeWeek.offset(date, step) does not round the passed-in-date", () => {
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011,  0,  7, 23, 59, 59, 999));
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2010, 11, 17, 23, 59, 59, 456));
});

it("timeWeek.offset(date, step) allows negative offsets", () => {
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11,  1), -1), local(2010, 10, 24));
  assert.deepStrictEqual(timeWeek.offset(local(2011,  0,  1), -2), local(2010, 11, 18));
  assert.deepStrictEqual(timeWeek.offset(local(2011,  0,  1), -1), local(2010, 11, 25));
});

it("timeWeek.offset(date, step) allows positive offsets", () => {
  assert.deepStrictEqual(timeWeek.offset(local(2010, 10, 24), +1), local(2010, 11,  1));
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11, 18), +2), local(2011,  0,  1));
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11, 25), +1), local(2011,  0,  1));
});

it("timeWeek.offset(date, step) allows zero offset", () => {
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeWeek.offset(local(2010, 11, 31, 23, 59, 58,   0), 0), local(2010, 11, 31, 23, 59, 58,   0));
});

it("timeWeek.range(start, stop) returns sundays", () => {
  assert.deepStrictEqual(timeWeek.range(local(2010, 11, 21), local(2011, 0, 12)), [
    local(2010, 11, 26),
    local(2011, 0, 2),
    local(2011, 0, 9)
  ]);
});

it("timeWeek.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(timeWeek.range(local(2010, 11, 21), local(2011, 0, 12))[0], local(2010, 11, 26));
});

it("timeWeek.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(timeWeek.range(local(2010, 11, 21), local(2011, 0, 12))[2], local(2011, 0, 9));
});

it("timeWeek.range(start, stop) can skip weeks", () => {
  assert.deepStrictEqual(timeWeek.range(local(2011, 0, 1), local(2011, 3, 1), 4), [
    local(2011, 0, 2),
    local(2011, 0, 30),
    local(2011, 1, 27),
    local(2011, 2, 27)
  ]);
});

it("timeWeek.range(start, stop) observes start of daylight savings time", () => {
  assert.deepStrictEqual(timeWeek.range(local(2011, 2, 1), local(2011, 2, 28)), [
    local(2011, 2, 6),
    local(2011, 2, 13),
    local(2011, 2, 20),
    local(2011, 2, 27)
  ]);
});

it("timeWeek.range(start, stop) observes end of daylight savings time", () => {
  assert.deepStrictEqual(timeWeek.range(local(2011, 10, 1), local(2011, 10, 30)), [
    local(2011, 10, 6),
    local(2011, 10, 13),
    local(2011, 10, 20),
    local(2011, 10, 27)
  ]);
});

it("timeWeek is an alias for timeSunday", () => {
  assert.strictEqual(timeWeek, timeSunday);
});

it("timeWeek.every(step) returns every stepth Sunday, starting with the first Sunday of the month", () => {
  assert.deepStrictEqual(timeWeek.every(2).range(local(2008, 11, 3), local(2009, 1, 5)), [local(2008, 11, 7), local(2008, 11, 21), local(2009, 0, 4), local(2009, 0, 18), local(2009, 1, 1)]);
});
