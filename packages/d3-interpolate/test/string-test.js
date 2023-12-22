import assert from "assert";
import {interpolateString} from "../src/index.js";

it("interpolateString(a, b) interpolates matching numbers in a and b", () => {
  assert.strictEqual(interpolateString(" 10/20 30", "50/10 100 ")(0.2), "18/18 44 ");
  assert.strictEqual(interpolateString(" 10/20 30", "50/10 100 ")(0.4), "26/16 58 ");
});

it("interpolateString(a, b) coerces a and b to strings", () => {
  assert.strictEqual(interpolateString({toString: function() { return "2px"; }}, {toString: function() { return "12px"; }})(0.25), "4.5px");
});

it("interpolateString(a, b) preserves non-numbers in string b", () => {
  assert.strictEqual(interpolateString(" 10/20 30", "50/10 foo ")(0.2), "18/18 foo ");
  assert.strictEqual(interpolateString(" 10/20 30", "50/10 foo ")(0.4), "26/16 foo ");
});

it("interpolateString(a, b) preserves non-matching numbers in string b", () => {
  assert.strictEqual(interpolateString(" 10/20 foo", "50/10 100 ")(0.2), "18/18 100 ");
  assert.strictEqual(interpolateString(" 10/20 bar", "50/10 100 ")(0.4), "26/16 100 ");
});

it("interpolateString(a, b) preserves equal-value numbers in both strings", () => {
  assert.strictEqual(interpolateString(" 10/20 100 20", "50/10 100, 20 ")(0.2), "18/18 100, 20 ");
  assert.strictEqual(interpolateString(" 10/20 100 20", "50/10 100, 20 ")(0.4), "26/16 100, 20 ");
});

it("interpolateString(a, b) interpolates decimal notation correctly", () => {
  assert.strictEqual(interpolateString("1.", "2.")(0.5), "1.5");
});

it("interpolateString(a, b) interpolates exponent notation correctly", () => {
  assert.strictEqual(interpolateString("1e+3", "1e+4")(0.5), "5500");
  assert.strictEqual(interpolateString("1e-3", "1e-4")(0.5), "0.00055");
  assert.strictEqual(interpolateString("1.e-3", "1.e-4")(0.5), "0.00055");
  assert.strictEqual(interpolateString("-1.e-3", "-1.e-4")(0.5), "-0.00055");
  assert.strictEqual(interpolateString("+1.e-3", "+1.e-4")(0.5), "0.00055");
  assert.strictEqual(interpolateString(".1e-2", ".1e-3")(0.5), "0.00055");
});

it("interpolateString(a, b) with no numbers, returns the target string", () => {
  assert.strictEqual(interpolateString("foo", "bar")(0.5), "bar");
  assert.strictEqual(interpolateString("foo", "")(0.5), "");
  assert.strictEqual(interpolateString("", "bar")(0.5), "bar");
  assert.strictEqual(interpolateString("", "")(0.5), "");
});

it("interpolateString(a, b) with two numerically-equivalent numbers, returns the default format", () => {
  assert.strictEqual(interpolateString("top: 1000px;", "top: 1e3px;")(0.5), "top: 1000px;");
  assert.strictEqual(interpolateString("top: 1e3px;", "top: 1000px;")(0.5), "top: 1000px;");
});
