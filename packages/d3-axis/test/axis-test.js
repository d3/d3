import assert from "assert";
import {scaleLinear} from "d3-scale";
import {axisLeft} from "../src/index.js";

it("axisLeft(scale) has the expected defaults", () => {
  const s = scaleLinear();
  const a = axisLeft(s);
  assert.strictEqual(a.scale(), s);
  assert.deepStrictEqual(a.tickArguments(), []);
  assert.strictEqual(a.tickValues(), null);
  assert.strictEqual(a.tickFormat(), null);
  assert.strictEqual(a.tickSize(), 6);
  assert.strictEqual(a.tickSizeInner(), 6);
  assert.strictEqual(a.tickSizeOuter(), 6);
  assert.strictEqual(a.tickPadding(), 3);
});

it("axis.ticks(arguments…) sets the tick arguments", () => {
  const a = axisLeft(scaleLinear()).ticks(20);
  assert.deepStrictEqual(a.tickArguments(), [20]);
  a.ticks();
  assert.deepStrictEqual(a.tickArguments(), []);
});

it("axis.tickArguments(null) sets the tick arguments to the empty array", () => {
  const a = axisLeft(scaleLinear()).tickArguments(null);
  assert.deepStrictEqual(a.tickArguments(), []);
});

it("axis.tickArguments() makes a defensive copy of the tick arguments", () => {
  const a = axisLeft(scaleLinear()).tickArguments([20]);
  const v = a.tickArguments();
  v.push(10);
  assert.deepStrictEqual(a.tickArguments(), [20]);
});

it("axis.tickValues(null) clears any explicitly-set tick values", () => {
  const a = axisLeft(scaleLinear()).tickValues([1, 2, 3]);
  assert.deepStrictEqual(a.tickValues(), [1, 2, 3]);
  a.tickValues([]);
  assert.deepStrictEqual(a.tickValues(), []);
  a.tickValues(null);
  assert.strictEqual(a.tickValues(), null);
});

it("axis.tickValues(values) sets the tick values explicitly", () => {
  const a = axisLeft(scaleLinear()).tickValues([1, 2, 3]);
  assert.deepStrictEqual(a.tickValues(), [1, 2, 3]);
});

it("axis.tickValues(values) makes a defensive copy of the specified tick values", () => {
  const v = [1, 2, 3];
  const a = axisLeft(scaleLinear()).tickValues(v);
  v.push(4);
  assert.deepStrictEqual(a.tickValues(), [1, 2, 3]);
});

it("axis.tickValues() makes a defensive copy of the tick values", () => {
  const a = axisLeft(scaleLinear()).tickValues([1, 2, 3]);
  const v = a.tickValues();
  v.push(4);
  assert.deepStrictEqual(a.tickValues(), [1, 2, 3]);
});

it("axis.tickValues(values) accepts an iterable", () => {
  const a = axisLeft(scaleLinear()).tickValues(new Set([1, 2, 3]));
  assert.deepStrictEqual(a.tickValues(), [1, 2, 3]);
});
