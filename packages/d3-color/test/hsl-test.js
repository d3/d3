import assert from "assert";
import {color, hsl, rgb} from "../src/index.js";
import {assertHslEqual, assertRgbApproxEqual} from "./asserts.js";

it("hsl(…) returns an instance of hsl and color", () => {
  const c = hsl(120, 0.4, 0.5);
  assert(c instanceof hsl);
  assert(c instanceof color);
});

it("hsl(…) exposes h, s, and l channel values and opacity", () => {
  assertHslEqual(hsl("#abc"), 210, 0.25, 0.7333333, 1);
  assertHslEqual(hsl("hsla(60, 100%, 20%, 0.4)"), 60, 1, 0.2, 0.4);
});

it("hsl.toString() converts to RGB and formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(hsl("#abcdef") + "", "rgb(171, 205, 239)");
  assert.strictEqual(hsl("moccasin") + "", "rgb(255, 228, 181)");
  assert.strictEqual(hsl("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.strictEqual(hsl("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  assert.strictEqual(hsl("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.strictEqual(hsl(rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.strictEqual(hsl(hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  assert.strictEqual(hsl(hsl(60, 1, 0.2, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
});

it("hsl.formatRgb() formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(hsl("#abcdef").formatRgb(), "rgb(171, 205, 239)");
  assert.strictEqual(hsl("hsl(60, 100%, 20%)").formatRgb(), "rgb(102, 102, 0)");
  assert.strictEqual(hsl("rgba(12%, 34%, 56%, 0.4)").formatRgb(), "rgba(31, 87, 143, 0.4)");
  assert.strictEqual(hsl("hsla(60, 100%, 20%, 0.4)").formatRgb(), "rgba(102, 102, 0, 0.4)");
});

it("hsl.formatHsl() formats as hsl(…) or hsla(…)", () => {
  assert.strictEqual(hsl("#abcdef").formatHsl(), "hsl(210, 68%, 80.3921568627451%)");
  assert.strictEqual(hsl("hsl(60, 100%, 20%)").formatHsl(), "hsl(60, 100%, 20%)");
  assert.strictEqual(hsl("rgba(12%, 34%, 56%, 0.4)").formatHsl(), "hsla(210, 64.70588235294117%, 34%, 0.4)");
  assert.strictEqual(hsl("hsla(60, 100%, 20%, 0.4)").formatHsl(), "hsla(60, 100%, 20%, 0.4)");
});

it("hsl.formatHsl() clamps to the expected range", () => {
  assert.strictEqual(hsl(180, -100, -50).formatHsl(), "hsl(180, 0%, 0%)");
  assert.strictEqual(hsl(180, 150, 200).formatHsl(), "hsl(180, 100%, 100%)");
  assert.strictEqual(hsl(-90, 50, 50).formatHsl(), "hsl(270, 100%, 100%)");
  assert.strictEqual(hsl(420, 50, 50).formatHsl(), "hsl(60, 100%, 100%)");
});

it("hsl.formatHex() formats as #rrggbb", () => {
  assert.strictEqual(hsl("#abcdef").formatHex(), "#abcdef");
  assert.strictEqual(hsl("hsl(60, 100%, 20%)").formatHex(), "#666600");
  assert.strictEqual(hsl("rgba(12%, 34%, 56%, 0.4)").formatHex(), "#1f578f");
  assert.strictEqual(hsl("hsla(60, 100%, 20%, 0.4)").formatHex(), "#666600");
});

it("hsl.toString() reflects h, s and l channel values and opacity", () => {
  const c = hsl("#abc");
  c.h += 10, c.s += 0.01, c.l -= 0.01, c.opacity = 0.4;
  assert.strictEqual(c + "", "rgba(166, 178, 203, 0.4)");
});

it("hsl.toString() treats undefined channel values as 0", () => {
  assert.strictEqual(hsl("invalid") + "", "rgb(0, 0, 0)");
  assert.strictEqual(hsl("#000") + "", "rgb(0, 0, 0)");
  assert.strictEqual(hsl("#ccc") + "", "rgb(204, 204, 204)");
  assert.strictEqual(hsl("#fff") + "", "rgb(255, 255, 255)");
  assert.strictEqual(hsl(NaN, 0.5, 0.4) + "", "rgb(102, 102, 102)"); // equivalent to hsl(*, 0, 0.4)
  assert.strictEqual(hsl(120, NaN, 0.4) + "", "rgb(102, 102, 102)");
  assert.strictEqual(hsl(NaN, NaN, 0.4) + "", "rgb(102, 102, 102)");
  assert.strictEqual(hsl(120, 0.5, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hsl(120, 0.5, 0)
});

it("hsl.toString() treats undefined opacity as 1", () => {
  const c = hsl("#abc");
  c.opacity = NaN;
  assert.strictEqual(c + "", "rgb(170, 187, 204)");
});

it("hsl(h, s, l) does not wrap hue to [0,360)", () => {
  assertHslEqual(hsl(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
  assertHslEqual(hsl(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
  assertHslEqual(hsl(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
  assertHslEqual(hsl(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
});

it("hsl(h, s, l) does not clamp s and l channel values to [0,1]", () => {
  assertHslEqual(hsl(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
  assertHslEqual(hsl(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
  assertHslEqual(hsl(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
  assertHslEqual(hsl(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
});

it("hsl(h, s, l).clamp() clamps channel values", () => {
  assertHslEqual(hsl(120, -0.1, -0.2).clamp(), 120, 0, 0, 1);
  assertHslEqual(hsl(120, 1.1, 1.2).clamp(), 120, 1, 1, 1);
  assertHslEqual(hsl(120, 2.1, 2.2).clamp(), 120, 1, 1, 1);
  assertHslEqual(hsl(420, -0.1, -0.2).clamp(), 60, 0, 0, 1);
  assertHslEqual(hsl(-420, -0.1, -0.2).clamp(), 300, 0, 0, 1);
  assert.strictEqual(hsl(-420, -0.1, -0.2, NaN).clamp().opacity, 1);
  assert.strictEqual(hsl(-420, -0.1, -0.2, 0.5).clamp().opacity, 0.5);
  assert.strictEqual(hsl(-420, -0.1, -0.2, -1).clamp().opacity, 0);
  assert.strictEqual(hsl(-420, -0.1, -0.2, 2).clamp().opacity, 1);
});

it("hsl(h, s, l, opacity) does not clamp opacity to [0,1]", () => {
  assertHslEqual(hsl(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
  assertHslEqual(hsl(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
});

it("hsl(h, s, l) coerces channel values to numbers", () => {
  assertHslEqual(hsl("120", ".4", ".5"), 120, 0.4, 0.5, 1);
});

it("hsl(h, s, l, opacity) coerces opacity to number", () => {
  assertHslEqual(hsl(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
  assertHslEqual(hsl(120, 0.9, 0.5, "0.9"), 120, 0.9, 0.5, 0.9);
});

it("hsl(h, s, l) allows undefined channel values", () => {
  assertHslEqual(hsl(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  assertHslEqual(hsl(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
  assertHslEqual(hsl(42, undefined, 0.5), 42, NaN, 0.5, 1);
  assertHslEqual(hsl(42, 0.4, undefined), 42, 0.4, NaN, 1);
});

it("hsl(h, s, l, opacity) converts undefined opacity to 1", () => {
  assertHslEqual(hsl(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
  assertHslEqual(hsl(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
});

it("hsl(h, s, l) preserves explicit hue, even for grays", () => {
  assertHslEqual(hsl(0, 0, 0), 0, 0, 0, 1);
  assertHslEqual(hsl(42, 0, 0.5), 42, 0, 0.5, 1);
  assertHslEqual(hsl(118, 0, 1), 118, 0, 1, 1);
});

it("hsl(h, s, l) preserves explicit saturation, even for white or black", () => {
  assertHslEqual(hsl(0, 0, 0), 0, 0, 0, 1);
  assertHslEqual(hsl(0, 0.18, 0), 0, 0.18, 0, 1);
  assertHslEqual(hsl(0, 0.42, 1), 0, 0.42, 1, 1);
  assertHslEqual(hsl(0, 1, 1), 0, 1, 1, 1);
});

it("hsl(format) parses the specified format and converts to HSL", () => {
  assertHslEqual(hsl("#abcdef"), 210, 0.68, 0.8039215, 1);
  assertHslEqual(hsl("#abc"), 210, 0.25, 0.733333333, 1);
  assertHslEqual(hsl("rgb(12, 34, 56)"), 210, 0.647058, 0.1333333, 1);
  assertHslEqual(hsl("rgb(12%, 34%, 56%)"), 210, 0.647058, 0.34, 1);
  assertHslEqual(hsl("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
  assertHslEqual(hsl("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
  assertHslEqual(hsl("aliceblue"), 208, 1, 0.9705882, 1);
  assertHslEqual(hsl("transparent"), NaN, NaN, NaN, 0);
});

it("hsl(format) ignores the hue if the saturation is <= 0", () => {
  assertHslEqual(hsl("hsl(120,0%,20%)"), NaN, 0, 0.2, 1);
  assertHslEqual(hsl("hsl(120,-10%,20%)"), NaN, -0.1, 0.2, 1);
});

it("hsl(format) ignores the hue and saturation if the lightness is <= 0 or >= 1", () => {
  assertHslEqual(hsl("hsl(120,20%,-10%)"), NaN, NaN, -0.1, 1);
  assertHslEqual(hsl("hsl(120,20%,0%)"), NaN, NaN, 0.0, 1);
  assertHslEqual(hsl("hsl(120,20%,100%)"), NaN, NaN, 1.0, 1);
  assertHslEqual(hsl("hsl(120,20%,120%)"), NaN, NaN, 1.2, 1);
});

it("hsl(format) ignores all channels if the alpha is <= 0", () => {
  assertHslEqual(hsl("hsla(120,20%,10%,0)"), NaN, NaN, NaN, 0);
  assertHslEqual(hsl("hsla(120,20%,10%,-0.1)"), NaN, NaN, NaN, -0.1);
});

it("hsl(format) does not lose precision when parsing HSL formats", () => {
  assertHslEqual(hsl("hsl(325,50%,40%)"), 325, 0.5, 0.4, 1);
});

it("hsl(format) returns undefined channel values for unknown formats", () => {
  assertHslEqual(hsl("invalid"), NaN, NaN, NaN, NaN);
});

it("hsl(hsl) copies an HSL color", () => {
  const c1 = hsl("hsla(120,30%,50%,0.4)");
  const c2 = hsl(c1);
  assertHslEqual(c1, 120, 0.3, 0.5, 0.4);
  c1.h = c1.s = c1.l = c1.opacity = 0;
  assertHslEqual(c1, 0, 0, 0, 0);
  assertHslEqual(c2, 120, 0.3, 0.5, 0.4);
});

it("hsl(rgb) converts from RGB", () => {
  assertHslEqual(hsl(rgb(255, 0, 0, 0.4)), 0, 1, 0.5, 0.4);
});

it("hsl(color) returns undefined hue and zero saturation for grays (but not white and black)", () => {
  assertHslEqual(hsl("gray"), NaN, 0, 0.5019608, 1);
  assertHslEqual(hsl("#ccc"), NaN, 0, 0.8, 1);
  assertHslEqual(hsl(rgb("gray")), NaN, 0, 0.5019608, 1);
});

it("hsl(color) returns undefined hue and saturation for black and white", () => {
  assertHslEqual(hsl("black"), NaN, NaN, 0, 1);
  assertHslEqual(hsl("#000"), NaN, NaN, 0, 1);
  assertHslEqual(hsl("white"), NaN, NaN, 1, 1);
  assertHslEqual(hsl("#fff"), NaN, NaN, 1, 1);
  assertHslEqual(hsl(rgb("#fff")), NaN, NaN, 1, 1);
});

it("hsl(color) converts from another colorspace via rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(color.prototype);
  TestColor.prototype.rgb = function() { return rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  assertHslEqual(hsl(new TestColor), 210, 0.6470588, 0.1333334, 0.4);
});

it("hsl.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]", () => {
  assert.strictEqual(hsl("white").displayable(), true);
  assert.strictEqual(hsl("red").displayable(), true);
  assert.strictEqual(hsl("black").displayable(), true);
  assert.strictEqual(hsl("invalid").displayable(), false);
  assert.strictEqual(hsl(NaN, NaN, 1).displayable(), true);
  assert.strictEqual(hsl(NaN, NaN, 1.5).displayable(), false);
  assert.strictEqual(hsl(120, -0.5, 0).displayable(), false);
  assert.strictEqual(hsl(120, 1.5, 0).displayable(), false);
  assert.strictEqual(hsl(0, 1, 1, 0).displayable(), true);
  assert.strictEqual(hsl(0, 1, 1, 1).displayable(), true);
  assert.strictEqual(hsl(0, 1, 1, -0.2).displayable(), false);
  assert.strictEqual(hsl(0, 1, 1, 1.2).displayable(), false);
});

it("hsl.brighter(k) returns a brighter color if k > 0", () => {
  const c = hsl("rgba(165, 42, 42, 0.4)");
  assertHslEqual(c.brighter(0.5), 0, 0.5942028, 0.4851222, 0.4);
  assertHslEqual(c.brighter(1), 0, 0.5942028, 0.5798319, 0.4);
  assertHslEqual(c.brighter(2), 0, 0.5942028, 0.8283313, 0.4);
});

it("hsl.brighter(k) returns a copy", () => {
  const c1 = hsl("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter(1);
  assertHslEqual(c1, 207.272727, 0.44, 0.4901961, 0.4);
  assertHslEqual(c2, 207.272727, 0.44, 0.7002801, 0.4);
});

it("hsl.brighter() is equivalent to hsl.brighter(1)", () => {
  const c1 = hsl("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter();
  const c3 = c1.brighter(1);
  assertHslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl.brighter(k) is equivalent to hsl.darker(-k)", () => {
  const c1 = hsl("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter(1.5);
  const c3 = c1.darker(-1.5);
  assertHslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl(\"black\").brighter() still returns black", () => {
  const c1 = hsl("black");
  const c2 = c1.brighter(1);
  assertHslEqual(c1, NaN, NaN, 0, 1);
  assertHslEqual(c2, NaN, NaN, 0, 1);
});

it("hsl.darker(k) returns a darker color if k > 0", () => {
  const c = hsl("rgba(165, 42, 42, 0.4)");
  assertHslEqual(c.darker(0.5), 0, 0.5942029, 0.3395855, 0.4);
  assertHslEqual(c.darker(1), 0, 0.5942029, 0.2841176, 0.4);
  assertHslEqual(c.darker(2), 0, 0.5942029, 0.1988823, 0.4);
});

it("hsl.darker(k) returns a copy", () => {
  const c1 = hsl("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker(1);
  assertHslEqual(c1, 207.272727, 0.44, 0.4901961, 0.4);
  assertHslEqual(c2, 207.272727, 0.44, 0.3431373, 0.4);
});

it("hsl.darker() is equivalent to hsl.darker(1)", () => {
  const c1 = hsl("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker();
  const c3 = c1.darker(1);
  assertHslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl.darker(k) is equivalent to hsl.brighter(-k)", () => {
  const c1 = hsl("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker(1.5);
  const c3 = c1.brighter(-1.5);
  assertHslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl.rgb() converts to RGB", () => {
  const c = hsl(120, 0.3, 0.5, 0.4);
  assertRgbApproxEqual(c.rgb(), 89, 166, 89, 0.4);
});

it("hsl.copy(…) returns a new hsl with the specified channel values", () => {
  const c = hsl(120, 0.3, 0.5, 0.4);
  assert.strictEqual(c.copy() instanceof hsl, true);
  assert.strictEqual(c.copy().formatHsl(), "hsla(120, 30%, 50%, 0.4)");
  assert.strictEqual(c.copy({opacity: 1}).formatHsl(), "hsl(120, 30%, 50%)");
  assert.strictEqual(c.copy({h: 20}).formatHsl(), "hsla(20, 30%, 50%, 0.4)");
  assert.strictEqual(c.copy({h: 20, s: 0.4}).formatHsl(), "hsla(20, 40%, 50%, 0.4)");
});
