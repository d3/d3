import assert from "assert";
import {hcl, rgb} from "d3-color";
import {interpolateHclLong} from "../src/index.js";

it("interpolateHclLong(a, b) converts a and b to HCL colors", () => {
  assert.strictEqual(interpolateHclLong("steelblue", "brown")(0), rgb("steelblue") + "");
  assert.strictEqual(interpolateHclLong("steelblue", hcl("brown"))(1), rgb("brown") + "");
  assert.strictEqual(interpolateHclLong("steelblue", rgb("brown"))(1), rgb("brown") + "");
});

it("interpolateHclLong(a, b) interpolates in HCL and returns an RGB string", () => {
  assert.strictEqual(interpolateHclLong("steelblue", "#f00")(0.2), "rgb(0, 144, 169)");
  assert.strictEqual(interpolateHclLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(0, 144, 169, 0.84)");
});

it("interpolateHclLong(a, b) does not use the shortest path when interpolating hue", () => {
  const i = interpolateHclLong(hcl(10, 50, 50), hcl(350, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(151, 111, 28)");
  assert.strictEqual(i(0.4), "rgb(35, 136, 68)");
  assert.strictEqual(i(0.6), "rgb(0, 138, 165)");
  assert.strictEqual(i(0.8), "rgb(91, 116, 203)");
  assert.strictEqual(i(1.0), "rgb(189, 79, 136)");
});

it("interpolateHclLong(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(interpolateHclLong("#f60", hcl(NaN, NaN, 0))(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(interpolateHclLong("#6f0", hcl(NaN, NaN, 0))(0.5), "rgb(0, 129, 0)");
});

it("interpolateHclLong(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(interpolateHclLong(hcl(NaN, NaN, 0), "#f60")(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(interpolateHclLong(hcl(NaN, NaN, 0), "#6f0")(0.5), "rgb(0, 129, 0)");
});

it("interpolateHclLong(a, b) uses a’s chroma when b’s chroma is undefined", () => {
  assert.strictEqual(interpolateHclLong("#ccc", hcl(NaN, NaN, 0))(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(interpolateHclLong("#f00", hcl(NaN, NaN, 0))(0.5), "rgb(166, 0, 0)");
});

it("interpolateHclLong(a, b) uses b’s chroma when a’s chroma is undefined", () => {
  assert.strictEqual(interpolateHclLong(hcl(NaN, NaN, 0), "#ccc")(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(interpolateHclLong(hcl(NaN, NaN, 0), "#f00")(0.5), "rgb(166, 0, 0)");
});

it("interpolateHclLong(a, b) uses b’s luminance when a’s luminance is undefined", () => {
  assert.strictEqual(interpolateHclLong(null, hcl(20, 80, 50))(0.5), "rgb(230, 13, 79)");
});

it("interpolateHclLong(a, b) uses a’s luminance when b’s luminance is undefined", () => {
  assert.strictEqual(interpolateHclLong(hcl(20, 80, 50), null)(0.5), "rgb(230, 13, 79)");
});
