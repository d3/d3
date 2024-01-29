import assert from "assert";
import {hsl, rgb} from "d3-color";
import {interpolateHsl} from "../src/index.js";

it("interpolateHsl(a, b) converts a and b to HSL colors", () => {
  assert.strictEqual(interpolateHsl("steelblue", "brown")(0), rgb("steelblue") + "");
  assert.strictEqual(interpolateHsl("steelblue", hsl("brown"))(1), rgb("brown") + "");
  assert.strictEqual(interpolateHsl("steelblue", rgb("brown"))(1), rgb("brown") + "");
});

it("interpolateHsl(a, b) interpolates in HSL and returns an RGB string", () => {
  assert.strictEqual(interpolateHsl("steelblue", "#f00")(0.2), "rgb(56, 61, 195)");
  assert.strictEqual(interpolateHsl("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(56, 61, 195, 0.84)");
});

it("interpolateHsl(a, b) uses the shortest path when interpolating hue", () => {
  const i = interpolateHsl("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  assert.strictEqual(i(0.0), "rgb(191, 85, 64)");
  assert.strictEqual(i(0.2), "rgb(191, 77, 64)");
  assert.strictEqual(i(0.4), "rgb(191, 68, 64)");
  assert.strictEqual(i(0.6), "rgb(191, 64, 68)");
  assert.strictEqual(i(0.8), "rgb(191, 64, 77)");
  assert.strictEqual(i(1.0), "rgb(191, 64, 85)");
});

it("interpolateHsl(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(interpolateHsl("#f60", "#000")(0.5), "rgb(128, 51, 0)");
  assert.strictEqual(interpolateHsl("#6f0", "#fff")(0.5), "rgb(179, 255, 128)");
});

it("interpolateHsl(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(interpolateHsl("#000", "#f60")(0.5), "rgb(128, 51, 0)");
  assert.strictEqual(interpolateHsl("#fff", "#6f0")(0.5), "rgb(179, 255, 128)");
});

it("interpolateHsl(a, b) uses a’s saturation when b’s saturation is undefined", () => {
  assert.strictEqual(interpolateHsl("#ccc", "#000")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(interpolateHsl("#f00", "#000")(0.5), "rgb(128, 0, 0)");
});

it("interpolateHsl(a, b) uses b’s saturation when a’s saturation is undefined", () => {
  assert.strictEqual(interpolateHsl("#000", "#ccc")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(interpolateHsl("#000", "#f00")(0.5), "rgb(128, 0, 0)");
});

it("interpolateHsl(a, b) uses b’s lightness when a’s lightness is undefined", () => {
  assert.strictEqual(interpolateHsl(null, hsl(20, 1.0, 0.5))(0.5), "rgb(255, 85, 0)");
});

it("interpolateHsl(a, b) uses a’s lightness when b’s lightness is undefined", () => {
  assert.strictEqual(interpolateHsl(hsl(20, 1.0, 0.5), null)(0.5), "rgb(255, 85, 0)");
});
