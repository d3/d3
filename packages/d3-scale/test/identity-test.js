import assert from "assert";
import {scaleIdentity} from "../src/index.js";

it("scaleIdentity() has the expected defaults", () => {
  const s = scaleIdentity();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
});

it("scaleIdentity(range) sets the domain and range", () => {
  const s = scaleIdentity([1, 2]);
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("identity(x) is the identity function", () => {
  const s = scaleIdentity().domain([1, 2]);
  assert.strictEqual(s(0.5), 0.5);
  assert.strictEqual(s(1), 1);
  assert.strictEqual(s(1.5), 1.5);
  assert.strictEqual(s(2), 2);
  assert.strictEqual(s(2.5), 2.5);
});

it("identity(x) coerces input to a number", () => {
  const s = scaleIdentity().domain([1, 2]);
  assert.strictEqual(s("2"), 2);
});

it("identity(undefined) returns unknown", () => {
  const s = scaleIdentity().unknown(-1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(null), -1);
  assert.strictEqual(s(NaN), -1);
  assert.strictEqual(s("N/A"), -1);
  assert.strictEqual(s(0.4), 0.4);
});

it("identity.invert(y) is the identity function", () => {
  const s = scaleIdentity().domain([1, 2]);
  assert.strictEqual(s.invert(0.5), 0.5);
  assert.strictEqual(s.invert(1), 1);
  assert.strictEqual(s.invert(1.5), 1.5);
  assert.strictEqual(s.invert(2), 2);
  assert.strictEqual(s.invert(2.5), 2.5);
});

it("identity.invert(y) coerces range value to numbers", () => {
  const s = scaleIdentity().range(["0", "2"]);
  assert.strictEqual(s.invert("1"), 1);
  s.range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
  assert.strictEqual(s.invert(new Date(1990, 6, 2, 13)), +new Date(1990, 6, 2, 13));
  s.range(["#000", "#fff"]);
  assert(isNaN(s.invert("#999")));
});

it("identity.invert(y) coerces input to a number", () => {
  const s = scaleIdentity().domain([1, 2]);
  assert.strictEqual(s.invert("2"), 2);
});

it("identity.domain() is an alias for range()", () => {
  const s = scaleIdentity();
  assert.strictEqual(s.domain, s.range);
  assert.deepStrictEqual(s.domain(), s.range());
  s.domain([-10, 0, 100]);
  assert.deepStrictEqual(s.range(), [-10, 0, 100]);
  s.range([-10, 0, 100]);
  assert.deepStrictEqual(s.domain(), [-10, 0, 100]);
});

it("identity.domain() defaults to [0, 1]", () => {
  const s = scaleIdentity();
  assert.deepStrictEqual(s.domain(), [0, 1]);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s(0.5), 0.5);
});

it("identity.domain() coerces values to numbers", () => {
  const s = scaleIdentity().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
  assert.strictEqual(typeof s.domain()[0], "number");
  assert.strictEqual(typeof s.domain()[1], "number");
  assert.strictEqual(s.domain()[0], +new Date(1990, 0, 1));
  assert.strictEqual(s.domain()[1], +new Date(1991, 0, 1));
  assert.strictEqual(typeof s(new Date(1989, 9, 20)), "number");
  assert.strictEqual(s(new Date(1989, 9, 20)), +new Date(1989, 9, 20));
  s.domain(["0", "1"]);
  assert.strictEqual(typeof s.domain()[0], "number");
  assert.strictEqual(typeof s.domain()[1], "number");
  assert.strictEqual(s(0.5), 0.5);
  s.domain([new Number(0), new Number(1)]);
  assert.strictEqual(typeof s.domain()[0], "number");
  assert.strictEqual(typeof s.domain()[1], "number");
  assert.strictEqual(s(0.5), 0.5);
  s.range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
  assert.strictEqual(typeof s.range()[0], "number");
  assert.strictEqual(typeof s.range()[1], "number");
  assert.strictEqual(s.range()[0], +new Date(1990, 0, 1));
  assert.strictEqual(s.range()[1], +new Date(1991, 0, 1));
  assert.strictEqual(typeof s(new Date(1989, 9, 20)), "number");
  assert.strictEqual(s(new Date(1989, 9, 20)), +new Date(1989, 9, 20));
  s.range(["0", "1"]);
  assert.strictEqual(typeof s.range()[0], "number");
  assert.strictEqual(typeof s.range()[1], "number");
  assert.strictEqual(s(0.5), 0.5);
  s.range([new Number(0), new Number(1)]);
  assert.strictEqual(typeof s.range()[0], "number");
  assert.strictEqual(typeof s.range()[1], "number");
  assert.strictEqual(s(0.5), 0.5);
});

it("identity.domain() accepts an iterable", () => {
  const s = scaleIdentity().domain(new Set([1, 2]));
  assert.deepStrictEqual(s.domain(), [1, 2]);
  assert.deepStrictEqual(s.range(), [1, 2]);
});

it("identity.domain() can specify a polyidentity domain and range", () => {
  const s = scaleIdentity().domain([-10, 0, 100]);
  assert.deepStrictEqual(s.domain(), [-10, 0, 100]);
  assert.strictEqual(s(-5), -5);
  assert.strictEqual(s(50), 50);
  assert.strictEqual(s(75), 75);
  s.range([-10, 0, 100]);
  assert.deepStrictEqual(s.range(), [-10, 0, 100]);
  assert.strictEqual(s(-5), -5);
  assert.strictEqual(s(50), 50);
  assert.strictEqual(s(75), 75);
});

it("identity.domain() does not affect the identity function", () => {
  const s = scaleIdentity().domain([Infinity, NaN]);
  assert.strictEqual(s(42), 42);
  assert.strictEqual(s.invert(-42), -42);
});

it("identity.ticks(count) generates ticks of varying degree", () => {
  const s = scaleIdentity();
  assert.deepStrictEqual(s.ticks(1).map(s.tickFormat(1)), ["0", "1"]);
  assert.deepStrictEqual(s.ticks(2).map(s.tickFormat(2)), ["0.0", "0.5", "1.0"]);
  assert.deepStrictEqual(s.ticks(5).map(s.tickFormat(5)), ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"]);
  assert.deepStrictEqual(s.ticks(10).map(s.tickFormat(10)), ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"]);
  s.domain([1, 0]);
  assert.deepStrictEqual(s.ticks(1).map(s.tickFormat(1)), ["0", "1"].reverse());
  assert.deepStrictEqual(s.ticks(2).map(s.tickFormat(2)), ["0.0", "0.5", "1.0"].reverse());
  assert.deepStrictEqual(s.ticks(5).map(s.tickFormat(5)), ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"].reverse());
  assert.deepStrictEqual(s.ticks(10).map(s.tickFormat(10)), ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0"].reverse());
});

it("identity.tickFormat(count) formats ticks with the appropriate precision", () => {
  const s = scaleIdentity().domain([0.123456789, 1.23456789]);
  assert.strictEqual(s.tickFormat(1)(s.ticks(1)[0]), "1");
  assert.strictEqual(s.tickFormat(2)(s.ticks(2)[0]), "0.5");
  assert.strictEqual(s.tickFormat(4)(s.ticks(4)[0]), "0.2");
  assert.strictEqual(s.tickFormat(8)(s.ticks(8)[0]), "0.2");
  assert.strictEqual(s.tickFormat(16)(s.ticks(16)[0]), "0.15");
  assert.strictEqual(s.tickFormat(32)(s.ticks(32)[0]), "0.15");
  assert.strictEqual(s.tickFormat(64)(s.ticks(64)[0]), "0.14");
  assert.strictEqual(s.tickFormat(128)(s.ticks(128)[0]), "0.13");
  assert.strictEqual(s.tickFormat(256)(s.ticks(256)[0]), "0.125");
});

it("identity.copy() isolates changes to the domain or range", () => {
  const s1 = scaleIdentity();
  const s2 = s1.copy();
  const s3 = s1.copy();
  s1.domain([1, 2]);
  assert.deepStrictEqual(s2.domain(), [0, 1]);
  s2.domain([2, 3]);
  assert.deepStrictEqual(s1.domain(), [1, 2]);
  assert.deepStrictEqual(s2.domain(), [2, 3]);
  const s4 = s3.copy();
  s3.range([1, 2]);
  assert.deepStrictEqual(s4.range(), [0, 1]);
  s4.range([2, 3]);
  assert.deepStrictEqual(s3.range(), [1, 2]);
  assert.deepStrictEqual(s4.range(), [2, 3]);
});
