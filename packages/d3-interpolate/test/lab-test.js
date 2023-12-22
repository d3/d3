import assert from "assert";
import {hsl, lab, rgb} from "d3-color";
import {interpolateLab} from "../src/index.js";

it("interpolateLab(a, b) converts a and b to Lab colors", () => {
  assert.strictEqual(interpolateLab("steelblue", "brown")(0), rgb("steelblue") + "");
  assert.strictEqual(interpolateLab("steelblue", hsl("brown"))(1), rgb("brown") + "");
  assert.strictEqual(interpolateLab("steelblue", rgb("brown"))(1), rgb("brown") + "");
});

it("interpolateLab(a, b) interpolates in Lab and returns an RGB string", () => {
  assert.strictEqual(interpolateLab("steelblue", "#f00")(0.2), "rgb(134, 120, 146)");
  assert.strictEqual(interpolateLab("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(134, 120, 146, 0.84)");
});

it("interpolateLab(a, b) uses b’s channel value when a’s channel value is undefined", () => {
  assert.strictEqual(interpolateLab(null, lab(20, 40, 60))(0.5), lab(20, 40, 60) + "");
  assert.strictEqual(interpolateLab(lab(NaN, 20, 40), lab(60, 80, 100))(0.5), lab(60, 50, 70) + "");
  assert.strictEqual(interpolateLab(lab(20, NaN, 40), lab(60, 80, 100))(0.5), lab(40, 80, 70) + "");
  assert.strictEqual(interpolateLab(lab(20, 40, NaN), lab(60, 80, 100))(0.5), lab(40, 60, 100) + "");
});

it("interpolateLab(a, b) uses a’s channel value when b’s channel value is undefined", () => {
  assert.strictEqual(interpolateLab(lab(20, 40, 60), null)(0.5), lab(20, 40, 60) + "");
  assert.strictEqual(interpolateLab(lab(60, 80, 100), lab(NaN, 20, 40))(0.5), lab(60, 50, 70) + "");
  assert.strictEqual(interpolateLab(lab(60, 80, 100), lab(20, NaN, 40))(0.5), lab(40, 80, 70) + "");
  assert.strictEqual(interpolateLab(lab(60, 80, 100), lab(20, 40, NaN))(0.5), lab(40, 60, 100) + "");
});
