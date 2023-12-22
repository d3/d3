import assert from "assert";
import {timeDay, timeHour, timeInterval, timeMinute, timeSecond, timeYear} from "../src/index.js";
import {local, utc} from "./date.js";

it("timeInterval() is equivalent to timeInterval.floor(new Date)", () => {
  const t = new Date;
  assert.deepStrictEqual(timeYear(), timeYear.floor(t));
});

it("timeInterval(date) is equivalent to timeInterval.floor(date)", () => {
  const t = new Date;
  assert.deepStrictEqual(timeYear(t), timeYear.floor(t));
});

it("timeInterval(floor, offset) returns a custom time interval", () => {
  const i = timeInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setUTCHours(date.getUTCHours() + step);
  });
  assert.deepStrictEqual(i(utc(2015, 0, 1, 12, 34, 56, 789)), utc(2015, 0, 1, 12));
});

it("timeInterval(floor, offset) does not define a count method", () => {
  const i = timeInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setUTCHours(date.getUTCHours() + step);
  });
  assert(!("count" in i));
});

it("timeInterval(floor, offset) floors the step before passing it to offset", () => {
  const steps = [], i = timeInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    steps.push(+step), date.setUTCHours(date.getUTCHours() + step);
  });
  assert.deepStrictEqual(i.offset(utc(2015, 0, 1, 12, 34, 56, 789), 1.5), utc(2015, 0, 1, 13, 34, 56, 789));
  assert.deepStrictEqual(i.range(utc(2015, 0, 1, 12), utc(2015, 0, 1, 15), 1.5), [utc(2015, 0, 1, 12), utc(2015, 0, 1, 13), utc(2015, 0, 1, 14)]);
  assert(steps.every(function(step) { return step === 1; }));
});

it("timeInterval(floor, offset, count) defines a count method", () => {
  const i = timeInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setUTCHours(date.getUTCHours() + step);
  }, function(start, end) {
    return (end - start) / 36e5;
  });
  assert.strictEqual(i.count(utc(2015, 0, 1, 12, 34), utc(2015, 0, 1, 15, 56)), 3);
});

it("timeInterval(floor, offset, count) floors dates before passing them to count", () => {
  const dates = [], i = timeInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setUTCHours(date.getUTCHours() + step);
  }, function(start, end) {
    return dates.push(new Date(+start), new Date(+end)), (end - start) / 36e5;
  });
  i.count(utc(2015, 0, 1, 12, 34), utc(2015, 0, 1, 15, 56));
  assert.deepStrictEqual(dates, [utc(2015, 0, 1, 12), utc(2015, 0, 1, 15)]);
});

it("timeInterval.every(step) returns null if step is invalid", () => {
  assert.strictEqual(timeDay.every(), null);
  assert.strictEqual(timeMinute.every(null), null);
  assert.strictEqual(timeSecond.every(undefined), null);
  assert.strictEqual(timeDay.every(NaN), null);
  assert.strictEqual(timeMinute.every(0), null);
  assert.strictEqual(timeSecond.every(0.8), null);
  assert.strictEqual(timeHour.every(-1), null);
});

it("timeInterval.every(step) returns interval if step is one", () => {
  assert.strictEqual(timeDay.every("1"), timeDay);
  assert.strictEqual(timeMinute.every(1), timeMinute);
  assert.strictEqual(timeSecond.every(1.8), timeSecond);
});

it("timeInterval.every(step).range(invalid, invalid) returns the empty array", () => {
  assert.deepStrictEqual(timeMinute.every(15).range(NaN, NaN), []);
});

it("timeInterval.every(…).offset(date, step) returns the expected value when step is positive", () => {
  const i = timeMinute.every(15);
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 0), local(2015, 0, 1, 12, 34));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 1), local(2015, 0, 1, 12, 45));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 2), local(2015, 0, 1, 13,  0));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 3), local(2015, 0, 1, 13, 15));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 4), local(2015, 0, 1, 13, 30));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 5), local(2015, 0, 1, 13, 45));
});

it("timeInterval.every(…).offset(date, step) returns the expected value when step is negative", () => {
  const i = timeMinute.every(15);
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), -1), local(2015, 0, 1, 12, 30));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), -2), local(2015, 0, 1, 12, 15));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), -3), local(2015, 0, 1, 12,  0));
});

it("timeInterval.every(…).offset(date, step) returns the expected value when step is not an integer", () => {
  const i = timeMinute.every(15);
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), 1.2), local(2015, 0, 1, 12, 45));
  assert.deepStrictEqual(i.offset(local(2015, 0, 1, 12, 34), -0.8), local(2015, 0, 1, 12, 30));
});
