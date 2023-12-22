import assert from "assert";
import {color, hsl, rgb} from "../src/index.js";
import {assertRgbApproxEqual, assertRgbEqual} from "./asserts.js";

it("rgb(…) returns an instance of rgb and color", () => {
  const c = rgb(70, 130, 180);
  assert(c instanceof rgb);
  assert(c instanceof color);
});

it("rgb(…) exposes r, g and b channel values and opacity", () => {
  assertRgbApproxEqual(rgb("#abc"), 170, 187, 204, 1);
  assertRgbApproxEqual(rgb("rgba(170, 187, 204, 0.4)"), 170, 187, 204, 0.4);
});

it("rgb.toString() formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(rgb("#abcdef") + "", "rgb(171, 205, 239)");
  assert.strictEqual(rgb("moccasin") + "", "rgb(255, 228, 181)");
  assert.strictEqual(rgb("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.strictEqual(rgb("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.strictEqual(rgb(rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.strictEqual(rgb(hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  assert.strictEqual(rgb("rgba(12, 34, 56, 0.4)") + "", "rgba(12, 34, 56, 0.4)");
  assert.strictEqual(rgb("rgba(12%, 34%, 56%, 0.4)") + "", "rgba(31, 87, 143, 0.4)");
  assert.strictEqual(rgb("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
});

it("rgb.formatRgb() formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(rgb("#abcdef").formatRgb(), "rgb(171, 205, 239)");
  assert.strictEqual(rgb("hsl(60, 100%, 20%)").formatRgb(), "rgb(102, 102, 0)");
  assert.strictEqual(rgb("rgba(12%, 34%, 56%, 0.4)").formatRgb(), "rgba(31, 87, 143, 0.4)");
  assert.strictEqual(rgb("hsla(60, 100%, 20%, 0.4)").formatRgb(), "rgba(102, 102, 0, 0.4)");
});

it("rgb.formatHsl() formats as hsl(…) or hsla(…)", () => {
  assert.strictEqual(rgb("#abcdef").formatHsl(), "hsl(210, 68%, 80.3921568627451%)");
  assert.strictEqual(rgb("hsl(60, 100%, 20%)").formatHsl(), "hsl(60, 100%, 20%)");
  assert.strictEqual(rgb("rgba(12%, 34%, 56%, 0.4)").formatHsl(), "hsla(210, 64.70588235294117%, 34%, 0.4)");
  assert.strictEqual(rgb("hsla(60, 100%, 20%, 0.4)").formatHsl(), "hsla(60, 100%, 20%, 0.4)");
});

it("rgb.formatHex() formats as #rrggbb", () => {
  assert.strictEqual(rgb("#abcdef").formatHex(), "#abcdef");
  assert.strictEqual(rgb("hsl(60, 100%, 20%)").formatHex(), "#666600");
  assert.strictEqual(rgb("rgba(12%, 34%, 56%, 0.4)").formatHex(), "#1f578f");
  assert.strictEqual(rgb("hsla(60, 100%, 20%, 0.4)").formatHex(), "#666600");
});

it("rgb.formatHex8() formats as #rrggbbaa", () => {
  assert.strictEqual(rgb("#abcdef").formatHex8(), "#abcdefff");
  assert.strictEqual(rgb("hsl(60, 100%, 20%)").formatHex8(), "#666600ff");
  assert.strictEqual(rgb("rgba(12%, 34%, 56%, 0.4)").formatHex8(), "#1f578f66");
  assert.strictEqual(rgb("hsla(60, 100%, 20%, 0.4)").formatHex8(), "#66660066");
});

it("rgb.hex() is an alias for rgb.formatHex()", () => {
  assert.strictEqual(color.prototype.hex, color.prototype.formatHex);
  assert.strictEqual(rgb.prototype.hex, rgb.prototype.formatHex);
});

it("rgb.toString() reflects r, g and b channel values and opacity", () => {
  const c = rgb("#abc");
  ++c.r, ++c.g, ++c.b, c.opacity = 0.5;
  assert.strictEqual(c + "", "rgba(171, 188, 205, 0.5)");
});

it("rgb.toString() treats undefined channel values as 0", () => {
  assert.strictEqual(rgb("invalid") + "", "rgb(0, 0, 0)");
  assert.strictEqual(rgb(NaN, 12, 34) + "", "rgb(0, 12, 34)");
});

it("rgb.toString() treats undefined opacity as 1", () => {
  const c = rgb("#abc");
  ++c.r, ++c.g, ++c.b, c.opacity = NaN;
  assert.strictEqual(c + "", "rgb(171, 188, 205)");
});

it("rgb.toString() clamps r, g, b and opacity channel values", () => {
  assert.strictEqual(rgb(-1,  2,  3) + "", "rgb(0, 2, 3)");
  assert.strictEqual(rgb( 2, -1,  3) + "", "rgb(2, 0, 3)");
  assert.strictEqual(rgb( 2,  3, -1) + "", "rgb(2, 3, 0)");
  assert.strictEqual(rgb( 2,  3, -1, -0.2) + "", "rgba(2, 3, 0, 0)");
  assert.strictEqual(rgb( 2,  3, -1, 1.2) + "", "rgb(2, 3, 0)");
});

it("rgb.toString() rounds r, g and b channel values", () => {
  assert.strictEqual(rgb(0.5, 2.0, 3.0) + "", "rgb(1, 2, 3)");
  assert.strictEqual(rgb(2.0, 0.5, 3.0) + "", "rgb(2, 1, 3)");
  assert.strictEqual(rgb(2.0, 3.0, 0.5) + "", "rgb(2, 3, 1)");
});

it("rgb(r, g, b) does not round channel values", () => {
  assertRgbEqual(rgb(1.2, 2.6, 42.9), 1.2, 2.6, 42.9, 1);
});

it("rgb(r, g, b) does not clamp channel values", () => {
  assertRgbApproxEqual(rgb(-10, -20, -30), -10, -20, -30, 1);
  assertRgbApproxEqual(rgb(300, 400, 500), 300, 400, 500, 1);
});

it("rgb(r, g, b).clamp() rounds and clamps channel values", () => {
  assertRgbApproxEqual(rgb(-10, -20, -30).clamp(), 0, 0, 0, 1);
  assertRgbApproxEqual(rgb(10.5, 20.5, 30.5).clamp(), 11, 21, 31, 1);
  assertRgbApproxEqual(rgb(300, 400, 500).clamp(), 255, 255, 255, 1);
  assert.strictEqual(rgb(10.5, 20.5, 30.5, -1).clamp().opacity, 0);
  assert.strictEqual(rgb(10.5, 20.5, 30.5, 0.5).clamp().opacity, 0.5);
  assert.strictEqual(rgb(10.5, 20.5, 30.5, 2).clamp().opacity, 1);
  assert.strictEqual(rgb(10.5, 20.5, 30.5, NaN).clamp().opacity, 1);
});

it("rgb(r, g, b, opacity) does not clamp opacity", () => {
  assertRgbApproxEqual(rgb(-10, -20, -30, -0.2), -10, -20, -30, -0.2);
  assertRgbApproxEqual(rgb(300, 400, 500, 1.2), 300, 400, 500, 1.2);
});

it("rgb(r, g, b) coerces channel values to numbers", () => {
  assertRgbApproxEqual(rgb("12", "34", "56"), 12, 34, 56, 1);
  assertRgbApproxEqual(rgb(null, null, null), 0, 0, 0, 1);
});

it("rgb(r, g, b, opacity) coerces opacity to number", () => {
  assertRgbEqual(rgb(-10, -20, -30, "-0.2"), -10, -20, -30, -0.2);
  assertRgbEqual(rgb(300, 400, 500, "1.2"), 300, 400, 500, 1.2);
});

it("rgb(r, g, b) allows undefined channel values", () => {
  assertRgbApproxEqual(rgb(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  assertRgbApproxEqual(rgb(undefined, 42, 56), NaN, 42, 56, 1);
  assertRgbApproxEqual(rgb(42, undefined, 56), 42, NaN, 56, 1);
  assertRgbApproxEqual(rgb(42, 56, undefined), 42, 56, NaN, 1);
});

it("rgb(r, g, b, opacity) converts undefined opacity to 1", () => {
  assertRgbApproxEqual(rgb(10, 20, 30, null), 10, 20, 30, 1);
  assertRgbApproxEqual(rgb(10, 20, 30, undefined), 10, 20, 30, 1);
});

it("rgb(format) parses the specified format and converts to RGB", () => {
  assertRgbApproxEqual(rgb("#abcdef"), 171, 205, 239, 1);
  assertRgbApproxEqual(rgb("#abc"), 170, 187, 204, 1);
  assertRgbApproxEqual(rgb("rgb(12, 34, 56)"), 12, 34, 56, 1);
  assertRgbApproxEqual(rgb("rgb(12%, 34%, 56%)"), 31, 87, 143, 1);
  assertRgbApproxEqual(rgb("hsl(60,100%,20%)"), 102, 102, 0, 1);
  assertRgbApproxEqual(rgb("aliceblue"), 240, 248, 255, 1);
  assertRgbApproxEqual(rgb("hsla(60,100%,20%,0.4)"), 102, 102, 0, 0.4);
});

it("rgb(format) ignores all channels if the alpha is <= 0", () => {
  assertRgbApproxEqual(rgb("rgba(12,34,45,0)"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(rgb("rgba(12,34,45,-0.1)"), NaN, NaN, NaN, -0.1);
});

it("rgb(format) returns undefined channel values for unknown formats", () => {
  assertRgbApproxEqual(rgb("invalid"), NaN, NaN, NaN, NaN);
});

it("rgb(rgb) copies an RGB color", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = rgb(c1);
  assertRgbApproxEqual(c1, 70, 130, 180, 0.4);
  c1.r = c1.g = c1.b = c1.opacity = 0;
  assertRgbApproxEqual(c1, 0, 0, 0, 0);
  assertRgbApproxEqual(c2, 70, 130, 180, 0.4);
});

it("rgb(hsl) converts from HSL", () => {
  assertRgbApproxEqual(rgb(hsl(0, 1, 0.5)), 255, 0, 0, 1);
  assertRgbApproxEqual(rgb(hsl(0, 1, 0.5, 0.4)), 255, 0, 0, 0.4);
});

it("rgb(color) converts from another colorspace via rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(color.prototype);
  TestColor.prototype.rgb = function() { return rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  assertRgbApproxEqual(rgb(new TestColor), 12, 34, 56, 0.4);
});

it("rgb.displayable() returns true if the color is within the RGB gamut and opacity is in [0,1]", () => {
  assert.strictEqual(rgb("white").displayable(), true);
  assert.strictEqual(rgb("red").displayable(), true);
  assert.strictEqual(rgb("black").displayable(), true);
  assert.strictEqual(rgb("invalid").displayable(), false);
  assert.strictEqual(rgb(-1, 0, 0).displayable(), false);
  assert.strictEqual(rgb(0, -1, 0).displayable(), false);
  assert.strictEqual(rgb(0, 0, -1).displayable(), false);
  assert.strictEqual(rgb(256, 0, 0).displayable(), false);
  assert.strictEqual(rgb(0, 256, 0).displayable(), false);
  assert.strictEqual(rgb(0, 0, 256).displayable(), false);
  assert.strictEqual(rgb(0, 0, 255, 0).displayable(), true);
  assert.strictEqual(rgb(0, 0, 255, 1.2).displayable(), false);
  assert.strictEqual(rgb(0, 0, 255, -0.2).displayable(), false);
});

it("rgb.brighter(k) returns a brighter color if k > 0", () => {
  const c = rgb("rgba(165, 42, 42, 0.4)");
  assertRgbApproxEqual(c.brighter(0.5), 197, 50, 50, 0.4);
  assertRgbApproxEqual(c.brighter(1), 236, 60, 60, 0.4);
  assertRgbApproxEqual(c.brighter(2), 337, 86, 86, 0.4);
});

it("rgb.brighter(k) returns a copy", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter(1);
  assertRgbApproxEqual(c1, 70, 130, 180, 0.4);
  assertRgbApproxEqual(c2, 100, 186, 257, 0.4);
});

it("rgb.brighter() is equivalent to rgb.brighter(1)", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter();
  const c3 = c1.brighter(1);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb.brighter(k) is equivalent to rgb.darker(-k)", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter(1.5);
  const c3 = c1.darker(-1.5);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb(\"black\").brighter() still returns black", () => {
  const c1 = rgb("black");
  const c2 = c1.brighter(1);
  assertRgbApproxEqual(c1, 0, 0, 0, 1);
  assertRgbApproxEqual(c2, 0, 0, 0, 1);
});

it("rgb.darker(k) returns a darker color if k > 0", () => {
  const c = rgb("rgba(165, 42, 42, 0.4)");
  assertRgbApproxEqual(c.darker(0.5), 138, 35, 35, 0.4);
  assertRgbApproxEqual(c.darker(1), 115, 29, 29, 0.4);
  assertRgbApproxEqual(c.darker(2), 81, 21, 21, 0.4);
});

it("rgb.darker(k) returns a copy", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker(1);
  assertRgbApproxEqual(c1, 70, 130, 180, 0.4);
  assertRgbApproxEqual(c2, 49, 91, 126, 0.4);
});

it("rgb.darker() is equivalent to rgb.darker(1)", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker();
  const c3 = c1.darker(1);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb.darker(k) is equivalent to rgb.brighter(-k)", () => {
  const c1 = rgb("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker(1.5);
  const c3 = c1.brighter(-1.5);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb.rgb() returns this", () => {
  const c = rgb(70, 130, 180);
  assert.strictEqual(c.rgb(), c);
});

it("rgb.copy(…) returns a new rgb with the specified channel values", () => {
  const c = rgb(70, 130, 180);
  assert.strictEqual(c.copy() instanceof rgb, true);
  assert.strictEqual(c.copy() + "", "rgb(70, 130, 180)");
  assert.strictEqual(c.copy({opacity: 0.2}) + "", "rgba(70, 130, 180, 0.2)");
  assert.strictEqual(c.copy({r: 20}) + "", "rgb(20, 130, 180)");
  assert.strictEqual(c.copy({r: 20, g: 40}) + "", "rgb(20, 40, 180)");
});
