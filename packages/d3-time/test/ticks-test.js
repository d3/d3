import assert from "assert";
import {timeMinute, timeTicks} from "../src/index.js";
import {local} from "./date.js";

it("timeTicks(start, stop, interval) respects the specified interval", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 1, 0), local(2011, 0, 1, 12, 4, 4), timeMinute), [
    local(2011, 0, 1, 12, 1),
    local(2011, 0, 1, 12, 2),
    local(2011, 0, 1, 12, 3),
    local(2011, 0, 1, 12, 4)
  ]);
});

it("timeTicks(start, stop, interval) returns the empty array for invalid intervals", () => {
  assert.deepStrictEqual(timeTicks(NaN, NaN, 10), []);
});

it("timeTicks(start, stop, interval.every(step)) observes the specified tick interval and step", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 33, 4), timeMinute.every(10)), [
    local(2011, 0, 1, 12, 0),
    local(2011, 0, 1, 12, 10),
    local(2011, 0, 1, 12, 20),
    local(2011, 0, 1, 12, 30)
  ]);
});

it("timeTicks(start, stop, count) can generate sub-second ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 1), 4), [
    local(2011, 0, 1, 12, 0, 0,   0),
    local(2011, 0, 1, 12, 0, 0, 200),
    local(2011, 0, 1, 12, 0, 0, 400),
    local(2011, 0, 1, 12, 0, 0, 600),
    local(2011, 0, 1, 12, 0, 0, 800),
    local(2011, 0, 1, 12, 0, 1,   0)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-second ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 4), 4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 1),
    local(2011, 0, 1, 12, 0, 2),
    local(2011, 0, 1, 12, 0, 3),
    local(2011, 0, 1, 12, 0, 4)
  ]);
});

it("timeTicks(start, stop, count) can generate 5-second ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 20), 4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 5),
    local(2011, 0, 1, 12, 0, 10),
    local(2011, 0, 1, 12, 0, 15),
    local(2011, 0, 1, 12, 0, 20)
  ]);
});

it("timeTicks(start, stop, count) can generate 15-second ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 50), 4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 15),
    local(2011, 0, 1, 12, 0, 30),
    local(2011, 0, 1, 12, 0, 45)
  ]);
});

it("timeTicks(start, stop, count) can generate 30-second ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 1, 50), 4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 30),
    local(2011, 0, 1, 12, 1, 0),
    local(2011, 0, 1, 12, 1, 30)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-minute ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 0, 27), local(2011, 0, 1, 12, 4, 12), 4), [
    local(2011, 0, 1, 12, 1),
    local(2011, 0, 1, 12, 2),
    local(2011, 0, 1, 12, 3),
    local(2011, 0, 1, 12, 4)
  ]);
});

it("timeTicks(start, stop, count) can generate 5-minute ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 3, 27), local(2011, 0, 1, 12, 21, 12), 4), [
    local(2011, 0, 1, 12, 5),
    local(2011, 0, 1, 12, 10),
    local(2011, 0, 1, 12, 15),
    local(2011, 0, 1, 12, 20)
  ]);
});

it("timeTicks(start, stop, count) can generate 15-minute ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 8, 27), local(2011, 0, 1, 13, 4, 12), 4), [
    local(2011, 0, 1, 12, 15),
    local(2011, 0, 1, 12, 30),
    local(2011, 0, 1, 12, 45),
    local(2011, 0, 1, 13, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 30-minute ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 28, 27), local(2011, 0, 1, 14, 4, 12), 4), [
    local(2011, 0, 1, 12, 30),
    local(2011, 0, 1, 13, 0),
    local(2011, 0, 1, 13, 30),
    local(2011, 0, 1, 14, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-hour ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 12, 28, 27), local(2011, 0, 1, 16, 34, 12), 4), [
    local(2011, 0, 1, 13, 0),
    local(2011, 0, 1, 14, 0),
    local(2011, 0, 1, 15, 0),
    local(2011, 0, 1, 16, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 3-hour ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 14, 28, 27), local(2011, 0, 2, 1, 34, 12), 4), [
    local(2011, 0, 1, 15, 0),
    local(2011, 0, 1, 18, 0),
    local(2011, 0, 1, 21, 0),
    local(2011, 0, 2, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 6-hour ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 16, 28, 27), local(2011, 0, 2, 14, 34, 12), 4), [
    local(2011, 0, 1, 18, 0),
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 2, 6, 0),
    local(2011, 0, 2, 12, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 12-hour ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 16, 28, 27), local(2011, 0, 3, 21, 34, 12), 4), [
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 2, 12, 0),
    local(2011, 0, 3, 0, 0),
    local(2011, 0, 3, 12, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-day ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 16, 28, 27), local(2011, 0, 5, 21, 34, 12), 4), [
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 3, 0, 0),
    local(2011, 0, 4, 0, 0),
    local(2011, 0, 5, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 2-day ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 2, 16, 28, 27), local(2011, 0, 9, 21, 34, 12), 4), [
    local(2011, 0, 3, 0, 0),
    local(2011, 0, 5, 0, 0),
    local(2011, 0, 7, 0, 0),
    local(2011, 0, 9, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-week ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 1, 16, 28, 27), local(2011, 0, 23, 21, 34, 12), 4), [
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 9, 0, 0),
    local(2011, 0, 16, 0, 0),
    local(2011, 0, 23, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-month ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2011, 0, 18), local(2011, 4, 2), 4), [
    local(2011, 1, 1, 0, 0),
    local(2011, 2, 1, 0, 0),
    local(2011, 3, 1, 0, 0),
    local(2011, 4, 1, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 3-month ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2010, 11, 18), local(2011, 10, 2), 4), [
    local(2011, 0, 1, 0, 0),
    local(2011, 3, 1, 0, 0),
    local(2011, 6, 1, 0, 0),
    local(2011, 9, 1, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate 1-year ticks", () => {
  assert.deepStrictEqual(timeTicks(local(2010, 11, 18), local(2014, 2, 2), 4), [
    local(2011, 0, 1, 0, 0),
    local(2012, 0, 1, 0, 0),
    local(2013, 0, 1, 0, 0),
    local(2014, 0, 1, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) can generate multi-year ticks", () => {
  assert.deepStrictEqual(timeTicks(local(0, 11, 18), local(2014, 2, 2), 6), [
    local( 500, 0, 1, 0, 0),
    local(1000, 0, 1, 0, 0),
    local(1500, 0, 1, 0, 0),
    local(2000, 0, 1, 0, 0)
  ]);
});

it("timeTicks(start, stop, count) returns one tick for an empty domain", () => {
  assert.deepStrictEqual(timeTicks(local(2014, 2, 2), local(2014, 2, 2), 6), [local(2014, 2, 2)]);
});

it("timeTicks(start, stop, count) returns descending ticks for a descending domain", () => {
  assert.deepStrictEqual(timeTicks(local(2014, 2, 2), local(2010, 11, 18), 4), [local(2014, 0, 1, 0, 0), local(2013, 0, 1, 0, 0), local(2012, 0, 1, 0, 0), local(2011, 0, 1, 0, 0)]);
  assert.deepStrictEqual(timeTicks(local(2011, 10, 2), local(2010, 11, 18), 4), [local(2011, 9, 1, 0, 0), local(2011, 6, 1, 0, 0), local(2011, 3, 1, 0, 0), local(2011, 0, 1, 0, 0)]);
});
