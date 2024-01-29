import assert from "assert";
import {scalePow, scaleSqrt} from "../src/index.js";
import {roundEpsilon} from "./roundEpsilon.js";
import {assertInDelta} from "./asserts.js";

it("scalePow() has the expected defaults", () => {
  const s = scalePow();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.clamp(), false);
  assert.strictEqual(s.exponent(), 1);
  assert.deepStrictEqual(s.interpolate()({array: ["red"]}, {array: ["blue"]})(0.5), {array: ["rgb(128, 0, 128)"]});
});

it("pow(x) maps a domain value x to a range value y", () => {
  assert.strictEqual(scalePow().exponent(0.5)(0.5), Math.SQRT1_2);
});

it("pow(x) ignores extra range values if the domain is smaller than the range", () => {
  assert.strictEqual(scalePow().domain([-10, 0]).range(["red", "white", "green"]).clamp(true)(-5), "rgb(255, 128, 128)");
  assert.strictEqual(scalePow().domain([-10, 0]).range(["red", "white", "green"]).clamp(true)(50), "rgb(255, 255, 255)");
});

it("pow(x) ignores extra domain values if the range is smaller than the domain", () => {
  assert.strictEqual(scalePow().domain([-10, 0, 100]).range(["red", "white"]).clamp(true)(-5), "rgb(255, 128, 128)");
  assert.strictEqual(scalePow().domain([-10, 0, 100]).range(["red", "white"]).clamp(true)(50), "rgb(255, 255, 255)");
});

it("pow(x) maps an empty domain to the middle of the range", () => {
  assert.strictEqual(scalePow().domain([0, 0]).range([1, 2])(0), 1.5);
  assert.strictEqual(scalePow().domain([0, 0]).range([2, 1])(1), 1.5);
});

it("pow(x) can map a bipow domain with two values to the corresponding range", () => {
  const s = scalePow().domain([1, 2]);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.strictEqual(s(0.5), -0.5);
  assert.strictEqual(s(1.0),  0.0);
  assert.strictEqual(s(1.5),  0.5);
  assert.strictEqual(s(2.0),  1.0);
  assert.strictEqual(s(2.5),  1.5);
  assert.strictEqual(s.invert(-0.5), 0.5);
  assert.strictEqual(s.invert( 0.0), 1.0);
  assert.strictEqual(s.invert( 0.5), 1.5);
  assert.strictEqual(s.invert( 1.0), 2.0);
  assert.strictEqual(s.invert( 1.5), 2.5);
});

it("pow(x) can map a polypow domain with more than two values to the corresponding range", () => {
  const s = scalePow().domain([-10, 0, 100]).range(["red", "white", "green"]);
  assert.deepStrictEqual(s.domain(), [-10, 0, 100]);
  assert.strictEqual(s(-5), "rgb(255, 128, 128)");
  assert.strictEqual(s(50), "rgb(128, 192, 128)");
  assert.strictEqual(s(75), "rgb(64, 160, 64)");
  s.domain([4, 2, 1]).range([1, 2, 4]);
  assert.strictEqual(s(1.5), 3);
  assert.strictEqual(s(3), 1.5);
  assert.strictEqual(s.invert(1.5), 3);
  assert.strictEqual(s.invert(3), 1.5);
  s.domain([1, 2, 4]).range([4, 2, 1]);
  assert.strictEqual(s(1.5), 3);
  assert.strictEqual(s(3), 1.5);
  assert.strictEqual(s.invert(1.5), 3);
  assert.strictEqual(s.invert(3), 1.5);
});

it("pow.invert(y) maps a range value y to a domain value x", () => {
  assert.strictEqual(scalePow().range([1, 2]).invert(1.5), 0.5);
});

it("pow.invert(y) maps an empty range to the middle of the domain", () => {
  assert.strictEqual(scalePow().domain([1, 2]).range([0, 0]).invert(0), 1.5);
  assert.strictEqual(scalePow().domain([2, 1]).range([0, 0]).invert(1), 1.5);
});

it("pow.invert(y) coerces range values to numbers", () => {
  assert.strictEqual(scalePow().range(["0", "2"]).invert("1"), 0.5);
  assert.strictEqual(scalePow().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]).invert(new Date(1990, 6, 2, 13)), 0.5);
});

it("pow.invert(y) returns NaN if the range is not coercible to number", () => {
  assert(isNaN(scalePow().range(["#000", "#fff"]).invert("#999")));
  assert(isNaN(scalePow().range([0, "#fff"]).invert("#999")));
});

it("pow.exponent(exponent) sets the exponent to the specified value", () => {
  const x = scalePow().exponent(0.5).domain([1, 2]);
  assertInDelta(x(1), 0, 1e-6);
  assertInDelta(x(1.5), 0.5425821, 1e-6);
  assertInDelta(x(2), 1, 1e-6);
  assert.strictEqual(x.exponent(), 0.5);
  x.exponent(2).domain([1, 2]);
  assertInDelta(x(1), 0, 1e-6);
  assertInDelta(x(1.5), 0.41666667, 1e-6);
  assertInDelta(x(2), 1, 1e-6);
  assert.strictEqual(x.exponent(), 2);
  x.exponent(-1).domain([1, 2]);
  assertInDelta(x(1), 0, 1e-6);
  assertInDelta(x(1.5), 0.6666667, 1e-6);
  assertInDelta(x(2), 1, 1e-6);
  assert.strictEqual(x.exponent(), -1);
});

it("pow.exponent(exponent) changing the exponent does not change the domain or range", () => {
  const x = scalePow().domain([1, 2]).range([3, 4]);
  x.exponent(0.5);
  assert.deepStrictEqual(x.domain(), [1, 2]);
  assert.deepStrictEqual(x.range(), [3, 4]);
  x.exponent(2);
  assert.deepStrictEqual(x.domain(), [1, 2]);
  assert.deepStrictEqual(x.range(), [3, 4]);
  x.exponent(-1);
  assert.deepStrictEqual(x.domain(), [1, 2]);
  assert.deepStrictEqual(x.range(), [3, 4]);
});

it("pow.domain(domain) accepts an array of numbers", () => {
  assert.deepStrictEqual(scalePow().domain([]).domain(), []);
  assert.deepStrictEqual(scalePow().domain([1, 0]).domain(), [1, 0]);
  assert.deepStrictEqual(scalePow().domain([1, 2, 3]).domain(), [1, 2, 3]);
});

it("pow.domain(domain) coerces domain values to numbers", () => {
  assert.deepStrictEqual(scalePow().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]).domain(), [631180800000, 662716800000]);
  assert.deepStrictEqual(scalePow().domain(["0.0", "1.0"]).domain(), [0, 1]);
  assert.deepStrictEqual(scalePow().domain([new Number(0), new Number(1)]).domain(), [0, 1]);
});

it("pow.domain(domain) makes a copy of domain values", () => {
  const d = [1, 2], s = scalePow().domain(d);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  d.push(3);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(d, [1, 2, 3]);
});

it("pow.domain() returns a copy of domain values", () => {
  const s = scalePow(), d = s.domain();
  assert.deepStrictEqual(d, [0, 1]);
  d.push(3);
  assert.deepStrictEqual(s.domain(), [0, 1]);
});

it("pow.range(range) does not coerce range to numbers", () => {
  const s = scalePow().range(["0px", "2px"]);
  assert.deepStrictEqual(s.range(), ["0px", "2px"]);
  assert.strictEqual(s(0.5), "1px");
});

it("pow.range(range) can accept range values as colors", () => {
  assert.strictEqual(scalePow().range(["red", "blue"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scalePow().range(["#ff0000", "#0000ff"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scalePow().range(["#f00", "#00f"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scalePow().range(["rgb(255,0,0)", "hsl(240,100%,50%)"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scalePow().range(["rgb(100%,0%,0%)", "hsl(240,100%,50%)"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scalePow().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"])(0.5), "rgb(128, 0, 128)");
});

it("pow.range(range) can accept range values as arrays or objects", () => {
  assert.deepStrictEqual(scalePow().range([{color: "red"}, {color: "blue"}])(0.5), {color: "rgb(128, 0, 128)"});
  assert.deepStrictEqual(scalePow().range([["red"], ["blue"]])(0.5), ["rgb(128, 0, 128)"]);
});

it("pow.range(range) makes a copy of range values", () => {
  const r = [1, 2], s = scalePow().range(r);
  assert.deepStrictEqual(s.range(), [1, 2]);
  r.push(3);
  assert.deepStrictEqual(s.range(), [1, 2]);
  assert.deepStrictEqual(r, [1, 2, 3]);
});

it("pow.range() returns a copy of range values", () => {
  const s = scalePow(), r = s.range();
  assert.deepStrictEqual(r, [0, 1]);
  r.push(3);
  assert.deepStrictEqual(s.range(), [0, 1]);
});

it("pow.rangeRound(range) is an alias for pow.range(range).interpolate(interpolateRound)", () => {
  assert.strictEqual(scalePow().rangeRound([0, 10])(0.59), 6);
});

it("pow.clamp() is false by default", () => {
  assert.strictEqual(scalePow().clamp(), false);
  assert.strictEqual(scalePow().range([10, 20])(2), 30);
  assert.strictEqual(scalePow().range([10, 20])(-1), 0);
  assert.strictEqual(scalePow().range([10, 20]).invert(30), 2);
  assert.strictEqual(scalePow().range([10, 20]).invert(0), -1);
});

it("pow.clamp(true) restricts output values to the range", () => {
  assert.strictEqual(scalePow().clamp(true).range([10, 20])(2), 20);
  assert.strictEqual(scalePow().clamp(true).range([10, 20])(-1), 10);
});

it("pow.clamp(true) restricts input values to the domain", () => {
  assert.strictEqual(scalePow().clamp(true).range([10, 20]).invert(30), 1);
  assert.strictEqual(scalePow().clamp(true).range([10, 20]).invert(0), 0);
});

it("pow.clamp(clamp) coerces the specified clamp value to a boolean", () => {
  assert.strictEqual(scalePow().clamp("true").clamp(), true);
  assert.strictEqual(scalePow().clamp(1).clamp(), true);
  assert.strictEqual(scalePow().clamp("").clamp(), false);
  assert.strictEqual(scalePow().clamp(0).clamp(), false);
});

it("pow.interpolate(interpolate) takes a custom interpolator factory", () => {
  function interpolate(a, b) { return function(t) { return [a, b, t]; }; }
  const s = scalePow().domain([10, 20]).range(["a", "b"]).interpolate(interpolate);
  assert.strictEqual(s.interpolate(), interpolate);
  assert.deepStrictEqual(s(15), ["a", "b", 0.5]);
});

it("pow.nice() is an alias for pow.nice(10)", () => {
  assert.deepStrictEqual(scalePow().domain([0, 0.96]).nice().domain(), [0, 1]);
  assert.deepStrictEqual(scalePow().domain([0, 96]).nice().domain(), [0, 100]);
});

it("pow.nice(count) extends the domain to match the desired ticks", () => {
  assert.deepStrictEqual(scalePow().domain([0, 0.96]).nice(10).domain(), [0, 1]);
  assert.deepStrictEqual(scalePow().domain([0, 96]).nice(10).domain(), [0, 100]);
  assert.deepStrictEqual(scalePow().domain([0.96, 0]).nice(10).domain(), [1, 0]);
  assert.deepStrictEqual(scalePow().domain([96, 0]).nice(10).domain(), [100, 0]);
  assert.deepStrictEqual(scalePow().domain([0, -0.96]).nice(10).domain(), [0, -1]);
  assert.deepStrictEqual(scalePow().domain([0, -96]).nice(10).domain(), [0, -100]);
  assert.deepStrictEqual(scalePow().domain([-0.96, 0]).nice(10).domain(), [-1, 0]);
  assert.deepStrictEqual(scalePow().domain([-96, 0]).nice(10).domain(), [-100, 0]);
});

it("pow.nice(count) nices the domain, extending it to round numbers", () => {
  assert.deepStrictEqual(scalePow().domain([1.1, 10.9]).nice(10).domain(), [1, 11]);
  assert.deepStrictEqual(scalePow().domain([10.9, 1.1]).nice(10).domain(), [11, 1]);
  assert.deepStrictEqual(scalePow().domain([0.7, 11.001]).nice(10).domain(), [0, 12]);
  assert.deepStrictEqual(scalePow().domain([123.1, 6.7]).nice(10).domain(), [130, 0]);
  assert.deepStrictEqual(scalePow().domain([0, 0.49]).nice(10).domain(), [0, 0.5]);
});

it("pow.nice(count) has no effect on degenerate domains", () => {
  assert.deepStrictEqual(scalePow().domain([0, 0]).nice(10).domain(), [0, 0]);
  assert.deepStrictEqual(scalePow().domain([0.5, 0.5]).nice(10).domain(), [0.5, 0.5]);
});

it("pow.nice(count) nicing a polypow domain only affects the extent", () => {
  assert.deepStrictEqual(scalePow().domain([1.1, 1, 2, 3, 10.9]).nice(10).domain(), [1, 1, 2, 3, 11]);
  assert.deepStrictEqual(scalePow().domain([123.1, 1, 2, 3, -0.9]).nice(10).domain(), [130, 1, 2, 3, -10]);
});

it("pow.nice(count) accepts a tick count to control nicing step", () => {
  assert.deepStrictEqual(scalePow().domain([12, 87]).nice(5).domain(), [0, 100]);
  assert.deepStrictEqual(scalePow().domain([12, 87]).nice(10).domain(), [10, 90]);
  assert.deepStrictEqual(scalePow().domain([12, 87]).nice(100).domain(), [12, 87]);
});

it("pow.ticks(count) returns the expected ticks for an ascending domain", () => {
  const s = scalePow();
  assert.deepStrictEqual(s.ticks(10).map(roundEpsilon), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(s.ticks(9).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(s.ticks(8).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(s.ticks(7).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(6).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(5).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(4).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(3).map(roundEpsilon),  [0.0,                     0.5,                     1.0]);
  assert.deepStrictEqual(s.ticks(2).map(roundEpsilon),  [0.0,                     0.5,                     1.0]);
  assert.deepStrictEqual(s.ticks(1).map(roundEpsilon),  [0.0,                                              1.0]);
  s.domain([-100, 100]);
  assert.deepStrictEqual(s.ticks(10), [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(9),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(8),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(7),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(6),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(5),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(4),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(3),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(2),  [-100,                          0,                     100]);
  assert.deepStrictEqual(s.ticks(1),  [                               0                         ]);
});

it("pow.ticks(count) returns the expected ticks for a descending domain", () => {
  const s = scalePow().domain([1, 0]);
  assert.deepStrictEqual(s.ticks(10).map(roundEpsilon), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
  assert.deepStrictEqual(s.ticks(9).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
  assert.deepStrictEqual(s.ticks(8).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
  assert.deepStrictEqual(s.ticks(7).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  assert.deepStrictEqual(s.ticks(6).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  assert.deepStrictEqual(s.ticks(5).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  assert.deepStrictEqual(s.ticks(4).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  assert.deepStrictEqual(s.ticks(3).map(roundEpsilon),  [0.0,                     0.5,                     1.0].reverse());
  assert.deepStrictEqual(s.ticks(2).map(roundEpsilon),  [0.0,                     0.5,                     1.0].reverse());
  assert.deepStrictEqual(s.ticks(1).map(roundEpsilon),  [0.0,                                              1.0].reverse());
  s.domain([100, -100]);
  assert.deepStrictEqual(s.ticks(10), [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  assert.deepStrictEqual(s.ticks(9),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  assert.deepStrictEqual(s.ticks(8),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  assert.deepStrictEqual(s.ticks(7),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  assert.deepStrictEqual(s.ticks(6),  [-100,           -50,           0,         50,         100].reverse());
  assert.deepStrictEqual(s.ticks(5),  [-100,           -50,           0,         50,         100].reverse());
  assert.deepStrictEqual(s.ticks(4),  [-100,           -50,           0,         50,         100].reverse());
  assert.deepStrictEqual(s.ticks(3),  [-100,           -50,           0,         50,         100].reverse());
  assert.deepStrictEqual(s.ticks(2),  [-100,                          0,                     100].reverse());
  assert.deepStrictEqual(s.ticks(1),  [                               0                         ].reverse());
});

it("pow.ticks(count) returns the expected ticks for a polypow domain", () => {
  const s = scalePow().domain([0, 0.25, 0.9, 1]);
  assert.deepStrictEqual(s.ticks(10).map(roundEpsilon), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(s.ticks(9).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(s.ticks(8).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepStrictEqual(s.ticks(7).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(6).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(5).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(4).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepStrictEqual(s.ticks(3).map(roundEpsilon),  [0.0,                     0.5,                     1.0]);
  assert.deepStrictEqual(s.ticks(2).map(roundEpsilon),  [0.0,                     0.5,                     1.0]);
  assert.deepStrictEqual(s.ticks(1).map(roundEpsilon),  [0.0,                                              1.0]);
  s.domain([-100, 0, 100]);
  assert.deepStrictEqual(s.ticks(10), [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(9),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(8),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(7),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  assert.deepStrictEqual(s.ticks(6),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(5),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(4),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(3),  [-100,           -50,           0,         50,         100]);
  assert.deepStrictEqual(s.ticks(2),  [-100,                          0,                     100]);
  assert.deepStrictEqual(s.ticks(1),  [                               0                         ]);
});

it("pow.ticks(count) returns the empty array if count is not a positive integer", () => {
  const s = scalePow();
  assert.deepStrictEqual(s.ticks(NaN), []);
  assert.deepStrictEqual(s.ticks(0), []);
  assert.deepStrictEqual(s.ticks(-1), []);
  assert.deepStrictEqual(s.ticks(Infinity), []);
});

it("pow.ticks() is an alias for pow.ticks(10)", () => {
  const s = scalePow();
  assert.deepStrictEqual(s.ticks(), s.ticks(10));
});

it("pow.tickFormat() is an alias for pow.tickFormat(10)", () => {
  assert.strictEqual(scalePow().tickFormat()(0.2), "0.2");
  assert.strictEqual(scalePow().domain([-100, 100]).tickFormat()(-20), "−20");
});

it("pow.tickFormat(count) returns a format suitable for the ticks", () => {
  assert.strictEqual(scalePow().tickFormat(10)(0.2), "0.2");
  assert.strictEqual(scalePow().tickFormat(20)(0.2), "0.20");
  assert.strictEqual(scalePow().domain([-100, 100]).tickFormat(10)(-20), "−20");
});

it("pow.tickFormat(count, specifier) sets the appropriate fixed precision if not specified", () => {
  assert.strictEqual(scalePow().tickFormat(10, "+f")(0.2), "+0.2");
  assert.strictEqual(scalePow().tickFormat(20, "+f")(0.2), "+0.20");
  assert.strictEqual(scalePow().tickFormat(10, "+%")(0.2), "+20%");
  assert.strictEqual(scalePow().domain([0.19, 0.21]).tickFormat(10, "+%")(0.2), "+20.0%");
});

it("pow.tickFormat(count, specifier) sets the appropriate round precision if not specified", () => {
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(10, "")(2.10), "2");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "")(2.01), "2");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "")(2.11), "2.1");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(10, "e")(2.10), "2e+0");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "e")(2.01), "2.0e+0");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "e")(2.11), "2.1e+0");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(10, "g")(2.10), "2");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "g")(2.01), "2.0");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "g")(2.11), "2.1");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(10, "r")(2.10e6), "2000000");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "r")(2.01e6), "2000000");
  assert.strictEqual(scalePow().domain([0, 9]).tickFormat(100, "r")(2.11e6), "2100000");
  assert.strictEqual(scalePow().domain([0, 0.9]).tickFormat(10, "p")(0.210), "20%");
  assert.strictEqual(scalePow().domain([0.19, 0.21]).tickFormat(10, "p")(0.201), "20.1%");
});

it("pow.tickFormat(count, specifier) sets the appropriate prefix precision if not specified", () => {
  assert.strictEqual(scalePow().domain([0, 1e6]).tickFormat(10, "$s")(0.51e6), "$0.5M");
  assert.strictEqual(scalePow().domain([0, 1e6]).tickFormat(100, "$s")(0.501e6), "$0.50M");
});

it("pow.copy() returns a copy with changes to the domain are isolated", () => {
  const x = scalePow(), y = x.copy();
  x.domain([1, 2]);
  assert.deepStrictEqual(y.domain(), [0, 1]);
  assert.strictEqual(x(1), 0);
  assert.strictEqual(y(1), 1);
  y.domain([2, 3]);
  assert.strictEqual(x(2), 1);
  assert.strictEqual(y(2), 0);
  assert.deepStrictEqual(x.domain(), [1, 2]);
  assert.deepStrictEqual(y.domain(), [2, 3]);
  const y2 = x.domain([1, 1.9]).copy();
  x.nice(5);
  assert.deepStrictEqual(x.domain(), [1, 2]);
  assert.deepStrictEqual(y2.domain(), [1, 1.9]);
});

it("pow.copy() returns a copy with changes to the range are isolated", () => {
  const x = scalePow(), y = x.copy();
  x.range([1, 2]);
  assert.strictEqual(x.invert(1), 0);
  assert.strictEqual(y.invert(1), 1);
  assert.deepStrictEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  assert.strictEqual(x.invert(2), 1);
  assert.strictEqual(y.invert(2), 0);
  assert.deepStrictEqual(x.range(), [1, 2]);
  assert.deepStrictEqual(y.range(), [2, 3]);
});

it("pow.copy() returns a copy with changes to the interpolator are isolated", () => {
  const x = scalePow().range(["red", "blue"]),
      y = x.copy(),
      i0 = x.interpolate(),
      i1 = function(a, b) { return function() { return b; }; };
  x.interpolate(i1);
  assert.strictEqual(y.interpolate(), i0);
  assert.strictEqual(x(0.5), "blue");
  assert.strictEqual(y(0.5), "rgb(128, 0, 128)");
});

it("pow.copy() returns a copy with changes to clamping are isolated", () => {
  const x = scalePow().clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(2), 2);
  assert.strictEqual(y(2), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(2), 2);
  assert.strictEqual(y(2), 2);
  assert.strictEqual(x.clamp(), false);
});

it("pow().clamp(true).invert(x) cannot return a value outside the domain", () => {
  const x = scalePow().exponent(0.5).domain([1, 20]).clamp(true);
  assert.strictEqual(x.invert(0), 1);
  assert.strictEqual(x.invert(1), 20);
});

it("scaleSqrt() is an alias for pow().exponent(0.5)", () => {
  const s = scaleSqrt();
  assert.strictEqual(s.exponent(), 0.5);
  assertInDelta(s(0.5), Math.SQRT1_2, 1e-6);
  assertInDelta(s.invert(Math.SQRT1_2), 0.5, 1e-6);
});
