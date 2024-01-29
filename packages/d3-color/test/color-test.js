import assert from "assert";
import {color} from "../src/index.js";
import {assertHslEqual, assertRgbApproxEqual, assertRgbEqual} from "./asserts.js";

it("color(format) parses CSS color names (e.g., \"rebeccapurple\")", () => {
  assertRgbApproxEqual(color("moccasin"), 255, 228, 181, 1);
  assertRgbApproxEqual(color("aliceblue"), 240, 248, 255, 1);
  assertRgbApproxEqual(color("yellow"), 255, 255, 0, 1);
  assertRgbApproxEqual(color("moccasin"), 255, 228, 181, 1);
  assertRgbApproxEqual(color("aliceblue"), 240, 248, 255, 1);
  assertRgbApproxEqual(color("yellow"), 255, 255, 0, 1);
  assertRgbApproxEqual(color("rebeccapurple"), 102, 51, 153, 1);
  assertRgbApproxEqual(color("transparent"), NaN, NaN, NaN, 0);
});

it("color(format) parses 6-digit hexadecimal (e.g., \"#abcdef\")", () => {
  assertRgbApproxEqual(color("#abcdef"), 171, 205, 239, 1);
});

it("color(format) parses 3-digit hexadecimal (e.g., \"#abc\")", () => {
  assertRgbApproxEqual(color("#abc"), 170, 187, 204, 1);
});

it("color(format) does not parse 7-digit hexadecimal (e.g., \"#abcdef3\")", () => {
  assert.strictEqual(color("#abcdef3"), null);
});

it("color(format) parses 8-digit hexadecimal (e.g., \"#abcdef33\")", () => {
  assertRgbApproxEqual(color("#abcdef33"), 171, 205, 239, 0.2);
});

it("color(format) parses 4-digit hexadecimal (e.g., \"#abc3\")", () => {
  assertRgbApproxEqual(color("#abc3"), 170, 187, 204, 0.2);
});

it("color(format) parses RGB integer format (e.g., \"rgb(12,34,56)\")", () => {
  assertRgbApproxEqual(color("rgb(12,34,56)"), 12, 34, 56, 1);
});

it("color(format) parses RGBA integer format (e.g., \"rgba(12,34,56,0.4)\")", () => {
  assertRgbApproxEqual(color("rgba(12,34,56,0.4)"), 12, 34, 56, 0.4);
});

it("color(format) parses RGB percentage format (e.g., \"rgb(12%,34%,56%)\")", () => {
  assertRgbApproxEqual(color("rgb(12%,34%,56%)"), 31, 87, 143, 1);
  assertRgbEqual(color("rgb(100%,100%,100%)"), 255, 255, 255, 1);
});

it("color(format) parses RGBA percentage format (e.g., \"rgba(12%,34%,56%,0.4)\")", () => {
  assertRgbApproxEqual(color("rgba(12%,34%,56%,0.4)"), 31, 87, 143, 0.4);
  assertRgbEqual(color("rgba(100%,100%,100%,0.4)"), 255, 255, 255, 0.4);
});

it("color(format) parses HSL format (e.g., \"hsl(60,100%,20%)\")", () => {
  assertHslEqual(color("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
});

it("color(format) parses HSLA format (e.g., \"hsla(60,100%,20%,0.4)\")", () => {
  assertHslEqual(color("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
});

it("color(format) ignores leading and trailing whitespace", () => {
  assertRgbApproxEqual(color(" aliceblue\t\n"), 240, 248, 255, 1);
  assertRgbApproxEqual(color(" #abc\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(color(" #aabbcc\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(color(" rgb(120,30,50)\t\n"), 120, 30, 50, 1);
  assertHslEqual(color(" hsl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
});

it("color(format) ignores whitespace between numbers", () => {
  assertRgbApproxEqual(color(" rgb( 120 , 30 , 50 ) "), 120, 30, 50, 1);
  assertHslEqual(color(" hsl( 120 , 30% , 50% ) "), 120, 0.3, 0.5, 1);
  assertRgbApproxEqual(color(" rgba( 12 , 34 , 56 , 0.4 ) "), 12, 34, 56, 0.4);
  assertRgbApproxEqual(color(" rgba( 12% , 34% , 56% , 0.4 ) "), 31, 87, 143, 0.4);
  assertHslEqual(color(" hsla( 60 , 100% , 20% , 0.4 ) "), 60, 1, 0.2, 0.4);
});

it("color(format) allows number signs", () => {
  assertRgbApproxEqual(color("rgb(+120,+30,+50)"), 120, 30, 50, 1);
  assertHslEqual(color("hsl(+120,+30%,+50%)"), 120, 0.3, 0.5, 1);
  assertRgbApproxEqual(color("rgb(-120,-30,-50)"), -120, -30, -50, 1);
  assertHslEqual(color("hsl(-120,-30%,-50%)"), NaN, NaN, -0.5, 1);
  assertRgbApproxEqual(color("rgba(12,34,56,+0.4)"), 12, 34, 56, 0.4);
  assertRgbApproxEqual(color("rgba(12,34,56,-0.4)"), NaN, NaN, NaN, -0.4);
  assertRgbApproxEqual(color("rgba(12%,34%,56%,+0.4)"), 31, 87, 143, 0.4);
  assertRgbApproxEqual(color("rgba(12%,34%,56%,-0.4)"), NaN, NaN, NaN, -0.4);
  assertHslEqual(color("hsla(60,100%,20%,+0.4)"), 60, 1, 0.2, 0.4);
  assertHslEqual(color("hsla(60,100%,20%,-0.4)"), NaN, NaN, NaN, -0.4);
});

it("color(format) allows decimals for non-integer values", () => {
  assertRgbApproxEqual(color("rgb(20.0%,30.4%,51.2%)"), 51, 78, 131, 1);
  assertHslEqual(color("hsl(20.0,30.4%,51.2%)"), 20, 0.304, 0.512, 1);
});

it("color(format) allows leading decimal for hue, opacity and percentages", () => {
  assertHslEqual(color("hsl(.9,.3%,.5%)"), 0.9, 0.003, 0.005, 1);
  assertHslEqual(color("hsla(.9,.3%,.5%,.5)"), 0.9, 0.003, 0.005, 0.5);
  assertRgbApproxEqual(color("rgb(.1%,.2%,.3%)"), 0, 1, 1, 1);
  assertRgbApproxEqual(color("rgba(120,30,50,.5)"), 120, 30, 50, 0.5);
});

it("color(format) allows exponential format for hue, opacity and percentages", () => {
  assertHslEqual(color("hsl(1e1,2e1%,3e1%)"), 10, 0.2, 0.3, 1);
  assertHslEqual(color("hsla(9e-1,3e-1%,5e-1%,5e-1)"), 0.9, 0.003, 0.005, 0.5);
  assertRgbApproxEqual(color("rgb(1e-1%,2e-1%,3e-1%)"), 0, 1, 1, 1);
  assertRgbApproxEqual(color("rgba(120,30,50,1e-1)"), 120, 30, 50, 0.1);
});

it("color(format) does not allow decimals for integer values", () => {
  assert.strictEqual(color("rgb(120.5,30,50)"), null);
});

it("color(format) does not allow empty decimals", () => {
  assert.strictEqual(color("rgb(120.,30,50)"), null);
  assert.strictEqual(color("rgb(120.%,30%,50%)"), null);
  assert.strictEqual(color("rgba(120,30,50,1.)"), null);
  assert.strictEqual(color("rgba(12%,30%,50%,1.)"), null);
  assert.strictEqual(color("hsla(60,100%,20%,1.)"), null);
});

it("color(format) does not allow made-up names", () => {
  assert.strictEqual(color("bostock"), null);
});

it("color(format) allows achromatic colors", () => {
  assertRgbApproxEqual(color("rgba(0,0,0,0)"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(color("#0000"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(color("#00000000"), NaN, NaN, NaN, 0);
});

it("color(format) does not allow whitespace before open paren or percent sign", () => {
  assert.strictEqual(color("rgb (120,30,50)"), null);
  assert.strictEqual(color("rgb (12%,30%,50%)"), null);
  assert.strictEqual(color("hsl (120,30%,50%)"), null);
  assert.strictEqual(color("hsl(120,30 %,50%)"), null);
  assert.strictEqual(color("rgba (120,30,50,1)"), null);
  assert.strictEqual(color("rgba (12%,30%,50%,1)"), null);
  assert.strictEqual(color("hsla (120,30%,50%,1)"), null);
});

it("color(format) is case-insensitive", () => {
  assertRgbApproxEqual(color("aLiCeBlUE"), 240, 248, 255, 1);
  assertRgbApproxEqual(color("transPARENT"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(color(" #aBc\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(color(" #aaBBCC\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(color(" rGB(120,30,50)\t\n"), 120, 30, 50, 1);
  assertHslEqual(color(" HSl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
});

it("color(format) returns undefined RGB channel values for unknown formats", () => {
  assert.strictEqual(color("invalid"), null);
  assert.strictEqual(color("hasOwnProperty"), null);
  assert.strictEqual(color("__proto__"), null);
  assert.strictEqual(color("#ab"), null);
});

it("color(format).hex() returns a hexadecimal string", () => {
  assert.strictEqual(color("rgba(12%,34%,56%,0.4)").hex(), "#1f578f");
});
