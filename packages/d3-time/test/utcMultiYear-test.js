import assert from "assert";
import {utcYear} from "../src/index.js";
import {utc} from "./date.js";

it("utcYear.every(n).floor(date) returns integer multiples of n years", () => {
  assert.deepStrictEqual(utcYear.every(10).floor(utc(2009, 11, 31, 23, 59, 59)), utc(2000,  0,  1));
  assert.deepStrictEqual(utcYear.every(10).floor(utc(2010,  0,  1,  0,  0,  0)), utc(2010,  0,  1));
  assert.deepStrictEqual(utcYear.every(10).floor(utc(2010,  0,  1,  0,  0,  1)), utc(2010,  0,  1));
});

it("utcYear.every(n).ceil(date) returns integer multiples of n years", () => {
  assert.deepStrictEqual(utcYear.every(100).ceil(utc(1999, 11, 31, 23, 59, 59)), utc(2000,  0,  1));
  assert.deepStrictEqual(utcYear.every(100).ceil(utc(2000,  0,  1,  0,  0,  0)), utc(2000,  0,  1));
  assert.deepStrictEqual(utcYear.every(100).ceil(utc(2000,  0,  1,  0,  0,  1)), utc(2100,  0,  1));
});

it("utcYear.every(n).offset(date, count) does not modify the passed-in date", () => {
  const d = utc(2010, 11, 31, 23, 59, 59, 999);
  utcYear.every(5).offset(d, +1);
  assert.deepStrictEqual(d, utc(2010, 11, 31, 23, 59, 59, 999));
});

it("utcYear.every(n).offset(date, count) does not round the passed-in-date", () => {
  assert.deepStrictEqual(utcYear.every(5).offset(utc(2010, 11, 31, 23, 59, 59, 999), +1), utc(2015, 11, 31, 23, 59, 59, 999));
  assert.deepStrictEqual(utcYear.every(5).offset(utc(2010, 11, 31, 23, 59, 59, 456), -2), utc(2000, 11, 31, 23, 59, 59, 456));
});

it("utcYear.every(n) does not define interval.count or interval.every", () => {
  const decade = utcYear.every(10);
  assert.strictEqual(decade.count, undefined);
  assert.strictEqual(decade.every, undefined);
});

it("utcYear.every(n).range(start, stop) returns multiples of n years", () => {
  assert.deepStrictEqual(utcYear.every(10).range(utc(2010, 0, 1), utc(2031, 0, 1)), [
    utc(2010, 0, 1),
    utc(2020, 0, 1),
    utc(2030, 0, 1)
  ]);
});
