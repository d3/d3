import assert from "assert";
import {symbol, symbolAsterisk, symbolCircle, symbolCross, symbolDiamond, symbolDiamond2, symbolPlus, symbolSquare, symbolSquare2, symbolStar, symbolTriangle, symbolTriangle2, symbolWye, symbolTimes} from "../src/index.js";
import {assertInDelta, assertPathEqual} from "./asserts.js";
import {polygonContext} from "./polygonContext.js";

it("symbol() returns a default symbol shape", () => {
  const s = symbol();
  assert.strictEqual(s.type()(), symbolCircle);
  assert.strictEqual(s.size()(), 64);
  assert.strictEqual(s.context(), null);
  assertPathEqual(s(), "M4.513517,0A4.513517,4.513517,0,1,1,-4.513517,0A4.513517,4.513517,0,1,1,4.513517,0");
});

it("symbol().size(f)(…) propagates the context and arguments to the specified function", () => {
  const expected = {that: {}, args: [42]};
  let actual;
  symbol().size(function() { actual = {that: this, args: [].slice.call(arguments)}; return 64; }).apply(expected.that, expected.args);
  assert.deepStrictEqual(actual, expected);
});

it("symbol().type(f)(…) propagates the context and arguments to the specified function", () => {
  const expected = {that: {}, args: [42]};
  let actual;
  symbol().type(function() { actual = {that: this, args: [].slice.call(arguments)}; return symbolCircle; }).apply(expected.that, expected.args);
  assert.deepStrictEqual(actual, expected);
});

it("symbol.size(size) observes the specified size function", () => {
  const size = function(d, i) { return d.z * 2 + i; },
      s = symbol().size(size);
  assert.strictEqual(s.size(), size);
  assertPathEqual(s({z: 0}, 0), "M0,0");
  assertPathEqual(s({z: Math.PI / 2}, 0), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
  assertPathEqual(s({z: 2 * Math.PI}, 0), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
  assertPathEqual(s({z: Math.PI}, 1), "M1.522600,0A1.522600,1.522600,0,1,1,-1.522600,0A1.522600,1.522600,0,1,1,1.522600,0");
  assertPathEqual(s({z: 4 * Math.PI}, 2), "M2.938813,0A2.938813,2.938813,0,1,1,-2.938813,0A2.938813,2.938813,0,1,1,2.938813,0");
});

it("symbol.size(size) observes the specified size constant", () => {
  const s = symbol();
  assert.strictEqual(s.size(42).size()(), 42);
  assertPathEqual(s.size(0)(), "M0,0");
  assertPathEqual(s.size(Math.PI)(), "M1,0A1,1,0,1,1,-1,0A1,1,0,1,1,1,0");
  assertPathEqual(s.size(4 * Math.PI)(), "M2,0A2,2,0,1,1,-2,0A2,2,0,1,1,2,0");
});

it("symbol.type(symbolAsterisk) generates the expected path", () => {
  const s = symbol().type(symbolAsterisk).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0M0,0L0,0M0,0L0,0");
  assertPathEqual(s(20), "M0,2.705108L0,-2.705108M-2.342692,-1.352554L2.342692,1.352554M-2.342692,1.352554L2.342692,-1.352554");
});

it("symbol.type(symbolCircle) generates the expected path", () => {
  const s = symbol().type(symbolCircle).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0");
  assertPathEqual(s(20), "M2.523133,0A2.523133,2.523133,0,1,1,-2.523133,0A2.523133,2.523133,0,1,1,2.523133,0");
});

it("symbol.type(symbolCross) generates a polygon with the specified size", () => {
  const p = polygonContext(), s = symbol().type(symbolCross).context(p);
  s.size(1)(); assertInDelta(p.area(), 1);
  s.size(240)(); assertInDelta(p.area(), 240);
});

it("symbol.type(symbolCross) generates the expected path", () => {
  const s = symbol().type(symbolCross).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  assertPathEqual(s(20), "M-3,-1L-1,-1L-1,-3L1,-3L1,-1L3,-1L3,1L1,1L1,3L-1,3L-1,1L-3,1Z");
});

it("symbol.type(symbolDiamond) generates a polygon with the specified size", () => {
  const p = polygonContext(), s = symbol().type(symbolDiamond).context(p);
  s.size(1)(); assertInDelta(p.area(), 1);
  s.size(240)(); assertInDelta(p.area(), 240);
});

it("symbol.type(symbolDiamond) generates the expected path", () => {
  const s = symbol().type(symbolDiamond).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0L0,0Z");
  assertPathEqual(s(10), "M0,-2.942831L1.699044,0L0,2.942831L-1.699044,0Z");
});

it("symbol.type(symbolDiamond2) generates the expected path", () => {
  const s = symbol().type(symbolDiamond2).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0L0,0Z");
  assertPathEqual(s(20), "M0,-2.800675L2.800675,0L0,2.800675L-2.800675,0Z");
});

it("symbol.type(symbolPlus) generates the expected path", () => {
  const s = symbol().type(symbolPlus).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0M0,0L0,0");
  assertPathEqual(s(20), "M-3.714814,0L3.714814,0M0,3.714814L0,-3.714814");
});

it("symbol.type(symbolStar) generates a polygon with the specified size", () => {
  const p = polygonContext(), s = symbol().type(symbolStar).context(p);
  s.size(1)(); assertInDelta(p.area(), 1);
  s.size(240)(); assertInDelta(p.area(), 240);
});

it("symbol.type(symbolStar) generates the expected path", () => {
  const s = symbol().type(symbolStar).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  assertPathEqual(s(10), "M0,-2.984649L0.670095,-0.922307L2.838570,-0.922307L1.084237,0.352290L1.754333,2.414632L0,1.140035L-1.754333,2.414632L-1.084237,0.352290L-2.838570,-0.922307L-0.670095,-0.922307Z");
});

it("symbol.type(symbolSquare) generates a polygon with the specified size", () => {
  const p = polygonContext(), s = symbol().type(symbolSquare).context(p);
  s.size(1)(); assertInDelta(p.area(), 1);
  s.size(240)(); assertInDelta(p.area(), 240);
});

it("symbol.type(symbolSquare) generates the expected path", () => {
  const s = symbol().type(symbolSquare).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0h0v0h0Z");
  assertPathEqual(s(4), "M-1,-1h2v2h-2Z");
  assertPathEqual(s(16), "M-2,-2h4v4h-4Z");
});

it("symbol.type(symbolSquare2) generates the expected path", () => {
  const s = symbol().type(symbolSquare2).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0L0,0Z");
  assertPathEqual(s(20), "M1.981603,1.981603L1.981603,-1.981603L-1.981603,-1.981603L-1.981603,1.981603Z");
});

it("symbol.type(symbolTriangle) generates a polygon with the specified size", () => {
  const p = polygonContext(), s = symbol().type(symbolTriangle).context(p);
  s.size(1)(); assertInDelta(p.area(), 1);
  s.size(240)(); assertInDelta(p.area(), 240);
});

it("symbol.type(symbolTriangle) generates the expected path", () => {
  const s = symbol().type(symbolTriangle).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0Z");
  assertPathEqual(s(10), "M0,-2.774528L2.402811,1.387264L-2.402811,1.387264Z");
});

it("symbol.type(symbolTriangle2) generates the expected path", () => {
  const s = symbol().type(symbolTriangle2).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0Z");
  assertPathEqual(s(20), "M0,-3.051786L2.642924,1.525893L-2.642924,1.525893Z");
});

it("symbol.type(symbolWye) generates a polygon with the specified size", () => {
  const p = polygonContext(), s = symbol().type(symbolWye).context(p);
  s.size(1)(); assertInDelta(p.area(), 1);
  s.size(240)(); assertInDelta(p.area(), 240);
});

it("symbol.type(symbolWye) generates the expected path", () => {
  const s = symbol().type(symbolWye).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0L0,0Z");
  assertPathEqual(s(10), "M0.853360,0.492688L0.853360,2.199408L-0.853360,2.199408L-0.853360,0.492688L-2.331423,-0.360672L-1.478063,-1.838735L0,-0.985375L1.478063,-1.838735L2.331423,-0.360672Z");
});

it("symbol.type(symbolTimes) generates the expected path", () => {
  const s = symbol().type(symbolTimes).size(function(d) { return d; });
  assertPathEqual(s(0), "M0,0L0,0M0,0L0,0");
  assertPathEqual(s(20), "M-2.647561,-2.647561L2.647561,2.647561M-2.647561,2.647561L2.647561,-2.647561");
});

it("symbol(type, size) is equivalent to symbol().type(type).size(size)", () => {
  const s0 = symbol().type(symbolCross).size(16);
  const s1 = symbol(symbolCross, 16);
  assert.strictEqual(s0(), s1());
});
