import assert from "assert";
import {scaleBand} from "../src/index.js";

it("scaleBand() has the expected defaults", () => {
  const s = scaleBand();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.bandwidth(), 1);
  assert.strictEqual(s.step(), 1);
  assert.strictEqual(s.round(), false);
  assert.strictEqual(s.paddingInner(), 0);
  assert.strictEqual(s.paddingOuter(), 0);
  assert.strictEqual(s.align(), 0.5);
});

it("band(value) computes discrete bands in a continuous range", () => {
  const s = scaleBand([0, 960]);
  assert.strictEqual(s("foo"), undefined);
  s.domain(["foo", "bar"]);
  assert.strictEqual(s("foo"), 0);
  assert.strictEqual(s("bar"), 480);
  s.domain(["a", "b", "c"]).range([0, 120]);
  assert.deepStrictEqual(s.domain().map(s), [0, 40, 80]);
  assert.strictEqual(s.bandwidth(), 40);
  s.padding(0.2);
  assert.deepStrictEqual(s.domain().map(s), [7.5, 45, 82.5]);
  assert.strictEqual(s.bandwidth(), 30);
});

it("band(value) returns undefined for values outside the domain", () => {
  const s = scaleBand(["a", "b", "c"], [0, 1]);
  assert.strictEqual(s("d"), undefined);
  assert.strictEqual(s("e"), undefined);
  assert.strictEqual(s("f"), undefined);
});

it("band(value) does not implicitly add values to the domain", () => {
  const s = scaleBand(["a", "b", "c"], [0, 1]);
  s("d");
  s("e");
  assert.deepStrictEqual(s.domain(), ["a", "b", "c"]);
});

it("band.step() returns the distance between the starts of adjacent bands", () => {
  const s = scaleBand([0, 960]);
  assert.strictEqual(s.domain(["foo"]).step(), 960);
  assert.strictEqual(s.domain(["foo", "bar"]).step(), 480);
  assert.strictEqual(s.domain(["foo", "bar", "baz"]).step(), 320);
  s.padding(0.5);
  assert.strictEqual(s.domain(["foo"]).step(), 640);
  assert.strictEqual(s.domain(["foo", "bar"]).step(), 384);
});

it("band.bandwidth() returns the width of the band", () => {
  const s = scaleBand([0, 960]);
  assert.strictEqual(s.domain([]).bandwidth(), 960);
  assert.strictEqual(s.domain(["foo"]).bandwidth(), 960);
  assert.strictEqual(s.domain(["foo", "bar"]).bandwidth(), 480);
  assert.strictEqual(s.domain(["foo", "bar", "baz"]).bandwidth(), 320);
  s.padding(0.5);
  assert.strictEqual(s.domain([]).bandwidth(), 480);
  assert.strictEqual(s.domain(["foo"]).bandwidth(), 320);
  assert.strictEqual(s.domain(["foo", "bar"]).bandwidth(), 192);
});

it("band.domain([]) computes reasonable band and step values", () => {
  const s = scaleBand([0, 960]).domain([]);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 960);
  s.padding(0.5);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 480);
  s.padding(1);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 0);
});

it("band.domain([value]) computes a reasonable singleton band, even with padding", () => {
  const s = scaleBand([0, 960]).domain(["foo"]);
  assert.strictEqual(s("foo"), 0);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 960);
  s.padding(0.5);
  assert.strictEqual(s("foo"), 320);
  assert.strictEqual(s.step(), 640);
  assert.strictEqual(s.bandwidth(), 320);
  s.padding(1);
  assert.strictEqual(s("foo"), 480);
  assert.strictEqual(s.step(), 480);
  assert.strictEqual(s.bandwidth(), 0);
});

it("band.domain(values) recomputes the bands", () => {
  const s = scaleBand().domain(["a", "b", "c"]).rangeRound([0, 100]);
  assert.deepStrictEqual(s.domain().map(s), [1, 34, 67]);
  assert.strictEqual(s.bandwidth(), 33);
  s.domain(["a", "b", "c", "d"]);
  assert.deepStrictEqual(s.domain().map(s), [0, 25, 50, 75]);
  assert.strictEqual(s.bandwidth(), 25);
});

it("band.domain(domain) accepts an iterable", () => {
  assert.deepStrictEqual(scaleBand().domain(new Set(["a", "b", "c"])).domain(), ["a", "b", "c"]);
});

it("band.domain(values) makes a copy of the specified domain values", () => {
  const domain = ["red", "green"];
  const s = scaleBand().domain(domain);
  domain.push("blue");
  assert.deepStrictEqual(s.domain(), ["red", "green"]);
});

it("band.domain() returns a copy of the domain", () => {
  const s = scaleBand().domain(["red", "green"]);
  const domain = s.domain();
  assert.deepStrictEqual(domain, ["red", "green"]);
  domain.push("blue");
  assert.deepStrictEqual(s.domain(), ["red", "green"]);
});

it("band.range(values) can be descending", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([120, 0]);
  assert.deepStrictEqual(s.domain().map(s), [80, 40, 0]);
  assert.strictEqual(s.bandwidth(), 40);
  s.padding(0.2);
  assert.deepStrictEqual(s.domain().map(s), [82.5, 45, 7.5]);
  assert.strictEqual(s.bandwidth(), 30);
});

it("band.range(values) makes a copy of the specified range values", () => {
  const range = [1, 2];
  const s = scaleBand().range(range);
  range.push("blue");
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("band.range() returns a copy of the range", () => {
  const s = scaleBand().range([1, 2]);
  const range = s.range();
  assert.deepStrictEqual(range, [1, 2]);
  range.push("blue");
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("band.range(values) accepts an iterable", () => {
  const s = scaleBand().range(new Set([1, 2]));
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("band.rangeRound(values) accepts an iterable", () => {
  const s = scaleBand().rangeRound(new Set([1, 2]));
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("band.range(values) coerces values to numbers", () => {
  const s = scaleBand().range(["1.0", "2.0"]);
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("band.rangeRound(values) coerces values to numbers", () => {
  const s = scaleBand().rangeRound(["1.0", "2.0"]);
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("band.paddingInner(p) specifies the inner padding p", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([120, 0]).paddingInner(0.1).round(true);
  assert.deepStrictEqual(s.domain().map(s), [83, 42, 1]);
  assert.strictEqual(s.bandwidth(), 37);
  s.paddingInner(0.2);
  assert.deepStrictEqual(s.domain().map(s), [85, 43, 1]);
  assert.strictEqual(s.bandwidth(), 34);
});

it("band.paddingInner(p) coerces p to a number <= 1", () => {
  const s = scaleBand();
  assert.strictEqual(s.paddingInner("1.0").paddingInner(), 1);
  assert.strictEqual(s.paddingInner("-1.0").paddingInner(), -1);
  assert.strictEqual(s.paddingInner("2.0").paddingInner(), 1);
  assert(Number.isNaN(s.paddingInner(NaN).paddingInner()));
});

it("band.paddingOuter(p) specifies the outer padding p", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([120, 0]).paddingInner(0.2).paddingOuter(0.1);
  assert.deepStrictEqual(s.domain().map(s), [84, 44, 4]);
  assert.strictEqual(s.bandwidth(), 32);
  s.paddingOuter(1);
  assert.deepStrictEqual(s.domain().map(s), [75, 50, 25]);
  assert.strictEqual(s.bandwidth(), 20);
});

it("band.paddingOuter(p) coerces p to a number", () => {
  const s = scaleBand();
  assert.strictEqual(s.paddingOuter("1.0").paddingOuter(), 1);
  assert.strictEqual(s.paddingOuter("-1.0").paddingOuter(), -1);
  assert.strictEqual(s.paddingOuter("2.0").paddingOuter(), 2);
  assert(Number.isNaN(s.paddingOuter(NaN).paddingOuter()));
});

it("band.rangeRound(values) is an alias for band.range(values).round(true)", () => {
  const s = scaleBand().domain(["a", "b", "c"]).rangeRound([0, 100]);
  assert.deepStrictEqual(s.range(), [0, 100]);
  assert.strictEqual(s.round(), true);
});

it("band.round(true) computes discrete rounded bands in a continuous range", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([0, 100]).round(true);
  assert.deepStrictEqual(s.domain().map(s), [1, 34, 67]);
  assert.strictEqual(s.bandwidth(), 33);
  s.padding(0.2);
  assert.deepStrictEqual(s.domain().map(s), [7, 38, 69]);
  assert.strictEqual(s.bandwidth(), 25);
});

it("band.copy() copies all fields", () => {
  const s1 = scaleBand().domain(["red", "green"]).range([1, 2]).round(true).paddingInner(0.1).paddingOuter(0.2);
  const s2 = s1.copy();
  assert.deepStrictEqual(s2.domain(), s1.domain());
  assert.deepStrictEqual(s2.range(), s1.range());
  assert.strictEqual(s2.round(), s1.round());
  assert.strictEqual(s2.paddingInner(), s1.paddingInner());
  assert.strictEqual(s2.paddingOuter(), s1.paddingOuter());
});

it("band.copy() isolates changes to the domain", () => {
  const s1 = scaleBand().domain(["foo", "bar"]).range([0, 2]);
  const s2 = s1.copy();
  s1.domain(["red", "blue"]);
  assert.deepStrictEqual(s2.domain(), ["foo", "bar"]);
  assert.deepStrictEqual(s1.domain().map(s1), [0, 1]);
  assert.deepStrictEqual(s2.domain().map(s2), [0, 1]);
  s2.domain(["red", "blue"]);
  assert.deepStrictEqual(s1.domain(), ["red", "blue"]);
  assert.deepStrictEqual(s1.domain().map(s1), [0, 1]);
  assert.deepStrictEqual(s2.domain().map(s2), [0, 1]);
});

it("band.copy() isolates changes to the range", () => {
  const s1 = scaleBand().domain(["foo", "bar"]).range([0, 2]);
  const s2 = s1.copy();
  s1.range([3, 5]);
  assert.deepStrictEqual(s2.range(), [0, 2]);
  assert.deepStrictEqual(s1.domain().map(s1), [3, 4]);
  assert.deepStrictEqual(s2.domain().map(s2), [0, 1]);
  s2.range([5, 7]);
  assert.deepStrictEqual(s1.range(), [3, 5]);
  assert.deepStrictEqual(s1.domain().map(s1), [3, 4]);
  assert.deepStrictEqual(s2.domain().map(s2), [5, 6]);
});

// TODO align tests for padding & round
