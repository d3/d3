import assert from "assert";
import {pathRound} from "d3-path";
import {link, linkHorizontal, linkVertical, linkRadial} from "../src/index.js";
import {curveLinear, curveBumpX, curveBumpY} from "../src/index.js";
import {assertPathEqual} from "./asserts.js";

it("link(curve) returns a default link with the given curve", () => {
  const l = link(curveLinear);
  assert.strictEqual(l.source()({source: 42}), 42);
  assert.strictEqual(l.target()({target: 34}), 34);
  assert.strictEqual(l.x()([42, 34]), 42);
  assert.strictEqual(l.y()([42, 34]), 34);
  assert.strictEqual(l.context(), null);
  assertPathEqual(l({source: [0, 1], target: [2, 3]}), "M0,1L2,3");
});

it("link.source(source) sets source", () => {
  const l = link(curveLinear);
  const x = d => d.x;
  assert.strictEqual(l.source(x), l);
  assert.strictEqual(l.source(), x);
  assertPathEqual(l({x: [0, 1], target: [2, 3]}), "M0,1L2,3");
});

it("link.target(target) sets target", () => {
  const l = link(curveLinear);
  const x = d => d.x;
  assert.strictEqual(l.target(x), l);
  assert.strictEqual(l.target(), x);
  assertPathEqual(l({source: [0, 1], x: [2, 3]}), "M0,1L2,3");
});

it("link.source(f)(..args) passes arguments to the specified function f", () => {
  const source = {name: "source"};
  const target = {name: "target"};
  const data = {source, target};
  const extra = {name: "extra"};
  const actual = [];
  link(curveLinear).source(function(d) { actual.push([].slice.call(arguments)); return d; })(data, extra);
  assert.deepStrictEqual(actual, [[data, extra]]);
});

it("link.target(f)(..args) passes source and arguments to the specified function f", () => {
  const source = {name: "source"};
  const target = {name: "target"};
  const data = {source, target};
  const extra = {name: "extra"};
  const actual = [];
  link(curveLinear).target(function(d) { actual.push([].slice.call(arguments)); return d; })(data, extra);
  assert.deepStrictEqual(actual, [[data, extra]]);
});

it("link.x(x) sets x", () => {
  const l = link(curveLinear);
  const x = d => d.x;
  assert.strictEqual(l.x(x), l);
  assert.strictEqual(l.x(), x);
  assertPathEqual(l({source: {x: 0, 1: 1}, target: {x: 2, 1: 3}}), "M0,1L2,3");
});

it("link.y(y) sets y", () => {
  const l = link(curveLinear);
  const y = d => d.y;
  assert.strictEqual(l.y(y), l);
  assert.strictEqual(l.y(), y);
  assertPathEqual(l({source: {0: 0, y: 1}, target: {0: 2, y: 3}}), "M0,1L2,3");
});

it("link.x(f)(..args) passes source and arguments to the specified function f", () => {
  const source = {name: "source"};
  const target = {name: "target"};
  const data = {source, target};
  const extra = {name: "extra"};
  const actual = [];
  link(curveLinear).x(function() { actual.push([].slice.call(arguments)); })(data, extra);
  assert.deepStrictEqual(actual, [[source, extra], [target, extra]]);
});

it("link.y(f)(..args) passes source and arguments to the specified function f", () => {
  const source = {name: "source"};
  const target = {name: "target"};
  const data = {source, target};
  const extra = {name: "extra"};
  const actual = [];
  link(curveLinear).y(function() { actual.push([].slice.call(arguments)); })(data, extra);
  assert.deepStrictEqual(actual, [[source, extra], [target, extra]]);
});

it("linkHorizontal() is an alias for link(curveBumpX)", () => {
  const l = linkHorizontal(), l2 = link(curveBumpX);
  assert.strictEqual(l.source(), l2.source());
  assert.strictEqual(l.target(), l2.target());
  assert.strictEqual(l.x(), l2.x());
  assert.strictEqual(l.y(), l2.y());
  assert.strictEqual(l.context(), l2.context());
  assertPathEqual(l({source: [0, 1], target: [2, 3]}), l2({source: [0, 1], target: [2, 3]}));
});

it("linkVertical() is an alias for link(curveBumpY)", () => {
  const l = linkVertical(), l2 = link(curveBumpY);
  assert.strictEqual(l.source(), l2.source());
  assert.strictEqual(l.target(), l2.target());
  assert.strictEqual(l.x(), l2.x());
  assert.strictEqual(l.y(), l2.y());
  assert.strictEqual(l.context(), l2.context());
  assertPathEqual(l({source: [0, 1], target: [2, 3]}), l2({source: [0, 1], target: [2, 3]}));
});

it("link.context(context) sets the context", () => {
  const p = pathRound(6);
  const l = link(curveLinear).context(p);
  assert.strictEqual(l({source: [0, Math.E], target: [Math.PI, 3]}), undefined);
  assert.strictEqual(p + "", "M0,2.718282L3.141593,3");
});

it("linkRadial() works as expected", () => {
  const l = linkRadial(), l2 = link();
  assert.strictEqual(l.source(), l2.source());
  assert.strictEqual(l.target(), l2.target());
  assert.strictEqual(l.angle(), l2.x());
  assert.strictEqual(l.radius(), l2.y());
  assert.strictEqual(l.context(), l2.context());
  assertPathEqual(l({source: [0, 1], target: [Math.PI/2, 3]}), "M0,-1C0,-2,2,0,3,0");
});
