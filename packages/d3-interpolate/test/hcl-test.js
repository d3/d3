import assert from "assert";
import {hcl, rgb} from "d3-color";
import {interpolateHcl} from "../src/index.js";

it("interpolateHcl(a, b) converts a and b to HCL colors", () => {
  assert.strictEqual(interpolateHcl("steelblue", "brown")(0), rgb("steelblue") + "");
  assert.strictEqual(interpolateHcl("steelblue", hcl("brown"))(1), rgb("brown") + "");
  assert.strictEqual(interpolateHcl("steelblue", rgb("brown"))(1), rgb("brown") + "");
});

it("interpolateHcl(a, b) interpolates in HCL and returns an RGB string", () => {
  assert.strictEqual(interpolateHcl("steelblue", "#f00")(0.2), "rgb(106, 121, 206)");
  assert.strictEqual(interpolateHcl("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(106, 121, 206, 0.84)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 180°", () => {
  const i = interpolateHcl(hcl(10, 50, 50), hcl(350, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 113)");
  assert.strictEqual(i(0.4), "rgb(193, 78, 118)");
  assert.strictEqual(i(0.6), "rgb(192, 78, 124)");
  assert.strictEqual(i(0.8), "rgb(191, 78, 130)");
  assert.strictEqual(i(1.0), "rgb(189, 79, 136)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 360°", () => {
  const i = interpolateHcl(hcl(10, 50, 50), hcl(380, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 104)");
  assert.strictEqual(i(0.4), "rgb(194, 79, 101)");
  assert.strictEqual(i(0.6), "rgb(194, 79, 98)");
  assert.strictEqual(i(0.8), "rgb(194, 80, 96)");
  assert.strictEqual(i(1.0), "rgb(194, 80, 93)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 540°", () => {
  const i = interpolateHcl(hcl(10, 50, 50), hcl(710, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 113)");
  assert.strictEqual(i(0.4), "rgb(193, 78, 118)");
  assert.strictEqual(i(0.6), "rgb(192, 78, 124)");
  assert.strictEqual(i(0.8), "rgb(191, 78, 130)");
  assert.strictEqual(i(1.0), "rgb(189, 79, 136)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 720°", () => {
  const i = interpolateHcl(hcl(10, 50, 50), hcl(740, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 104)");
  assert.strictEqual(i(0.4), "rgb(194, 79, 101)");
  assert.strictEqual(i(0.6), "rgb(194, 79, 98)");
  assert.strictEqual(i(0.8), "rgb(194, 80, 96)");
  assert.strictEqual(i(1.0), "rgb(194, 80, 93)");
});

it("interpolateHcl(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(interpolateHcl("#f60", hcl(NaN, NaN, 0))(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(interpolateHcl("#6f0", hcl(NaN, NaN, 0))(0.5), "rgb(0, 129, 0)");
});

it("interpolateHcl(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(interpolateHcl(hcl(NaN, NaN, 0), "#f60")(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(interpolateHcl(hcl(NaN, NaN, 0), "#6f0")(0.5), "rgb(0, 129, 0)");
});

it("interpolateHcl(a, b) uses a’s chroma when b’s chroma is undefined", () => {
  assert.strictEqual(interpolateHcl("#ccc", hcl(NaN, NaN, 0))(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(interpolateHcl("#f00", hcl(NaN, NaN, 0))(0.5), "rgb(166, 0, 0)");
});

it("interpolateHcl(a, b) uses b’s chroma when a’s chroma is undefined", () => {
  assert.strictEqual(interpolateHcl(hcl(NaN, NaN, 0), "#ccc")(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(interpolateHcl(hcl(NaN, NaN, 0), "#f00")(0.5), "rgb(166, 0, 0)");
});

it("interpolateHcl(a, b) uses b’s luminance when a’s luminance is undefined", () => {
  assert.strictEqual(interpolateHcl(null, hcl(20, 80, 50))(0.5), "rgb(230, 13, 79)");
});

it("interpolateHcl(a, b) uses a’s luminance when b’s luminance is undefined", () => {
  assert.strictEqual(interpolateHcl(hcl(20, 80, 50), null)(0.5), "rgb(230, 13, 79)");
});
