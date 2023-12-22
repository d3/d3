import assert from "assert";
import {scaleImplicit, scaleOrdinal} from "../src/index.js";

it("scaleOrdinal() has the expected defaults", () => {
  const s = scaleOrdinal();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), []);
  assert.strictEqual(s(0), undefined);
  assert.strictEqual(s.unknown(), scaleImplicit);
  assert.deepStrictEqual(s.domain(), [0]);
});

it("ordinal(x) maps a unique name x in the domain to the corresponding value y in the range", () => {
  const s = scaleOrdinal().domain([0, 1]).range(["foo", "bar"]).unknown(undefined);
  assert.strictEqual(s(0), "foo");
  assert.strictEqual(s(1), "bar");
  s.range(["a", "b", "c"]);
  assert.strictEqual(s(0), "a");
  assert.strictEqual(s("0"), undefined);
  assert.strictEqual(s([0]), undefined);
  assert.strictEqual(s(1), "b");
  assert.strictEqual(s(new Number(1)), "b");
  assert.strictEqual(s(2), undefined);
});

it("ordinal(x) implicitly extends the domain when a range is explicitly specified", () => {
  const s = scaleOrdinal().range(["foo", "bar"]);
  assert.deepStrictEqual(s.domain(), []);
  assert.strictEqual(s(0), "foo");
  assert.deepStrictEqual(s.domain(), [0]);
  assert.strictEqual(s(1), "bar");
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.strictEqual(s(0), "foo");
  assert.deepStrictEqual(s.domain(), [0, 1]);
});

it("ordinal.domain(x) makes a copy of the domain", () => {
  const domain = ["red", "green"];
  const s = scaleOrdinal().domain(domain);
  domain.push("blue");
  assert.deepStrictEqual(s.domain(), ["red", "green"]);
});

it("ordinal.domain() returns a copy of the domain", () => {
  const s = scaleOrdinal().domain(["red", "green"]);
  const domain = s.domain();
  s("blue");
  assert.deepStrictEqual(domain, ["red", "green"]);
});

it("ordinal.domain() accepts an iterable", () => {
  const s = scaleOrdinal().domain(new Set(["red", "green"]));
  assert.deepStrictEqual(s.domain(), ["red", "green"]);
});

it("ordinal.domain() replaces previous domain values", () => {
  const s = scaleOrdinal().range(["foo", "bar"]);
  assert.strictEqual(s(1), "foo");
  assert.strictEqual(s(0), "bar");
  assert.deepStrictEqual(s.domain(), [1, 0]);
  s.domain(["0", "1"]);
  assert.strictEqual(s("0"), "foo"); // it changed!
  assert.strictEqual(s("1"), "bar");
  assert.deepStrictEqual(s.domain(), ["0", "1"]);
});

it("ordinal.domain() uniqueness is based on primitive coercion", () => {
  const s = scaleOrdinal().domain(["foo"]).range([42, 43, 44]);
  assert.strictEqual(s(new String("foo")), 42);
  assert.strictEqual(s({valueOf: function() { return "foo"; }}), 42);
  assert.strictEqual(s({valueOf: function() { return "bar"; }}), 43);
});

it("ordinal.domain() does not coerce domain values to strings", () => {
  const s = scaleOrdinal().domain([0, 1]);
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.strictEqual(typeof s.domain()[0], "number");
  assert.strictEqual(typeof s.domain()[1], "number");
});

it("ordinal.domain() does not barf on object built-ins", () => {
  const s = scaleOrdinal().domain(["__proto__", "hasOwnProperty"]).range([42, 43]);
  assert.strictEqual(s("__proto__"), 42);
  assert.strictEqual(s("hasOwnProperty"), 43);
  assert.deepStrictEqual(s.domain(), ["__proto__", "hasOwnProperty"]);
});

it("ordinal() accepts dates", () => {
  const s = scaleOrdinal();
  s(new Date(1970, 2, 1));
  s(new Date(2001, 4, 13));
  s(new Date(1970, 2, 1));
  s(new Date(2001, 4, 13));
  assert.deepStrictEqual(s.domain(), [new Date(1970, 2, 1), new Date(2001, 4, 13)]);
});

it("ordinal.domain() accepts dates", () => {
  const s = scaleOrdinal().domain([
    new Date(1970, 2, 1),
    new Date(2001, 4, 13),
    new Date(1970, 2, 1),
    new Date(2001, 4, 13)
  ]);
  s(new Date(1970, 2, 1));
  s(new Date(1999, 11, 31));
  assert.deepStrictEqual(s.domain(), [new Date(1970, 2, 1), new Date(2001, 4, 13), new Date(1999, 11, 31)]);
});

it("ordinal.domain() does not barf on object built-ins", () => {
  const s = scaleOrdinal().domain(["__proto__", "hasOwnProperty"]).range([42, 43]);
  assert.strictEqual(s("__proto__"), 42);
  assert.strictEqual(s("hasOwnProperty"), 43);
  assert.deepStrictEqual(s.domain(), ["__proto__", "hasOwnProperty"]);
});

it("ordinal.domain() is ordered by appearance", () => {
  const s = scaleOrdinal();
  s("foo");
  s("bar");
  s("baz");
  assert.deepStrictEqual(s.domain(), ["foo", "bar", "baz"]);
  s.domain(["baz", "bar"]);
  s("foo");
  assert.deepStrictEqual(s.domain(), ["baz", "bar", "foo"]);
  s.domain(["baz", "foo"]);
  assert.deepStrictEqual(s.domain(), ["baz", "foo"]);
  s.domain([]);
  s("foo");
  s("bar");
  assert.deepStrictEqual(s.domain(), ["foo", "bar"]);
});

it("ordinal.range(x) makes a copy of the range", () => {
  const range = ["red", "green"];
  const s = scaleOrdinal().range(range);
  range.push("blue");
  assert.deepStrictEqual(s.range(), ["red", "green"]);
});

it("ordinal.range() accepts an iterable", () => {
  const s = scaleOrdinal().range(new Set(["red", "green"]));
  assert.deepStrictEqual(s.range(), ["red", "green"]);
});

it("ordinal.range() returns a copy of the range", () => {
  const s = scaleOrdinal().range(["red", "green"]);
  const range = s.range();
  assert.deepStrictEqual(range, ["red", "green"]);
  range.push("blue");
  assert.deepStrictEqual(s.range(), ["red", "green"]);
});

it("ordinal.range(values) does not discard implicit domain associations", () => {
  const s = scaleOrdinal();
  assert.strictEqual(s(0), undefined);
  assert.strictEqual(s(1), undefined);
  s.range(["foo", "bar"]);
  assert.strictEqual(s(1), "bar");
  assert.strictEqual(s(0), "foo");
});

it("ordinal(value) recycles values when exhausted", () => {
  const s = scaleOrdinal().range(["a", "b", "c"]);
  assert.strictEqual(s(0), "a");
  assert.strictEqual(s(1), "b");
  assert.strictEqual(s(2), "c");
  assert.strictEqual(s(3), "a");
  assert.strictEqual(s(4), "b");
  assert.strictEqual(s(5), "c");
  assert.strictEqual(s(2), "c");
  assert.strictEqual(s(1), "b");
  assert.strictEqual(s(0), "a");
});

it("ordinal.unknown(x) sets the output value for unknown inputs", () => {
  const s = scaleOrdinal().domain(["foo", "bar"]).unknown("gray").range(["red", "blue"]);
  assert.strictEqual(s("foo"), "red");
  assert.strictEqual(s("bar"), "blue");
  assert.strictEqual(s("baz"), "gray");
  assert.strictEqual(s("quux"), "gray");
});

it("ordinal.unknown(x) prevents implicit domain extension if x is not implicit", () => {
  const s = scaleOrdinal().domain(["foo", "bar"]).unknown(undefined).range(["red", "blue"]);
  assert.strictEqual(s("baz"), undefined);
  assert.deepStrictEqual(s.domain(), ["foo", "bar"]);
});

it("ordinal.copy() copies all fields", () => {
  const s1 = scaleOrdinal().domain([1, 2]).range(["red", "green"]).unknown("gray");
  const s2 = s1.copy();
  assert.deepStrictEqual(s2.domain(), s1.domain());
  assert.deepStrictEqual(s2.range(), s1.range());
  assert.deepStrictEqual(s2.unknown(), s1.unknown());
});

it("ordinal.copy() changes to the domain are isolated", () => {
  const s1 = scaleOrdinal().range(["foo", "bar"]);
  const s2 = s1.copy();
  s1.domain([1, 2]);
  assert.deepStrictEqual(s2.domain(), []);
  assert.strictEqual(s1(1), "foo");
  assert.strictEqual(s2(1), "foo");
  s2.domain([2, 3]);
  assert.strictEqual(s1(2), "bar");
  assert.strictEqual(s2(2), "foo");
  assert.deepStrictEqual(s1.domain(), [1, 2]);
  assert.deepStrictEqual(s2.domain(), [2, 3]);
});

it("ordinal.copy() changes to the range are isolated", () => {
  const s1 = scaleOrdinal().range(["foo", "bar"]);
  const s2 = s1.copy();
  s1.range(["bar", "foo"]);
  assert.strictEqual(s1(1), "bar");
  assert.strictEqual(s2(1), "foo");
  assert.deepStrictEqual(s2.range(), ["foo", "bar"]);
  s2.range(["foo", "baz"]);
  assert.strictEqual(s1(2), "foo");
  assert.strictEqual(s2(2), "baz");
  assert.deepStrictEqual(s1.range(), ["bar", "foo"]);
  assert.deepStrictEqual(s2.range(), ["foo", "baz"]);
});
