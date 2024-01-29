import assert from "assert";
import {color, hcl, hsl, lab, rgb} from "../src/index.js";
import {assertLabEqual, assertRgbApproxEqual} from "./asserts.js";

it("lab(…) returns an instance of lab and color", () => {
  const c = lab(120, 40, 50);
  assert(c instanceof lab);
  assert(c instanceof color);
});

it("lab(…) exposes l, a and b channel values and opacity", () => {
  assertLabEqual(lab("rgba(170, 187, 204, 0.4)"), 74.96879980931759, -3.398998724348956, -10.696507207853333, 0.4);
});

it("lab.toString() converts to RGB and formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(lab("#abcdef") + "", "rgb(171, 205, 239)");
  assert.strictEqual(lab("moccasin") + "", "rgb(255, 228, 181)");
  assert.strictEqual(lab("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.strictEqual(lab("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  assert.strictEqual(lab("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.strictEqual(lab(rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.strictEqual(lab(hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  assert.strictEqual(lab(hsl(60, 1, 0.2, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
});

it("lab.toString() reflects l, a and b channel values and opacity", () => {
  const c = lab("#abc");
  c.l += 10, c.a -= 10, c.b += 10, c.opacity = 0.4;
  assert.strictEqual(c + "", "rgba(184, 220, 213, 0.4)");
});

it("lab.toString() treats undefined channel values as 0", () => {
  assert.strictEqual(lab("invalid") + "", "rgb(0, 0, 0)");
  assert.strictEqual(lab(NaN, 0, 0) + "", "rgb(0, 0, 0)");
  assert.strictEqual(lab(50, NaN, 0) + "", "rgb(119, 119, 119)");
  assert.strictEqual(lab(50, 0, NaN) + "", "rgb(119, 119, 119)");
  assert.strictEqual(lab(50, NaN, NaN) + "", "rgb(119, 119, 119)");
});

it("lab.toString() treats undefined opacity as 1", () => {
  const c = lab("#abc");
  c.opacity = NaN;
  assert.strictEqual(c + "", "rgb(170, 187, 204)");
});

it("lab(l, a, b) does not clamp l channel value", () => {
  assertLabEqual(lab(-10, 1, 2), -10, 1, 2, 1);
  assertLabEqual(lab(0, 1, 2), 0, 1, 2, 1);
  assertLabEqual(lab(100, 1, 2), 100, 1, 2, 1);
  assertLabEqual(lab(110, 1, 2), 110, 1, 2, 1);
});

it("lab(l, a, b, opacity) does not clamp opacity to [0,1]", () => {
  assertLabEqual(lab(50, 10, 20, -0.2), 50, 10, 20, -0.2);
  assertLabEqual(lab(50, 10, 20, 1.2), 50, 10, 20, 1.2);
});

it("lab(l, a, b) coerces channel values to numbers", () => {
  assertLabEqual(lab("50", "4", "-5"), 50, 4, -5, 1);
});

it("lab(l, a, b, opacity) coerces opacity to number", () => {
  assertLabEqual(lab(50, 4, -5, "0.2"), 50, 4, -5, 0.2);
});

it("lab(l, a, b) allows undefined channel values", () => {
  assertLabEqual(lab(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  assertLabEqual(lab(undefined, 4, -5), NaN, 4, -5, 1);
  assertLabEqual(lab(42, undefined, -5), 42, NaN, -5, 1);
  assertLabEqual(lab(42, 4, undefined), 42, 4, NaN, 1);
});

it("lab(l, a, b, opacity) converts undefined opacity to 1", () => {
  assertLabEqual(lab(10, 20, 30, null), 10, 20, 30, 1);
  assertLabEqual(lab(10, 20, 30, undefined), 10, 20, 30, 1);
});

it("lab(format) parses the specified format and converts to Lab", () => {
  assertLabEqual(lab("#abcdef"), 80.77135418262527, -5.957098328496224, -20.785782794739237, 1);
  assertLabEqual(lab("#abc"), 74.96879980931759, -3.398998724348956, -10.696507207853333, 1);
  assertLabEqual(lab("rgb(12, 34, 56)"), 12.404844123471648, -2.159950219712034, -17.168132391132946, 1);
  assertLabEqual(lab("rgb(12%, 34%, 56%)"), 35.48300043476593, -2.507637675606522, -36.95112983195855, 1);
  assertLabEqual(lab("rgba(12%, 34%, 56%, 0.4)"), 35.48300043476593, -2.507637675606522, -36.95112983195855, 0.4);
  assertLabEqual(lab("hsl(60,100%,20%)"), 41.97125732118659, -8.03835128380484, 47.65411917854332, 1);
  assertLabEqual(lab("hsla(60,100%,20%,0.4)"), 41.97125732118659, -8.03835128380484, 47.65411917854332, 0.4);
  assertLabEqual(lab("aliceblue"), 97.12294991108756, -1.773836604137824, -4.332680308569969, 1);
});

it("lab(format) returns undefined channel values for unknown formats", () => {
  assertLabEqual(lab("invalid"), NaN, NaN, NaN, NaN);
});

it("lab(lab) copies a Lab color", () => {
  const c1 = lab(50, 4, -5, 0.4);
  const c2 = lab(c1);
  assertLabEqual(c1, 50, 4, -5, 0.4);
  c1.l = c1.a = c1.b = c1.opacity = 0;
  assertLabEqual(c1, 0, 0, 0, 0);
  assertLabEqual(c2, 50, 4, -5, 0.4);
});

it("lab(hcl(lab)) doesn’t lose a and b channels if luminance is zero", () => {
  assertLabEqual(lab(hcl(lab(0, 10, 0))), 0, 10, 0, 1);
});

it("lab(rgb) converts from RGB", () => {
  assertLabEqual(lab(rgb(255, 0, 0, 0.4)), 54.29173376861782, 80.8124553179771, 69.88504032350531, 0.4);
});

it("lab(color) converts from another colorspace via rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(color.prototype);
  TestColor.prototype.rgb = function() { return rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  assertLabEqual(lab(new TestColor), 12.404844123471648, -2.159950219712034, -17.168132391132946, 0.4);
});

it("lab.brighter(k) returns a brighter color if k > 0", () => {
  const c = lab("rgba(165, 42, 42, 0.4)");
  assertLabEqual(c.brighter(0.5), 47.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  assertLabEqual(c.brighter(1), 56.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  assertLabEqual(c.brighter(2), 74.14966734671493, 50.388769337115, 31.834059255569358, 0.4);
});

it("lab.brighter(k) returns a copy", () => {
  const c1 = lab("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter(1);
  assertLabEqual(c1, 51.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
  assertLabEqual(c2, 69.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
});

it("lab.brighter() is equivalent to lab.brighter(1)", () => {
  const c1 = lab("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter();
  const c3 = c1.brighter(1);
  assertLabEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.brighter(k) is equivalent to lab.darker(-k)", () => {
  const c1 = lab("rgba(70, 130, 180, 0.4)");
  const c2 = c1.brighter(1.5);
  const c3 = c1.darker(-1.5);
  assertLabEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.darker(k) returns a darker color if k > 0", () => {
  const c = lab("rgba(165, 42, 42, 0.4)");
  assertLabEqual(c.darker(0.5), 29.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  assertLabEqual(c.darker(1), 20.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  assertLabEqual(c.darker(2), 2.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
});

it("lab.darker(k) returns a copy", () => {
  const c1 = lab("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker(1);
  assertLabEqual(c1, 51.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
  assertLabEqual(c2, 33.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
});

it("lab.darker() is equivalent to lab.darker(1)", () => {
  const c1 = lab("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker();
  const c3 = c1.darker(1);
  assertLabEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.darker(k) is equivalent to lab.brighter(-k)", () => {
  const c1 = lab("rgba(70, 130, 180, 0.4)");
  const c2 = c1.darker(1.5);
  const c3 = c1.brighter(-1.5);
  assertLabEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.rgb() converts to RGB", () => {
  const c = lab(50, 4, -5, 0.4);
  assertRgbApproxEqual(c.rgb(), 123, 117, 128, 0.4);
});
