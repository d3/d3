import assert from "assert";
import {interpolateHsl} from "d3-interpolate";
import {timeDay, timeMinute, timeMonth, timeWeek, timeYear} from "d3-time";
import {scaleTime} from "../src/index.js";
import {local} from "./date.js";

it("time.domain([-1e50, 1e50]) is equivalent to time.domain([NaN, NaN])", () => {
  const x = scaleTime().domain([-1e50, 1e50]);
  assert.strictEqual(isNaN(x.domain()[0]), true); // Note: also coerced on retrieval, so insufficient test!
  assert.strictEqual(isNaN(x.domain()[1]), true);
  assert.deepStrictEqual(x.ticks(10), []);
});

it("time.domain(domain) accepts an iterable", () => {
  const x = scaleTime().domain(new Set([local(2009), local(2010)]));
  assert.deepStrictEqual(x.domain(), [local(2009), local(2010)]);
});

it("time.nice() is an alias for time.nice(10)", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 17), local(2009, 0, 1, 23, 42)]);
  assert.deepStrictEqual(x.nice().domain(), [local(2009, 0, 1), local(2009, 0, 2)]);
});

it("time.nice() can nice sub-second domains", () => {
  const x = scaleTime().domain([local(2013, 0, 1, 12, 0, 0, 0), local(2013, 0, 1, 12, 0, 0, 128)]);
  assert.deepStrictEqual(x.nice().domain(), [local(2013, 0, 1, 12, 0, 0, 0), local(2013, 0, 1, 12, 0, 0, 130)]);
});

it("time.nice() can nice multi-year domains", () => {
  const x = scaleTime().domain([local(2001, 0, 1), local(2138, 0, 1)]);
  assert.deepStrictEqual(x.nice().domain(), [local(2000, 0, 1), local(2140, 0, 1)]);
});

it("time.nice() can nice empty domains", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 12), local(2009, 0, 1, 0, 12)]);
  assert.deepStrictEqual(x.nice().domain(), [local(2009, 0, 1, 0, 12), local(2009, 0, 1, 0, 12)]);
});

it("time.nice(count) nices using the specified tick count", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 17), local(2009, 0, 1, 23, 42)]);
  assert.deepStrictEqual(x.nice(100).domain(), [local(2009, 0, 1, 0, 15), local(2009, 0, 1, 23, 45)]);
  assert.deepStrictEqual(x.nice(10).domain(), [local(2009, 0, 1), local(2009, 0, 2)]);
});

it("time.nice(interval) nices using the specified time interval", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 12), local(2009, 0, 1, 23, 48)]);
  assert.deepStrictEqual(x.nice(timeDay).domain(), [local(2009, 0, 1), local(2009, 0, 2)]);
  assert.deepStrictEqual(x.nice(timeWeek).domain(), [local(2008, 11, 28), local(2009, 0, 4)]);
  assert.deepStrictEqual(x.nice(timeMonth).domain(), [local(2008, 11, 1), local(2009, 1, 1)]);
  assert.deepStrictEqual(x.nice(timeYear).domain(), [local(2008, 0, 1), local(2010, 0, 1)]);
});

it("time.nice(interval) can nice empty domains", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 12), local(2009, 0, 1, 0, 12)]);
  assert.deepStrictEqual(x.nice(timeDay).domain(), [local(2009, 0, 1), local(2009, 0, 2)]);
});

it("time.nice(interval) can nice a polylinear domain, only affecting its extent", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 12), local(2009, 0, 1, 23, 48), local(2009, 0, 2, 23, 48)]).nice(timeDay);
  assert.deepStrictEqual(x.domain(), [local(2009, 0, 1), local(2009, 0, 1, 23, 48), local(2009, 0, 3)]);
});

it("time.nice(interval.every(step)) nices using the specified time interval and step", () => {
  const x = scaleTime().domain([local(2009, 0, 1, 0, 12), local(2009, 0, 1, 23, 48)]);
  assert.deepStrictEqual(x.nice(timeDay.every(3)).domain(), [local(2009, 0, 1), local(2009, 0, 4)]);
  assert.deepStrictEqual(x.nice(timeWeek.every(2)).domain(), [local(2008, 11, 21), local(2009, 0, 4)]);
  assert.deepStrictEqual(x.nice(timeMonth.every(3)).domain(), [local(2008, 9, 1), local(2009, 3, 1)]);
  assert.deepStrictEqual(x.nice(timeYear.every(10)).domain(), [local(2000, 0, 1), local(2010, 0, 1)]);
});

it("time.copy() isolates changes to the domain", () => {
  const x = scaleTime().domain([local(2009, 0, 1), local(2010, 0, 1)]), y = x.copy();
  x.domain([local(2010, 0, 1), local(2011, 0, 1)]);
  assert.deepStrictEqual(y.domain(), [local(2009, 0, 1), local(2010, 0, 1)]);
  assert.strictEqual(x(local(2010, 0, 1)), 0);
  assert.strictEqual(y(local(2010, 0, 1)), 1);
  y.domain([local(2011, 0, 1), local(2012, 0, 1)]);
  assert.strictEqual(x(local(2011, 0, 1)), 1);
  assert.strictEqual(y(local(2011, 0, 1)), 0);
  assert.deepStrictEqual(x.domain(), [local(2010, 0, 1), local(2011, 0, 1)]);
  assert.deepStrictEqual(y.domain(), [local(2011, 0, 1), local(2012, 0, 1)]);
});

it("time.copy() isolates changes to the range", () => {
  const x = scaleTime().domain([local(2009, 0, 1), local(2010, 0, 1)]), y = x.copy();
  x.range([1, 2]);
  assert.deepStrictEqual(x.invert(1), local(2009, 0, 1));
  assert.deepStrictEqual(y.invert(1), local(2010, 0, 1));
  assert.deepStrictEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  assert.deepStrictEqual(x.invert(2), local(2010, 0, 1));
  assert.deepStrictEqual(y.invert(2), local(2009, 0, 1));
  assert.deepStrictEqual(x.range(), [1, 2]);
  assert.deepStrictEqual(y.range(), [2, 3]);
});

it("time.copy() isolates changes to the interpolator", () => {
  const x = scaleTime().domain([local(2009, 0, 1), local(2010, 0, 1)]).range(["red", "blue"]),
      i = x.interpolate(),
      y = x.copy();
  x.interpolate(interpolateHsl);
  assert.strictEqual(x(local(2009, 6, 1)), "rgb(255, 0, 253)");
  assert.strictEqual(y(local(2009, 6, 1)), "rgb(129, 0, 126)");
  assert.strictEqual(y.interpolate(), i);
});

it("time.copy() isolates changes to clamping", () => {
  const x = scaleTime().domain([local(2009, 0, 1), local(2010, 0, 1)]).clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(local(2011, 0, 1)), 2);
  assert.strictEqual(y(local(2011, 0, 1)), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(local(2011, 0, 1)), 2);
  assert.strictEqual(y(local(2011, 0, 1)), 2);
  assert.strictEqual(x.clamp(), false);
});

it("time.clamp(true).invert(value) never returns a value outside the domain", () => {
  const x = scaleTime().clamp(true);
  assert(x.invert(0) instanceof Date);
  assert(x.invert(0) !== x.invert(0)); // returns a distinct copy
  assert.strictEqual(+x.invert(-1), +x.domain()[0]);
  assert.strictEqual(+x.invert(0), +x.domain()[0]);
  assert.strictEqual(+x.invert(1), +x.domain()[1]);
  assert.strictEqual(+x.invert(2), +x.domain()[1]);
});

it("time.ticks(interval) observes the specified tick interval", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 1, 0), local(2011, 0, 1, 12, 4, 4)]);
  assert.deepStrictEqual(x.ticks(timeMinute), [
    local(2011, 0, 1, 12, 1),
    local(2011, 0, 1, 12, 2),
    local(2011, 0, 1, 12, 3),
    local(2011, 0, 1, 12, 4)
  ]);
});

it("time.ticks(interval.every(step)) observes the specified tick interval and step", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 33, 4)]);
  assert.deepStrictEqual(x.ticks(timeMinute.every(10)), [
    local(2011, 0, 1, 12, 0),
    local(2011, 0, 1, 12, 10),
    local(2011, 0, 1, 12, 20),
    local(2011, 0, 1, 12, 30)
  ]);
});

it("time.ticks(count) can generate sub-second ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 1)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 0, 0,   0),
    local(2011, 0, 1, 12, 0, 0, 200),
    local(2011, 0, 1, 12, 0, 0, 400),
    local(2011, 0, 1, 12, 0, 0, 600),
    local(2011, 0, 1, 12, 0, 0, 800),
    local(2011, 0, 1, 12, 0, 1,   0)
  ]);
});

it("time.ticks(count) can generate 1-second ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 4)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 1),
    local(2011, 0, 1, 12, 0, 2),
    local(2011, 0, 1, 12, 0, 3),
    local(2011, 0, 1, 12, 0, 4)
  ]);
});

it("time.ticks(count) can generate 5-second ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 20)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 5),
    local(2011, 0, 1, 12, 0, 10),
    local(2011, 0, 1, 12, 0, 15),
    local(2011, 0, 1, 12, 0, 20)
  ]);
});

it("time.ticks(count) can generate 15-second ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 0, 50)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 15),
    local(2011, 0, 1, 12, 0, 30),
    local(2011, 0, 1, 12, 0, 45)
  ]);
});

it("time.ticks(count) can generate 30-second ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 0), local(2011, 0, 1, 12, 1, 50)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 0, 0),
    local(2011, 0, 1, 12, 0, 30),
    local(2011, 0, 1, 12, 1, 0),
    local(2011, 0, 1, 12, 1, 30)
  ]);
});

it("time.ticks(count) can generate 1-minute ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 0, 27), local(2011, 0, 1, 12, 4, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 1),
    local(2011, 0, 1, 12, 2),
    local(2011, 0, 1, 12, 3),
    local(2011, 0, 1, 12, 4)
  ]);
});

it("time.ticks(count) can generate 5-minute ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 3, 27), local(2011, 0, 1, 12, 21, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 5),
    local(2011, 0, 1, 12, 10),
    local(2011, 0, 1, 12, 15),
    local(2011, 0, 1, 12, 20)
  ]);
});

it("time.ticks(count) can generate 15-minute ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 8, 27), local(2011, 0, 1, 13, 4, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 15),
    local(2011, 0, 1, 12, 30),
    local(2011, 0, 1, 12, 45),
    local(2011, 0, 1, 13, 0)
  ]);
});

it("time.ticks(count) can generate 30-minute ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 28, 27), local(2011, 0, 1, 14, 4, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 12, 30),
    local(2011, 0, 1, 13, 0),
    local(2011, 0, 1, 13, 30),
    local(2011, 0, 1, 14, 0)
  ]);
});

it("time.ticks(count) can generate 1-hour ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 12, 28, 27), local(2011, 0, 1, 16, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 13, 0),
    local(2011, 0, 1, 14, 0),
    local(2011, 0, 1, 15, 0),
    local(2011, 0, 1, 16, 0)
  ]);
});

it("time.ticks(count) can generate 3-hour ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 14, 28, 27), local(2011, 0, 2, 1, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 15, 0),
    local(2011, 0, 1, 18, 0),
    local(2011, 0, 1, 21, 0),
    local(2011, 0, 2, 0, 0)
  ]);
});

it("time.ticks(count) can generate 6-hour ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 16, 28, 27), local(2011, 0, 2, 14, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 18, 0),
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 2, 6, 0),
    local(2011, 0, 2, 12, 0)
  ]);
});

it("time.ticks(count) can generate 12-hour ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 16, 28, 27), local(2011, 0, 3, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 2, 12, 0),
    local(2011, 0, 3, 0, 0),
    local(2011, 0, 3, 12, 0)
  ]);
});

it("time.ticks(count) can generate 1-day ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 16, 28, 27), local(2011, 0, 5, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 3, 0, 0),
    local(2011, 0, 4, 0, 0),
    local(2011, 0, 5, 0, 0)
  ]);
});

it("time.ticks(count) can generate 2-day ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 2, 16, 28, 27), local(2011, 0, 9, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 3, 0, 0),
    local(2011, 0, 5, 0, 0),
    local(2011, 0, 7, 0, 0),
    local(2011, 0, 9, 0, 0)
  ]);
});

it("time.ticks(count) can generate 1-week ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 1, 16, 28, 27), local(2011, 0, 23, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 2, 0, 0),
    local(2011, 0, 9, 0, 0),
    local(2011, 0, 16, 0, 0),
    local(2011, 0, 23, 0, 0)
  ]);
});

it("time.ticks(count) can generate 1-month ticks", () => {
  const x = scaleTime().domain([local(2011, 0, 18), local(2011, 4, 2)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 1, 1, 0, 0),
    local(2011, 2, 1, 0, 0),
    local(2011, 3, 1, 0, 0),
    local(2011, 4, 1, 0, 0)
  ]);
});

it("time.ticks(count) can generate 3-month ticks", () => {
  const x = scaleTime().domain([local(2010, 11, 18), local(2011, 10, 2)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 0, 0),
    local(2011, 3, 1, 0, 0),
    local(2011, 6, 1, 0, 0),
    local(2011, 9, 1, 0, 0)
  ]);
});

it("time.ticks(count) can generate 1-year ticks", () => {
  const x = scaleTime().domain([local(2010, 11, 18), local(2014, 2, 2)]);
  assert.deepStrictEqual(x.ticks(4), [
    local(2011, 0, 1, 0, 0),
    local(2012, 0, 1, 0, 0),
    local(2013, 0, 1, 0, 0),
    local(2014, 0, 1, 0, 0)
  ]);
});

it("time.ticks(count) can generate multi-year ticks", () => {
  const x = scaleTime().domain([local(0, 11, 18), local(2014, 2, 2)]);
  assert.deepStrictEqual(x.ticks(6), [
    local( 500, 0, 1, 0, 0),
    local(1000, 0, 1, 0, 0),
    local(1500, 0, 1, 0, 0),
    local(2000, 0, 1, 0, 0)
  ]);
});

it("time.ticks(count) returns one tick for an empty domain", () => {
  const x = scaleTime().domain([local(2014, 2, 2), local(2014, 2, 2)]);
  assert.deepStrictEqual(x.ticks(6), [local(2014, 2, 2)]);
});

it("time.ticks() returns descending ticks for a descending domain", () => {
  const x = scaleTime();
  assert.deepStrictEqual(x.domain([local(2014, 2, 2), local(2010, 11, 18)]).ticks(4), [local(2014, 0, 1, 0, 0), local(2013, 0, 1, 0, 0), local(2012, 0, 1, 0, 0), local(2011, 0, 1, 0, 0)]);
  assert.deepStrictEqual(x.domain([local(2011, 10, 2), local(2010, 11, 18)]).ticks(4), [local(2011, 9, 1, 0, 0), local(2011, 6, 1, 0, 0), local(2011, 3, 1, 0, 0), local(2011, 0, 1, 0, 0)]);
});

it("time.tickFormat()(date) formats year on New Year's", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 0, 1)), "2011");
  assert.strictEqual(f(local(2012, 0, 1)), "2012");
  assert.strictEqual(f(local(2013, 0, 1)), "2013");
});

it("time.tickFormat()(date) formats month on the 1st of each month", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 1, 1)), "February");
  assert.strictEqual(f(local(2011, 2, 1)), "March");
  assert.strictEqual(f(local(2011, 3, 1)), "April");
});

it("time.tickFormat()(date) formats week on Sunday midnight", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 1, 6)), "Feb 06");
  assert.strictEqual(f(local(2011, 1, 13)), "Feb 13");
  assert.strictEqual(f(local(2011, 1, 20)), "Feb 20");
});

it("time.tickFormat()(date) formats date on midnight", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 1, 2)), "Wed 02");
  assert.strictEqual(f(local(2011, 1, 3)), "Thu 03");
  assert.strictEqual(f(local(2011, 1, 4)), "Fri 04");
});

it("time.tickFormat()(date) formats hour on minute zero", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 1, 2, 11)), "11 AM");
  assert.strictEqual(f(local(2011, 1, 2, 12)), "12 PM");
  assert.strictEqual(f(local(2011, 1, 2, 13)), "01 PM");
});

it("time.tickFormat()(date) formats minute on second zero", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 1, 2, 11, 59)), "11:59");
  assert.strictEqual(f(local(2011, 1, 2, 12,  1)), "12:01");
  assert.strictEqual(f(local(2011, 1, 2, 12,  2)), "12:02");
});

it("time.tickFormat()(date) otherwise, formats second", () => {
  const f = scaleTime().tickFormat();
  assert.strictEqual(f(local(2011, 1, 2, 12,  1,  9)), ":09");
  assert.strictEqual(f(local(2011, 1, 2, 12,  1, 10)), ":10");
  assert.strictEqual(f(local(2011, 1, 2, 12,  1, 11)), ":11");
});

it("time.tickFormat(count, specifier) returns a time format for the specified specifier", () => {
  const f = scaleTime().tickFormat(10, "%c");
  assert.strictEqual(f(local(2011, 1, 2, 12)), "2/2/2011, 12:00:00 PM");
});
