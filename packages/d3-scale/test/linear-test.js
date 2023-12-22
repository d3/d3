import assert from "assert";
import {scaleLinear} from "../src/index.js";
import {roundEpsilon} from "./roundEpsilon.js";

it("scaleLinear() has the expected defaults", () => {
  const s = scaleLinear();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.clamp(), false);
  assert.strictEqual(s.unknown(), undefined);
  assert.deepStrictEqual(s.interpolate()({array: ["red"]}, {array: ["blue"]})(0.5), {array: ["rgb(128, 0, 128)"]});
});

it("scaleLinear(range) sets the range", () => {
  const s = scaleLinear([1, 2]);
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [1, 2]);
  assert.strictEqual(s(0.5), 1.5);
});

it("scaleLinear(domain, range) sets the domain and range", () => {
  const s = scaleLinear([1, 2], [3, 4]);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(s.range(), [3, 4]);
  assert.strictEqual(s(1.5), 3.5);
});

it("linear(x) maps a domain value x to a range value y", () => {
  assert.strictEqual(scaleLinear().range([1, 2])(0.5), 1.5);
});

it("linear(x) ignores extra range values if the domain is smaller than the range", () => {
  assert.strictEqual(scaleLinear().domain([-10, 0]).range([0, 1, 2]).clamp(true)(-5), 0.5);
  assert.strictEqual(scaleLinear().domain([-10, 0]).range([0, 1, 2]).clamp(true)(50), 1);
});

it("linear(x) ignores extra domain values if the range is smaller than the domain", () => {
  assert.strictEqual(scaleLinear().domain([-10, 0, 100]).range([0, 1]).clamp(true)(-5), 0.5);
  assert.strictEqual(scaleLinear().domain([-10, 0, 100]).range([0, 1]).clamp(true)(50), 1);
});

it("linear(x) maps an empty domain to the middle of the range", () => {
  assert.strictEqual(scaleLinear().domain([0, 0]).range([1, 2])(0), 1.5);
  assert.strictEqual(scaleLinear().domain([0, 0]).range([2, 1])(1), 1.5);
});

it("linear(x) can map a bilinear domain with two values to the corresponding range", () => {
  const s = scaleLinear().domain([1, 2]);
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

it("linear(x) can map a polylinear domain with more than two values to the corresponding range", () => {
  const s = scaleLinear().domain([-10, 0, 100]).range(["red", "white", "green"]);
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

it("linear.invert(y) maps a range value y to a domain value x", () => {
  assert.strictEqual(scaleLinear().range([1, 2]).invert(1.5), 0.5);
});

it("linear.invert(y) maps an empty range to the middle of the domain", () => {
  assert.strictEqual(scaleLinear().domain([1, 2]).range([0, 0]).invert(0), 1.5);
  assert.strictEqual(scaleLinear().domain([2, 1]).range([0, 0]).invert(1), 1.5);
});

it("linear.invert(y) coerces range values to numbers", () => {
  assert.strictEqual(scaleLinear().range(["0", "2"]).invert("1"), 0.5);
  assert.strictEqual(scaleLinear().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]).invert(new Date(1990, 6, 2, 13)), 0.5);
});

it("linear.invert(y) returns NaN if the range is not coercible to number", () => {
  assert(isNaN(scaleLinear().range(["#000", "#fff"]).invert("#999")));
  assert(isNaN(scaleLinear().range([0, "#fff"]).invert("#999")));
});

it("linear.domain(domain) accepts an array of numbers", () => {
  assert.deepStrictEqual(scaleLinear().domain([]).domain(), []);
  assert.deepStrictEqual(scaleLinear().domain([1, 0]).domain(), [1, 0]);
  assert.deepStrictEqual(scaleLinear().domain([1, 2, 3]).domain(), [1, 2, 3]);
});

it("linear.domain(domain) coerces domain values to numbers", () => {
  assert.deepStrictEqual(scaleLinear().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]).domain(), [631180800000, 662716800000]);
  assert.deepStrictEqual(scaleLinear().domain(["0.0", "1.0"]).domain(), [0, 1]);
  assert.deepStrictEqual(scaleLinear().domain([new Number(0), new Number(1)]).domain(), [0, 1]);
});

it("linear.domain(domain) accepts an iterable", () => {
  assert.deepStrictEqual(scaleLinear().domain(new Set([1, 2])).domain(), [1, 2]);
});

it("linear.domain(domain) makes a copy of domain values", () => {
  const d = [1, 2], s = scaleLinear().domain(d);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  d.push(3);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(d, [1, 2, 3]);
});

it("linear.domain() returns a copy of domain values", () => {
  const s = scaleLinear(), d = s.domain();
  assert.deepStrictEqual(d, [0, 1]);
  d.push(3);
  assert.deepStrictEqual(s.domain(), [0, 1]);
});

it("linear.range(range) does not coerce range to numbers", () => {
  const s = scaleLinear().range(["0px", "2px"]);
  assert.deepStrictEqual(s.range(), ["0px", "2px"]);
  assert.strictEqual(s(0.5), "1px");
});

it("linear.range(range) accepts an iterable", () => {
  assert.deepStrictEqual(scaleLinear().range(new Set([1, 2])).range(), [1, 2]);
});

it("linear.range(range) can accept range values as colors", () => {
  assert.strictEqual(scaleLinear().range(["red", "blue"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["#ff0000", "#0000ff"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["#f00", "#00f"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["rgb(255,0,0)", "hsl(240,100%,50%)"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["rgb(100%,0%,0%)", "hsl(240,100%,50%)"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"])(0.5), "rgb(128, 0, 128)");
});

it("linear.range(range) can accept range values as arrays or objects", () => {
  assert.deepStrictEqual(scaleLinear().range([{color: "red"}, {color: "blue"}])(0.5), {color: "rgb(128, 0, 128)"});
  assert.deepStrictEqual(scaleLinear().range([["red"], ["blue"]])(0.5), ["rgb(128, 0, 128)"]);
});

it("linear.range(range) makes a copy of range values", () => {
  const r = [1, 2], s = scaleLinear().range(r);
  assert.deepStrictEqual(s.range(), [1, 2]);
  r.push(3);
  assert.deepStrictEqual(s.range(), [1, 2]);
  assert.deepStrictEqual(r, [1, 2, 3]);
});

it("linear.range() returns a copy of range values", () => {
  const s = scaleLinear(), r = s.range();
  assert.deepStrictEqual(r, [0, 1]);
  r.push(3);
  assert.deepStrictEqual(s.range(), [0, 1]);
});

it("linear.rangeRound(range) is an alias for linear.range(range).interpolate(interpolateRound)", () => {
  assert.strictEqual(scaleLinear().rangeRound([0, 10])(0.59), 6);
});

it("linear.rangeRound(range) accepts an iterable", () => {
  assert.deepStrictEqual(scaleLinear().rangeRound(new Set([1, 2])).range(), [1, 2]);
});

it("linear.unknown(value) sets the return value for undefined, null, and NaN input", () => {
  const s = scaleLinear().unknown(-1);
  assert.strictEqual(s(null), -1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(NaN), -1);
  assert.strictEqual(s("N/A"), -1);
  assert.strictEqual(s(0.4), 0.4);
});

it("linear.clamp() is false by default", () => {
  assert.strictEqual(scaleLinear().clamp(), false);
  assert.strictEqual(scaleLinear().range([10, 20])(2), 30);
  assert.strictEqual(scaleLinear().range([10, 20])(-1), 0);
  assert.strictEqual(scaleLinear().range([10, 20]).invert(30), 2);
  assert.strictEqual(scaleLinear().range([10, 20]).invert(0), -1);
});

it("linear.clamp(true) restricts output values to the range", () => {
  assert.strictEqual(scaleLinear().clamp(true).range([10, 20])(2), 20);
  assert.strictEqual(scaleLinear().clamp(true).range([10, 20])(-1), 10);
});

it("linear.clamp(true) restricts input values to the domain", () => {
  assert.strictEqual(scaleLinear().clamp(true).range([10, 20]).invert(30), 1);
  assert.strictEqual(scaleLinear().clamp(true).range([10, 20]).invert(0), 0);
});

it("linear.clamp(clamp) coerces the specified clamp value to a boolean", () => {
  assert.strictEqual(scaleLinear().clamp("true").clamp(), true);
  assert.strictEqual(scaleLinear().clamp(1).clamp(), true);
  assert.strictEqual(scaleLinear().clamp("").clamp(), false);
  assert.strictEqual(scaleLinear().clamp(0).clamp(), false);
});

it("linear.interpolate(interpolate) takes a custom interpolator factory", () => {
  function interpolate(a, b) { return function(t) { return [a, b, t]; }; }
  const s = scaleLinear().domain([10, 20]).range(["a", "b"]).interpolate(interpolate);
  assert.strictEqual(s.interpolate(), interpolate);
  assert.deepStrictEqual(s(15), ["a", "b", 0.5]);
});

it("linear.nice() is an alias for linear.nice(10)", () => {
  assert.deepStrictEqual(scaleLinear().domain([0, 0.96]).nice().domain(), [0, 1]);
  assert.deepStrictEqual(scaleLinear().domain([0, 96]).nice().domain(), [0, 100]);
});

it("linear.nice(count) extends the domain to match the desired ticks", () => {
  assert.deepStrictEqual(scaleLinear().domain([0, 0.96]).nice(10).domain(), [0, 1]);
  assert.deepStrictEqual(scaleLinear().domain([0, 96]).nice(10).domain(), [0, 100]);
  assert.deepStrictEqual(scaleLinear().domain([0.96, 0]).nice(10).domain(), [1, 0]);
  assert.deepStrictEqual(scaleLinear().domain([96, 0]).nice(10).domain(), [100, 0]);
  assert.deepStrictEqual(scaleLinear().domain([0, -0.96]).nice(10).domain(), [0, -1]);
  assert.deepStrictEqual(scaleLinear().domain([0, -96]).nice(10).domain(), [0, -100]);
  assert.deepStrictEqual(scaleLinear().domain([-0.96, 0]).nice(10).domain(), [-1, 0]);
  assert.deepStrictEqual(scaleLinear().domain([-96, 0]).nice(10).domain(), [-100, 0]);
  assert.deepStrictEqual(scaleLinear().domain([-0.1, 51.1]).nice(8).domain(), [-10, 60]);
});

it("linear.nice(count) nices the domain, extending it to round numbers", () => {
  assert.deepStrictEqual(scaleLinear().domain([1.1, 10.9]).nice(10).domain(), [1, 11]);
  assert.deepStrictEqual(scaleLinear().domain([10.9, 1.1]).nice(10).domain(), [11, 1]);
  assert.deepStrictEqual(scaleLinear().domain([0.7, 11.001]).nice(10).domain(), [0, 12]);
  assert.deepStrictEqual(scaleLinear().domain([123.1, 6.7]).nice(10).domain(), [130, 0]);
  assert.deepStrictEqual(scaleLinear().domain([0, 0.49]).nice(10).domain(), [0, 0.5]);
  assert.deepStrictEqual(scaleLinear().domain([0, 14.1]).nice(5).domain(), [0, 20]);
  assert.deepStrictEqual(scaleLinear().domain([0, 15]).nice(5).domain(), [0, 20]);
});

it("linear.nice(count) has no effect on degenerate domains", () => {
  assert.deepStrictEqual(scaleLinear().domain([0, 0]).nice(10).domain(), [0, 0]);
  assert.deepStrictEqual(scaleLinear().domain([0.5, 0.5]).nice(10).domain(), [0.5, 0.5]);
});

it("linear.nice(count) nicing a polylinear domain only affects the extent", () => {
  assert.deepStrictEqual(scaleLinear().domain([1.1, 1, 2, 3, 10.9]).nice(10).domain(), [1, 1, 2, 3, 11]);
  assert.deepStrictEqual(scaleLinear().domain([123.1, 1, 2, 3, -0.9]).nice(10).domain(), [130, 1, 2, 3, -10]);
});

it("linear.nice(count) accepts a tick count to control nicing step", () => {
  assert.deepStrictEqual(scaleLinear().domain([12, 87]).nice(5).domain(), [0, 100]);
  assert.deepStrictEqual(scaleLinear().domain([12, 87]).nice(10).domain(), [10, 90]);
  assert.deepStrictEqual(scaleLinear().domain([12, 87]).nice(100).domain(), [12, 87]);
});

it("linear.ticks(count) returns the expected ticks for an ascending domain", () => {
  const s = scaleLinear();
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

it("linear.ticks(count) returns the expected ticks for a descending domain", () => {
  const s = scaleLinear().domain([1, 0]);
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

it("linear.ticks(count) returns the expected ticks for a polylinear domain", () => {
  const s = scaleLinear().domain([0, 0.25, 0.9, 1]);
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

it("linear.ticks(X) spans linear.nice(X).domain()", () => {
  function check(domain, count) {
    const s = scaleLinear().domain(domain).nice(count);
    const ticks = s.ticks(count);
    assert.deepStrictEqual([ticks[0], ticks[ticks.length - 1]], s.domain());
  }
  check([1, 9], 2);
  check([1, 9], 3);
  check([1, 9], 4);
  check([8, 9], 2);
  check([8, 9], 3);
  check([8, 9], 4);
  check([1, 21], 2);
  check([2, 21], 2);
  check([3, 21], 2);
  check([4, 21], 2);
  check([5, 21], 2);
  check([6, 21], 2);
  check([7, 21], 2);
  check([8, 21], 2);
  check([9, 21], 2);
  check([10, 21], 2);
  check([11, 21], 2);
})

it("linear.ticks(count) returns the empty array if count is not a positive integer", () => {
  const s = scaleLinear();
  assert.deepStrictEqual(s.ticks(NaN), []);
  assert.deepStrictEqual(s.ticks(0), []);
  assert.deepStrictEqual(s.ticks(-1), []);
  assert.deepStrictEqual(s.ticks(Infinity), []);
});

it("linear.ticks() is an alias for linear.ticks(10)", () => {
  const s = scaleLinear();
  assert.deepStrictEqual(s.ticks(), s.ticks(10));
});

it("linear.tickFormat() is an alias for linear.tickFormat(10)", () => {
  assert.strictEqual(scaleLinear().tickFormat()(0.2), "0.2");
  assert.strictEqual(scaleLinear().domain([-100, 100]).tickFormat()(-20), "−20");
});

it("linear.tickFormat(count) returns a format suitable for the ticks", () => {
  assert.strictEqual(scaleLinear().tickFormat(10)(0.2), "0.2");
  assert.strictEqual(scaleLinear().tickFormat(20)(0.2), "0.20");
  assert.strictEqual(scaleLinear().domain([-100, 100]).tickFormat(10)(-20), "−20");
});

it("linear.tickFormat(count, specifier) sets the appropriate fixed precision if not specified", () => {
  assert.strictEqual(scaleLinear().tickFormat(10, "+f")(0.2), "+0.2");
  assert.strictEqual(scaleLinear().tickFormat(20, "+f")(0.2), "+0.20");
  assert.strictEqual(scaleLinear().tickFormat(10, "+%")(0.2), "+20%");
  assert.strictEqual(scaleLinear().domain([0.19, 0.21]).tickFormat(10, "+%")(0.2), "+20.0%");
});

it("linear.tickFormat(count, specifier) sets the appropriate round precision if not specified", () => {
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(10, "")(2.10), "2");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "")(2.01), "2");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "")(2.11), "2.1");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(10, "e")(2.10), "2e+0");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "e")(2.01), "2.0e+0");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "e")(2.11), "2.1e+0");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(10, "g")(2.10), "2");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "g")(2.01), "2.0");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "g")(2.11), "2.1");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(10, "r")(2.10e6), "2000000");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "r")(2.01e6), "2000000");
  assert.strictEqual(scaleLinear().domain([0, 9]).tickFormat(100, "r")(2.11e6), "2100000");
  assert.strictEqual(scaleLinear().domain([0, 0.9]).tickFormat(10, "p")(0.210), "20%");
  assert.strictEqual(scaleLinear().domain([0.19, 0.21]).tickFormat(10, "p")(0.201), "20.1%");
});

it("linear.tickFormat(count, specifier) sets the appropriate prefix precision if not specified", () => {
  assert.strictEqual(scaleLinear().domain([0, 1e6]).tickFormat(10, "$s")(0.51e6), "$0.5M");
  assert.strictEqual(scaleLinear().domain([0, 1e6]).tickFormat(100, "$s")(0.501e6), "$0.50M");
});

it("linear.tickFormat() uses the default precision when the domain is invalid", () => {
  const f = scaleLinear().domain([0, NaN]).tickFormat();
  assert.strictEqual(f + "", " >-,f");
  assert.strictEqual(f(0.12), "0.120000");
});

it("linear.copy() returns a copy with changes to the domain are isolated", () => {
  const x = scaleLinear(), y = x.copy();
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

it("linear.copy() returns a copy with changes to the range are isolated", () => {
  const x = scaleLinear(), y = x.copy();
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

it("linear.copy() returns a copy with changes to the interpolator are isolated", () => {
  const x = scaleLinear().range(["red", "blue"]);
  const y = x.copy();
  const i0 = x.interpolate();
  const i1 = function(a, b) { return function() { return b; }; };
  x.interpolate(i1);
  assert.strictEqual(y.interpolate(), i0);
  assert.strictEqual(x(0.5), "blue");
  assert.strictEqual(y(0.5), "rgb(128, 0, 128)");
});

it("linear.copy() returns a copy with changes to clamping are isolated", () => {
  const x = scaleLinear().clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(2), 2);
  assert.strictEqual(y(2), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(2), 2);
  assert.strictEqual(y(2), 2);
  assert.strictEqual(x.clamp(), false);
});

it("linear.copy() returns a copy with changes to the unknown value are isolated", () => {
  const x = scaleLinear(), y = x.copy();
  x.unknown(2);
  assert.strictEqual(x(NaN), 2);
  assert.strictEqual(isNaN(y(NaN)), true);
  assert.strictEqual(y.unknown(), undefined);
  y.unknown(3);
  assert.strictEqual(x(NaN), 2);
  assert.strictEqual(y(NaN), 3);
  assert.strictEqual(x.unknown(), 2);
});
