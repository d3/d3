import assert from "assert";
import {timeYear} from "../src/index.js";
import {local} from "./date.js";

it("timeYear.floor(date) returns years", () => {
  assert.deepStrictEqual(timeYear.floor(local(2010, 11, 31, 23, 59, 59)), local(2010,  0,  1));
  assert.deepStrictEqual(timeYear.floor(local(2011,  0,  1,  0,  0,  0)), local(2011,  0,  1));
  assert.deepStrictEqual(timeYear.floor(local(2011,  0,  1,  0,  0,  1)), local(2011,  0,  1));
});

it("timeYear.floor(date) does not modify the specified date", () => {
  const d = local(2010, 11, 31, 23, 59, 59);
  assert.deepStrictEqual(timeYear.floor(d), local(2010,  0,  1));
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59));
});

it("timeYear.floor(date) correctly handles years in the first century", () => {
  assert.deepStrictEqual(timeYear.floor(local(9, 10,  6,  7)), local(9,  0,  1));
});

it("timeYear.ceil(date) returns years", () => {
  assert.deepStrictEqual(timeYear.ceil(local(2010, 11, 31, 23, 59, 59)), local(2011,  0,  1));
  assert.deepStrictEqual(timeYear.ceil(local(2011,  0,  1,  0,  0,  0)), local(2011,  0,  1));
  assert.deepStrictEqual(timeYear.ceil(local(2011,  0,  1,  0,  0,  1)), local(2012,  0,  1));
});

it("timeYear.offset(date, count) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeYear.offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeYear.offset(date, count) does not round the passed-in-date", () => {
  assert.deepStrictEqual(timeYear.offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2011, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeYear.offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2008, 11, 31, 23, 59, 59, 456));
});

it("timeYear.offset(date, count) allows negative offsets", () => {
  assert.deepStrictEqual(timeYear.offset(local(2010, 11,  1), -1), local(2009, 11,  1));
  assert.deepStrictEqual(timeYear.offset(local(2011,  0,  1), -2), local(2009,  0,  1));
  assert.deepStrictEqual(timeYear.offset(local(2011,  0,  1), -1), local(2010,  0,  1));
});

it("timeYear.offset(date, count) allows positive offsets", () => {
  assert.deepStrictEqual(timeYear.offset(local(2009, 11,  1), +1), local(2010, 11,  1));
  assert.deepStrictEqual(timeYear.offset(local(2009,  0,  1), +2), local(2011,  0,  1));
  assert.deepStrictEqual(timeYear.offset(local(2010,  0,  1), +1), local(2011,  0,  1));
});

it("timeYear.offset(date, count) allows zero offset", () => {
  assert.deepStrictEqual(timeYear.offset(local(2010, 11, 31, 23, 59, 59, 999), 0), local(2010, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeYear.offset(local(2010, 11, 31, 23, 59, 58,   0), 0), local(2010, 11, 31, 23, 59, 58,   0));
});

it("timeYear.every(step) returns every stepth year, starting with year zero", () => {
  assert.deepStrictEqual(timeYear.every(5).range(local(2008), local(2023)), [local(2010), local(2015), local(2020)]);
});

it("timeYear.range(start, stop) returns years", () => {
  assert.deepStrictEqual(timeYear.range(local(2010, 0, 1), local(2013, 0, 1)), [
    local(2010, 0, 1),
    local(2011, 0, 1),
    local(2012, 0, 1)
  ]);
});

it("timeYear.range(start, stop) has an inclusive lower bound", () => {
  assert.deepStrictEqual(timeYear.range(local(2010, 0, 1), local(2013, 0, 1))[0], local(2010, 0, 1));
});

it("timeYear.range(start, stop) has an exclusive upper bound", () => {
  assert.deepStrictEqual(timeYear.range(local(2010, 0, 1), local(2013, 0, 1))[2], local(2012, 0, 1));
});

it("timeYear.range(start, stop, step) can skip years", () => {
  assert.deepStrictEqual(timeYear.range(local(2009, 0, 1), local(2029, 0, 1), 5), [
    local(2009, 0, 1),
    local(2014, 0, 1),
    local(2019, 0, 1),
    local(2024, 0, 1)
  ]);
});
