import assert from "assert";
import {timeTuesday, timeTuesdays} from "../src/index.js";
import {local} from "./date.js";

it("timeTuesdays in an alias for timeTuesday.range", () => {
  assert.strictEqual(timeTuesdays, timeTuesday.range);
});

it("timeTuesday.floor(date) returns Tuesdays", () => {
  assert.deepStrictEqual(timeTuesday.floor(local(2011,  0,  2, 23, 59, 59)), local(2010, 11, 28));
  assert.deepStrictEqual(timeTuesday.floor(local(2011,  0,  3,  0,  0,  0)), local(2010, 11, 28));
  assert.deepStrictEqual(timeTuesday.floor(local(2011,  0,  3,  0,  0,  1)), local(2010, 11, 28));
  assert.deepStrictEqual(timeTuesday.floor(local(2011,  0,  3, 23, 59, 59)), local(2010, 11, 28));
  assert.deepStrictEqual(timeTuesday.floor(local(2011,  0,  4,  0,  0,  0)), local(2011,  0,  4));
  assert.deepStrictEqual(timeTuesday.floor(local(2011,  0,  4,  0,  0,  1)), local(2011,  0,  4));
});

it("timeTuesday.count(start, end) counts Tuesdays after start (exclusive) and before end (inclusive)", () => {
  //     January 2014
  // Su Mo Tu We Th Fr Sa
  //           1  2  3  4
  //  5  6  7  8  9 10 11
  // 12 13 14 15 16 17 18
  // 19 20 21 22 23 24 25
  // 26 27 28 29 30 31
  assert.strictEqual(timeTuesday.count(local(2014,  0,  1), local(2014,  0,  6)), 0);
  assert.strictEqual(timeTuesday.count(local(2014,  0,  1), local(2014,  0,  7)), 1);
  assert.strictEqual(timeTuesday.count(local(2014,  0,  1), local(2014,  0,  8)), 1);
  assert.strictEqual(timeTuesday.count(local(2014,  0,  1), local(2014,  0, 14)), 2);

  //     January 2013
  // Su Mo Tu We Th Fr Sa
  //        1  2  3  4  5
  //  6  7  8  9 10 11 12
  // 13 14 15 16 17 18 19
  // 20 21 22 23 24 25 26
  // 27 28 29 30 31
  assert.strictEqual(timeTuesday.count(local(2013,  0,  1), local(2013,  0,  7)), 0);
  assert.strictEqual(timeTuesday.count(local(2013,  0,  1), local(2013,  0,  8)), 1);
  assert.strictEqual(timeTuesday.count(local(2013,  0,  1), local(2013,  0,  9)), 1);
});

it("timeTuesday.count(start, end) observes daylight saving", () => {
  assert.strictEqual(timeTuesday.count(local(2011,  0,  1), local(2011,  2, 13,  1)), 10);
  assert.strictEqual(timeTuesday.count(local(2011,  0,  1), local(2011,  2, 13,  3)), 10);
  assert.strictEqual(timeTuesday.count(local(2011,  0,  1), local(2011,  2, 13,  4)), 10);
  assert.strictEqual(timeTuesday.count(local(2011,  0,  1), local(2011, 10,  6,  0)), 44);
  assert.strictEqual(timeTuesday.count(local(2011,  0,  1), local(2011, 10,  6,  1)), 44);
  assert.strictEqual(timeTuesday.count(local(2011,  0,  1), local(2011, 10,  6,  2)), 44);
});
