import assert from "assert";
import {scaleSymlog} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("scaleSymlog() has the expected defaults", () => {
  const s = scaleSymlog();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.clamp(), false);
  assert.strictEqual(s.constant(), 1);
});

it("symlog(x) maps a domain value x to a range value y", () => {
  const s = scaleSymlog().domain([-100, 100]);
  assert.strictEqual(s(-100), 0);
  assert.strictEqual(s(100), 1);
  assert.strictEqual(s(0), 0.5);
});

it("symlog.invert(y) maps a range value y to a domain value x", () => {
  const s = scaleSymlog().domain([-100, 100]);
  assertInDelta(s.invert(1), 100);
});

it("symlog.invert(y) coerces range values to numbers", () => {
  const s = scaleSymlog().range(["-3", "3"]);
  assert.deepStrictEqual(s.invert(3), 1);
});

it("symlog.invert(y) returns NaN if the range is not coercible to number", () => {
  assert(isNaN(scaleSymlog().range(["#000", "#fff"]).invert("#999")));
  assert(isNaN(scaleSymlog().range([0, "#fff"]).invert("#999")));
});

it("symlog.constant(constant) sets the constant to the specified value", () => {
  const s = scaleSymlog().constant(5);
  assert.strictEqual(s.constant(), 5);
});

it("symlog.constant(constant) changing the constant does not change the domain or range", () => {
  const s = scaleSymlog().constant(2);
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
});

it("symlog.domain(domain) accepts an array of numbers", () => {
  assert.deepStrictEqual(scaleSymlog().domain([]).domain(), []);
  assert.deepStrictEqual(scaleSymlog().domain([1, 0]).domain(), [1, 0]);
  assert.deepStrictEqual(scaleSymlog().domain([1, 2, 3]).domain(), [1, 2, 3]);
});

it("symlog.domain(domain) coerces domain values to numbers", () => {
  assert.deepStrictEqual(scaleSymlog().domain([new Date(Date.UTC(1990, 0, 1)), new Date(Date.UTC(1991, 0, 1))]).domain(), [631152000000, 662688000000]);
  assert.deepStrictEqual(scaleSymlog().domain(["0.0", "1.0"]).domain(), [0, 1]);
  assert.deepStrictEqual(scaleSymlog().domain([new Number(0), new Number(1)]).domain(), [0, 1]);
});

it("symlog.domain(domain) makes a copy of domain values", () => {
  const d = [1, 2], s = scaleSymlog().domain(d);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  d.push(3);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(d, [1, 2, 3]);
});

it("symlog.domain() returns a copy of domain values", () => {
  const s = scaleSymlog(), d = s.domain();
  assert.deepStrictEqual(d, [0, 1]);
  d.push(3);
  assert.deepStrictEqual(s.domain(), [0, 1]);
});

it("symlog.range(range) does not coerce range to numbers", () => {
  const s = scaleSymlog().range(["0px", "2px"]);
  assert.deepStrictEqual(s.range(), ["0px", "2px"]);
  assert.strictEqual(s(1), "2px");
});

it("symlog.range(range) can accept range values as arrays or objects", () => {
  assert.deepStrictEqual(scaleSymlog().range([{color: "red"}, {color: "blue"}])(1), {color: "rgb(0, 0, 255)"});
  assert.deepStrictEqual(scaleSymlog().range([["red"], ["blue"]])(0), ["rgb(255, 0, 0)"]);
});

it("symlog.range(range) makes a copy of range values", () => {
  const r = [1, 2], s = scaleSymlog().range(r);
  assert.deepStrictEqual(s.range(), [1, 2]);
  r.push(3);
  assert.deepStrictEqual(s.range(), [1, 2]);
  assert.deepStrictEqual(r, [1, 2, 3]);
});

it("symlog.range() returns a copy of range values", () => {
  const s = scaleSymlog(), r = s.range();
  assert.deepStrictEqual(r, [0, 1]);
  r.push(3);
  assert.deepStrictEqual(s.range(), [0, 1]);
});

it("symlog.clamp() is false by default", () => {
  assert.strictEqual(scaleSymlog().clamp(), false);
  assert.strictEqual(scaleSymlog().range([10, 20])(3), 30);
  assert.strictEqual(scaleSymlog().range([10, 20])(-1), 0);
  assert.strictEqual(scaleSymlog().range([10, 20]).invert(30), 3);
  assert.strictEqual(scaleSymlog().range([10, 20]).invert(0), -1);
});

it("symlog.clamp(true) restricts output values to the range", () => {
  assert.strictEqual(scaleSymlog().clamp(true).range([10, 20])(2), 20);
  assert.strictEqual(scaleSymlog().clamp(true).range([10, 20])(-1), 10);
});

it("symlog.clamp(true) restricts input values to the domain", () => {
  assert.strictEqual(scaleSymlog().clamp(true).range([10, 20]).invert(30), 1);
  assert.strictEqual(scaleSymlog().clamp(true).range([10, 20]).invert(0), 0);
});

it("symlog.clamp(clamp) coerces the specified clamp value to a boolean", () => {
  assert.strictEqual(scaleSymlog().clamp("true").clamp(), true);
  assert.strictEqual(scaleSymlog().clamp(1).clamp(), true);
  assert.strictEqual(scaleSymlog().clamp("").clamp(), false);
  assert.strictEqual(scaleSymlog().clamp(0).clamp(), false);
});

it("symlog.copy() returns a copy with changes to the domain are isolated", () => {
  const x = scaleSymlog(), y = x.copy();
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

it("symlog.copy() returns a copy with changes to the range are isolated", () => {
  const x = scaleSymlog(), y = x.copy();
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

it("symlog.copy() returns a copy with changes to clamping are isolated", () => {
  const x = scaleSymlog().clamp(true), y = x.copy();
  x.clamp(false);
  assert.strictEqual(x(3), 2);
  assert.strictEqual(y(2), 1);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assert.strictEqual(x(3), 2);
  assert.strictEqual(y(3), 2);
  assert.strictEqual(x.clamp(), false);
});

it("symlog().clamp(true).invert(x) cannot return a value outside the domain", () => {
  const x = scaleSymlog().domain([1, 20]).clamp(true);
  assert.strictEqual(x.invert(0), 1);
  assert.strictEqual(x.invert(1), 20);
});
