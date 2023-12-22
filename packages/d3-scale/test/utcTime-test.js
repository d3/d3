import assert from "assert";
import {interpolateHsl} from "d3-interpolate";
import {utcDay, utcMinute, utcMonth, utcWeek, utcYear} from "d3-time";
import {scaleUtc} from "../src/index.js";
import {utc} from "./date.js";

it("scaleUtc.nice() is an alias for scaleUtc.nice(10)", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 17), utc(2009, 0, 1, 23, 42)]);
  assert.deepStrictEqual(x.nice().domain(), [utc(2009, 0, 1), utc(2009, 0, 2)]);
});

it("scaleUtc.nice() can nice sub-second domains", () => {
  const x = scaleUtc().domain([utc(2013, 0, 1, 12, 0, 0, 0), utc(2013, 0, 1, 12, 0, 0, 128)]);
  assert.deepStrictEqual(x.nice().domain(), [utc(2013, 0, 1, 12, 0, 0, 0), utc(2013, 0, 1, 12, 0, 0, 130)]);
});

it("scaleUtc.nice() can nice multi-year domains", () => {
  const x = scaleUtc().domain([utc(2001, 0, 1), utc(2138, 0, 1)]);
  assert.deepStrictEqual(x.nice().domain(), [utc(2000, 0, 1), utc(2140, 0, 1)]);
});

it("scaleUtc.nice() can nice empty domains", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 12), utc(2009, 0, 1, 0, 12)]);
  assert.deepStrictEqual(x.nice().domain(), [utc(2009, 0, 1, 0, 12), utc(2009, 0, 1, 0, 12)]);
});

it("scaleUtc.nice(count) nices using the specified tick count", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 17), utc(2009, 0, 1, 23, 42)]);
  assert.deepStrictEqual(x.nice(100).domain(), [utc(2009, 0, 1, 0, 15), utc(2009, 0, 1, 23, 45)]);
  assert.deepStrictEqual(x.nice(10).domain(), [utc(2009, 0, 1), utc(2009, 0, 2)]);
});

it("scaleUtc.nice(interval) nices using the specified time interval", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 12), utc(2009, 0, 1, 23, 48)]);
  assert.deepStrictEqual(x.nice(utcDay).domain(), [utc(2009, 0, 1), utc(2009, 0, 2)]);
  assert.deepStrictEqual(x.nice(utcWeek).domain(), [utc(2008, 11, 28), utc(2009, 0, 4)]);
  assert.deepStrictEqual(x.nice(utcMonth).domain(), [utc(2008, 11, 1), utc(2009, 1, 1)]);
  assert.deepStrictEqual(x.nice(utcYear).domain(), [utc(2008, 0, 1), utc(2010, 0, 1)]);
});

it("scaleUtc.nice(interval) can nice empty domains", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 12), utc(2009, 0, 1, 0, 12)]);
  assert.deepStrictEqual(x.nice(utcDay).domain(), [utc(2009, 0, 1), utc(2009, 0, 2)]);
});

it("scaleUtc.nice(interval) can nice a polylinear domain, only affecting its extent", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 12), utc(2009, 0, 1, 23, 48), utc(2009, 0, 2, 23, 48)]).nice(utcDay);
  assert.deepStrictEqual(x.domain(), [utc(2009, 0, 1), utc(2009, 0, 1, 23, 48), utc(2009, 0, 3)]);
});

it("scaleUtc.nice(interval.every(step)) nices using the specified time interval and step", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1, 0, 12), utc(2009, 0, 1, 23, 48)]);
  assert.deepStrictEqual(x.nice(utcDay.every(3)).domain(), [utc(2009, 0, 1), utc(2009, 0, 4)]);
  assert.deepStrictEqual(x.nice(utcWeek.every(2)).domain(), [utc(2008, 11, 21), utc(2009, 0, 4)]);
  assert.deepStrictEqual(x.nice(utcMonth.every(3)).domain(), [utc(2008, 9, 1), utc(2009, 3, 1)]);
  assert.deepStrictEqual(x.nice(utcYear.every(10)).domain(), [utc(2000, 0, 1), utc(2010, 0, 1)]);
});

it("scaleUtc.copy() isolates changes to the domain", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1), utc(2010, 0, 1)]), y = x.copy();
  x.domain([utc(2010, 0, 1), utc(2011, 0, 1)]);
  assert.deepStrictEqual(y.domain(), [utc(2009, 0, 1), utc(2010, 0, 1)]);
  assert.strictEqual(x(utc(2010, 0, 1)), 0);
  assert.strictEqual(y(utc(2010, 0, 1)), 1);
  y.domain([utc(2011, 0, 1), utc(2012, 0, 1)]);
  assert.strictEqual(x(utc(2011, 0, 1)), 1);
  assert.strictEqual(y(utc(2011, 0, 1)), 0);
  assert.deepStrictEqual(x.domain(), [utc(2010, 0, 1), utc(2011, 0, 1)]);
  assert.deepStrictEqual(y.domain(), [utc(2011, 0, 1), utc(2012, 0, 1)]);
});

it("scaleUtc.copy() isolates changes to the range", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1), utc(2010, 0, 1)]), y = x.copy();
  x.range([1, 2]);
  assert.deepStrictEqual(x.invert(1), utc(2009, 0, 1));
  assert.deepStrictEqual(y.invert(1), utc(2010, 0, 1));
  assert.deepStrictEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  assert.deepStrictEqual(x.invert(2), utc(2010, 0, 1));
  assert.deepStrictEqual(y.invert(2), utc(2009, 0, 1));
  assert.deepStrictEqual(x.range(), [1, 2]);
  assert.deepStrictEqual(y.range(), [2, 3]);
});

it("scaleUtc.copy() isolates changes to the interpolator", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1), utc(2010, 0, 1)]).range(["red", "blue"]);
  const i = x.interpolate();
  const y = x.copy();
  x.interpolate(interpolateHsl);
  assert.strictEqual(x(utc(2009, 6, 1)), "rgb(255, 0, 253)");
  assert.strictEqual(y(utc(2009, 6, 1)), "rgb(129, 0, 126)");
  assert.strictEqual(y.interpolate(), i);
});

it("scaleUtc.copy() isolates changes to clamping", () => {
  const x = scaleUtc().domain([utc(2009, 0, 1), utc(2010, 0, 1)]).clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(utc(2011, 0, 1)), 2);
  assert.strictEqual(y(utc(2011, 0, 1)), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(utc(2011, 0, 1)), 2);
  assert.strictEqual(y(utc(2011, 0, 1)), 2);
  assert.strictEqual(x.clamp(), false);
});

it("scaleUtc.ticks(interval) observes the specified tick interval", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 1, 0), utc(2011, 0, 1, 12, 4, 4)]);
  assert.deepStrictEqual(x.ticks(utcMinute), [
    utc(2011, 0, 1, 12, 1),
    utc(2011, 0, 1, 12, 2),
    utc(2011, 0, 1, 12, 3),
    utc(2011, 0, 1, 12, 4)
  ]);
});

it("scaleUtc.ticks(interval) observes the specified named tick interval", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 1, 0), utc(2011, 0, 1, 12, 4, 4)]);
  assert.deepStrictEqual(x.ticks(utcMinute), [
    utc(2011, 0, 1, 12, 1),
    utc(2011, 0, 1, 12, 2),
    utc(2011, 0, 1, 12, 3),
    utc(2011, 0, 1, 12, 4)
  ]);
});

it("scaleUtc.ticks(interval.every(step)) observes the specified tick interval and step", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 0), utc(2011, 0, 1, 12, 33, 4)]);
  assert.deepStrictEqual(x.ticks(utcMinute.every(10)), [
    utc(2011, 0, 1, 12, 0),
    utc(2011, 0, 1, 12, 10),
    utc(2011, 0, 1, 12, 20),
    utc(2011, 0, 1, 12, 30)
  ]);
});

it("scaleUtc.ticks(count) can generate sub-second ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 0), utc(2011, 0, 1, 12, 0, 1)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 0, 0,   0),
    utc(2011, 0, 1, 12, 0, 0, 200),
    utc(2011, 0, 1, 12, 0, 0, 400),
    utc(2011, 0, 1, 12, 0, 0, 600),
    utc(2011, 0, 1, 12, 0, 0, 800),
    utc(2011, 0, 1, 12, 0, 1,   0)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-second ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 0), utc(2011, 0, 1, 12, 0, 4)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 0, 0),
    utc(2011, 0, 1, 12, 0, 1),
    utc(2011, 0, 1, 12, 0, 2),
    utc(2011, 0, 1, 12, 0, 3),
    utc(2011, 0, 1, 12, 0, 4)
  ]);
});

it("scaleUtc.ticks(count) can generate 5-second ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 0), utc(2011, 0, 1, 12, 0, 20)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 0, 0),
    utc(2011, 0, 1, 12, 0, 5),
    utc(2011, 0, 1, 12, 0, 10),
    utc(2011, 0, 1, 12, 0, 15),
    utc(2011, 0, 1, 12, 0, 20)
  ]);
});

it("scaleUtc.ticks(count) can generate 15-second ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 0), utc(2011, 0, 1, 12, 0, 50)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 0, 0),
    utc(2011, 0, 1, 12, 0, 15),
    utc(2011, 0, 1, 12, 0, 30),
    utc(2011, 0, 1, 12, 0, 45)
  ]);
});

it("scaleUtc.ticks(count) can generate 30-second ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 0), utc(2011, 0, 1, 12, 1, 50)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 0, 0),
    utc(2011, 0, 1, 12, 0, 30),
    utc(2011, 0, 1, 12, 1, 0),
    utc(2011, 0, 1, 12, 1, 30)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-minute ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 0, 27), utc(2011, 0, 1, 12, 4, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 1),
    utc(2011, 0, 1, 12, 2),
    utc(2011, 0, 1, 12, 3),
    utc(2011, 0, 1, 12, 4)
  ]);
});

it("scaleUtc.ticks(count) can generate 5-minute ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 3, 27), utc(2011, 0, 1, 12, 21, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 5),
    utc(2011, 0, 1, 12, 10),
    utc(2011, 0, 1, 12, 15),
    utc(2011, 0, 1, 12, 20)
  ]);
});

it("scaleUtc.ticks(count) can generate 15-minute ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 8, 27), utc(2011, 0, 1, 13, 4, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 15),
    utc(2011, 0, 1, 12, 30),
    utc(2011, 0, 1, 12, 45),
    utc(2011, 0, 1, 13, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 30-minute ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 28, 27), utc(2011, 0, 1, 14, 4, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 12, 30),
    utc(2011, 0, 1, 13, 0),
    utc(2011, 0, 1, 13, 30),
    utc(2011, 0, 1, 14, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-hour ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 12, 28, 27), utc(2011, 0, 1, 16, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 13, 0),
    utc(2011, 0, 1, 14, 0),
    utc(2011, 0, 1, 15, 0),
    utc(2011, 0, 1, 16, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 3-hour ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 14, 28, 27), utc(2011, 0, 2, 1, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 15, 0),
    utc(2011, 0, 1, 18, 0),
    utc(2011, 0, 1, 21, 0),
    utc(2011, 0, 2, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 6-hour ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 16, 28, 27), utc(2011, 0, 2, 14, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 18, 0),
    utc(2011, 0, 2, 0, 0),
    utc(2011, 0, 2, 6, 0),
    utc(2011, 0, 2, 12, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 12-hour ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 16, 28, 27), utc(2011, 0, 3, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 2, 0, 0),
    utc(2011, 0, 2, 12, 0),
    utc(2011, 0, 3, 0, 0),
    utc(2011, 0, 3, 12, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-day ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 16, 28, 27), utc(2011, 0, 5, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 2, 0, 0),
    utc(2011, 0, 3, 0, 0),
    utc(2011, 0, 4, 0, 0),
    utc(2011, 0, 5, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 2-day ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 2, 16, 28, 27), utc(2011, 0, 9, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 3, 0, 0),
    utc(2011, 0, 5, 0, 0),
    utc(2011, 0, 7, 0, 0),
    utc(2011, 0, 9, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-week ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 1, 16, 28, 27), utc(2011, 0, 23, 21, 34, 12)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 2, 0, 0),
    utc(2011, 0, 9, 0, 0),
    utc(2011, 0, 16, 0, 0),
    utc(2011, 0, 23, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-month ticks", () => {
  const x = scaleUtc().domain([utc(2011, 0, 18), utc(2011, 4, 2)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 1, 1, 0, 0),
    utc(2011, 2, 1, 0, 0),
    utc(2011, 3, 1, 0, 0),
    utc(2011, 4, 1, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 3-month ticks", () => {
  const x = scaleUtc().domain([utc(2010, 11, 18), utc(2011, 10, 2)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 0, 0),
    utc(2011, 3, 1, 0, 0),
    utc(2011, 6, 1, 0, 0),
    utc(2011, 9, 1, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate 1-year ticks", () => {
  const x = scaleUtc().domain([utc(2010, 11, 18), utc(2014, 2, 2)]);
  assert.deepStrictEqual(x.ticks(4), [
    utc(2011, 0, 1, 0, 0),
    utc(2012, 0, 1, 0, 0),
    utc(2013, 0, 1, 0, 0),
    utc(2014, 0, 1, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) can generate multi-year ticks", () => {
  const x = scaleUtc().domain([utc(0, 11, 18), utc(2014, 2, 2)]);
  assert.deepStrictEqual(x.ticks(6), [
    utc( 500, 0, 1, 0, 0),
    utc(1000, 0, 1, 0, 0),
    utc(1500, 0, 1, 0, 0),
    utc(2000, 0, 1, 0, 0)
  ]);
});

it("scaleUtc.ticks(count) returns one tick for an empty domain", () => {
  const x = scaleUtc().domain([utc(2014, 2, 2), utc(2014, 2, 2)]);
  assert.deepStrictEqual(x.ticks(6), [utc(2014, 2, 2)]);
});

it("scaleUtc.tickFormat()(date) formats year on New Year's", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 0, 1)), "2011");
  assert.strictEqual(f(utc(2012, 0, 1)), "2012");
  assert.strictEqual(f(utc(2013, 0, 1)), "2013");
});

it("scaleUtc.tickFormat()(date) formats month on the 1st of each month", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 1, 1)), "February");
  assert.strictEqual(f(utc(2011, 2, 1)), "March");
  assert.strictEqual(f(utc(2011, 3, 1)), "April");
});

it("scaleUtc.tickFormat()(date) formats week on Sunday midnight", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 1, 6)), "Feb 06");
  assert.strictEqual(f(utc(2011, 1, 13)), "Feb 13");
  assert.strictEqual(f(utc(2011, 1, 20)), "Feb 20");
});

it("scaleUtc.tickFormat()(date) formats date on midnight", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 1, 2)), "Wed 02");
  assert.strictEqual(f(utc(2011, 1, 3)), "Thu 03");
  assert.strictEqual(f(utc(2011, 1, 4)), "Fri 04");
});

it("scaleUtc.tickFormat()(date) formats hour on minute zero", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 1, 2, 11)), "11 AM");
  assert.strictEqual(f(utc(2011, 1, 2, 12)), "12 PM");
  assert.strictEqual(f(utc(2011, 1, 2, 13)), "01 PM");
});

it("scaleUtc.tickFormat()(date) formats minute on second zero", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 1, 2, 11, 59)), "11:59");
  assert.strictEqual(f(utc(2011, 1, 2, 12,  1)), "12:01");
  assert.strictEqual(f(utc(2011, 1, 2, 12,  2)), "12:02");
});

it("scaleUtc.tickFormat()(date) otherwise, formats second", () => {
  const f = scaleUtc().tickFormat();
  assert.strictEqual(f(utc(2011, 1, 2, 12,  1,  9)), ":09");
  assert.strictEqual(f(utc(2011, 1, 2, 12,  1, 10)), ":10");
  assert.strictEqual(f(utc(2011, 1, 2, 12,  1, 11)), ":11");
});

it("scaleUtc.tickFormat(count, specifier) returns a time format for the specified specifier", () => {
  const f = scaleUtc().tickFormat(10, "%c");
  assert.strictEqual(f(utc(2011, 1, 2, 12)), "2/2/2011, 12:00:00 PM");
});
