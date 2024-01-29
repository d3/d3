import assert from "assert";
import {timeMonday, timeMondays} from "../src/index.js";
import {local} from "./date.js";

it("timeMondays in an alias for timeMonday.range", () => {
  assert.strictEqual(timeMondays, timeMonday.range);
});

it("timeMonday.floor(date) returns Mondays", () => {
  assert.deepStrictEqual(timeMonday.floor(local(2011,  0,  1, 23, 59, 59)), local(2010, 11, 27));
  assert.deepStrictEqual(timeMonday.floor(local(2011,  0,  2,  0,  0,  0)), local(2010, 11, 27));
  assert.deepStrictEqual(timeMonday.floor(local(2011,  0,  2,  0,  0,  1)), local(2010, 11, 27));
  assert.deepStrictEqual(timeMonday.floor(local(2011,  0,  2, 23, 59, 59)), local(2010, 11, 27));
  assert.deepStrictEqual(timeMonday.floor(local(2011,  0,  3,  0,  0,  0)), local(2011,  0,  3));
  assert.deepStrictEqual(timeMonday.floor(local(2011,  0,  3,  0,  0,  1)), local(2011,  0,  3));
});

it("timeMonday.range(start, stop, step) returns every step Monday", () => {
  assert.deepStrictEqual(timeMonday.range(local(2011, 11,  1), local(2012,  0, 15), 2), [
    local(2011, 11,  5),
    local(2011, 11, 19),
    local(2012,  0,  2)
  ]);
});

it("timeMonday.count(start, end) counts Mondays after start (exclusive) and before end (inclusive)", () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(timeMonday.count(local(2014,  0,  1), local(2014,  0,  5)), 0);
  assert.strictEqual(timeMonday.count(local(2014,  0,  1), local(2014,  0,  6)), 1);
  assert.strictEqual(timeMonday.count(local(2014,  0,  1), local(2014,  0,  7)), 1);
  assert.strictEqual(timeMonday.count(local(2014,  0,  1), local(2014,  0, 13)), 2);

  //     January 2018
  // Su Mo Tu We Th Fr Sa
  //     1  2  3  4  5  6
  //  7  8  9 10 11 12 13
  // 14 15 16 17 18 19 20
  // 21 22 23 24 25 26 27
  // 28 29 30 31
  assert.strictEqual(timeMonday.count(local(2018,  0,  1), local(2018,  0,  7)), 0);
  assert.strictEqual(timeMonday.count(local(2018,  0,  1), local(2018,  0,  8)), 1);
  assert.strictEqual(timeMonday.count(local(2018,  0,  1), local(2018,  0,  9)), 1);
});

it("timeMonday.count(start, end) observes daylight saving", () => {
  assert.strictEqual(timeMonday.count(local(2011,  0,  1), local(2011,  2, 13,  1)), 10);
  assert.strictEqual(timeMonday.count(local(2011,  0,  1), local(2011,  2, 13,  3)), 10);
  assert.strictEqual(timeMonday.count(local(2011,  0,  1), local(2011,  2, 13,  4)), 10);
  assert.strictEqual(timeMonday.count(local(2011,  0,  1), local(2011, 10,  6,  0)), 44);
  assert.strictEqual(timeMonday.count(local(2011,  0,  1), local(2011, 10,  6,  1)), 44);
  assert.strictEqual(timeMonday.count(local(2011,  0,  1), local(2011, 10,  6,  2)), 44);
});
