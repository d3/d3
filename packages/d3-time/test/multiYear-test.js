import assert from "assert";
import {timeYear} from "../src/index.js";
import {local} from "./date.js";

it("timeYear.every(n).floor(date) returns integer multiples of n years", () => {
  assert.deepStrictEqual(timeYear.every(10).floor(local(2009, 11, 31, 23, 59, 59)), local(2000,  0,  1));
  assert.deepStrictEqual(timeYear.every(10).floor(local(2010,  0,  1,  0,  0,  0)), local(2010,  0,  1));
  assert.deepStrictEqual(timeYear.every(10).floor(local(2010,  0,  1,  0,  0,  1)), local(2010,  0,  1));
});

it("timeYear.every(n).ceil(date) returns integer multiples of n years", () => {
  assert.deepStrictEqual(timeYear.every(100).ceil(local(1999, 11, 31, 23, 59, 59)), local(2000,  0,  1));
  assert.deepStrictEqual(timeYear.every(100).ceil(local(2000,  0,  1,  0,  0,  0)), local(2000,  0,  1));
  assert.deepStrictEqual(timeYear.every(100).ceil(local(2000,  0,  1,  0,  0,  1)), local(2100,  0,  1));
});

it("timeYear.every(n).offset(date, count) does not modify the passed-in date", () => {
  const d = local(2010, 11, 31, 23, 59, 59, 999);
  timeYear.every(5).offset(d, +1);
  assert.deepStrictEqual(d, local(2010, 11, 31, 23, 59, 59, 999));
});

it("timeYear.every(n).offset(date, count) does not round the passed-in-date", () => {
  assert.deepStrictEqual(timeYear.every(5).offset(local(2010, 11, 31, 23, 59, 59, 999), +1), local(2015, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(timeYear.every(5).offset(local(2010, 11, 31, 23, 59, 59, 456), -2), local(2000, 11, 31, 23, 59, 59, 456));
});

it("timeYear.every(n) does not define interval.count or interval.every", () => {
  const decade = timeYear.every(10);
  assert.strictEqual(decade.count, undefined);
  assert.strictEqual(decade.every, undefined);
});

it("timeYear.every(n).range(start, stop) returns multiples of n years", () => {
  assert.deepStrictEqual(timeYear.every(10).range(local(2010, 0, 1), local(2031, 0, 1)), [
    local(2010, 0, 1),
    local(2020, 0, 1),
    local(2030, 0, 1)
  ]);
});
