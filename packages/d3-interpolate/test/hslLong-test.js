import assert from "assert";
import {hsl, rgb} from "d3-color";
import {interpolateHslLong} from "../src/index.js";

it("interpolateHslLong(a, b) converts a and b to HSL colors", () => {
  assert.strictEqual(interpolateHslLong("steelblue", "brown")(0), rgb("steelblue") + "");
  assert.strictEqual(interpolateHslLong("steelblue", hsl("brown"))(1), rgb("brown") + "");
  assert.strictEqual(interpolateHslLong("steelblue", rgb("brown"))(1), rgb("brown") + "");
});

it("interpolateHslLong(a, b) interpolates in HSL and returns an RGB string", () => {
  assert.strictEqual(interpolateHslLong("steelblue", "#f00")(0.2), "rgb(56, 195, 162)");
  assert.strictEqual(interpolateHslLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(56, 195, 162, 0.84)");
});

it("interpolateHslLong(a, b) does not use the shortest path when interpolating hue", () => {
  const i = interpolateHslLong("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  assert.strictEqual(i(0.0), "rgb(191, 85, 64)");
  assert.strictEqual(i(0.2), "rgb(153, 191, 64)");
  assert.strictEqual(i(0.4), "rgb(64, 191, 119)");
  assert.strictEqual(i(0.6), "rgb(64, 119, 191)");
  assert.strictEqual(i(0.8), "rgb(153, 64, 191)");
  assert.strictEqual(i(1.0), "rgb(191, 64, 85)");
});

it("interpolateHslLong(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(interpolateHslLong("#f60", "#000")(0.5), "rgb(128, 51, 0)");
  assert.strictEqual(interpolateHslLong("#6f0", "#fff")(0.5), "rgb(179, 255, 128)");
});

it("interpolateHslLong(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(interpolateHslLong("#000", "#f60")(0.5), "rgb(128, 51, 0)");
  assert.strictEqual(interpolateHslLong("#fff", "#6f0")(0.5), "rgb(179, 255, 128)");
});

it("interpolateHslLong(a, b) uses a’s saturation when b’s saturation is undefined", () => {
  assert.strictEqual(interpolateHslLong("#ccc", "#000")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(interpolateHslLong("#f00", "#000")(0.5), "rgb(128, 0, 0)");
});

it("interpolateHslLong(a, b) uses b’s saturation when a’s saturation is undefined", () => {
  assert.strictEqual(interpolateHslLong("#000", "#ccc")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(interpolateHslLong("#000", "#f00")(0.5), "rgb(128, 0, 0)");
});

it("interpolateHslLong(a, b) uses b’s lightness when a’s lightness is undefined", () => {
  assert.strictEqual(interpolateHslLong(null, hsl(20, 1.0, 0.5))(0.5), "rgb(255, 85, 0)");
});

it("interpolateHslLong(a, b) uses a’s lightness when b’s lightness is undefined", () => {
  assert.strictEqual(interpolateHslLong(hsl(20, 1.0, 0.5), null)(0.5), "rgb(255, 85, 0)");
});
