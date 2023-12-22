import assert from "assert";
import {cubehelix, hcl, rgb} from "d3-color";
import {interpolateCubehelixLong} from "../src/index.js";

it("interpolateCubehelixLong(a, b) converts a and b to Cubehelix colors", () => {
  assert.strictEqual(interpolateCubehelixLong("steelblue", "brown")(0), rgb("steelblue") + "");
  assert.strictEqual(interpolateCubehelixLong("steelblue", hcl("brown"))(1), rgb("brown") + "");
  assert.strictEqual(interpolateCubehelixLong("steelblue", rgb("brown"))(1), rgb("brown") + "");
});

it("interpolateCubehelixLong(a, b) interpolates in Cubehelix and returns an RGB string", () => {
  assert.strictEqual(interpolateCubehelixLong("steelblue", "#f00")(0.2), "rgb(88, 100, 218)");
  assert.strictEqual(interpolateCubehelixLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(88, 100, 218, 0.84)");
});

it("interpolateCubehelixLong.gamma(3)(a, b) returns the expected values", () => {
  assert.strictEqual(interpolateCubehelixLong.gamma(3)("steelblue", "#f00")(0.2), "rgb(96, 107, 228)");
});

it("interpolateCubehelixLong.gamma(g) coerces the specified gamma to a number", () => {
  assert.strictEqual(interpolateCubehelixLong.gamma({valueOf: function() { return 3; }})("steelblue", "#f00")(0.2), "rgb(96, 107, 228)");
});

it("interpolateCubehelixLong(a, b) is equivalent to interpolateCubehelixLong.gamma(1)(a, b)", () => {
  const i0 = interpolateCubehelixLong.gamma(1)("purple", "orange"),
      i1 = interpolateCubehelixLong("purple", "orange");
  assert.strictEqual(i1(0.0), i0(0.0));
  assert.strictEqual(i1(0.2), i0(0.2));
  assert.strictEqual(i1(0.4), i0(0.4));
  assert.strictEqual(i1(0.6), i0(0.6));
  assert.strictEqual(i1(0.8), i0(0.8));
  assert.strictEqual(i1(1.0), i0(1.0));
});
it("interpolateCubehelixLong(a, b) uses the longest path when interpolating hue difference greater than 180°", () => {
  const i = interpolateCubehelixLong("purple", "orange");
  assert.strictEqual(i(0.0), "rgb(128, 0, 128)");
  assert.strictEqual(i(0.2), "rgb(63, 54, 234)");
  assert.strictEqual(i(0.4), "rgb(0, 151, 217)");
  assert.strictEqual(i(0.6), "rgb(0, 223, 83)");
  assert.strictEqual(i(0.8), "rgb(79, 219, 0)");
  assert.strictEqual(i(1.0), "rgb(255, 165, 0)");
});

it("interpolateCubehelixLong(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(interpolateCubehelixLong("#f60", hcl(NaN, NaN, 0))(0.5), "rgb(162, 41, 0)");
  assert.strictEqual(interpolateCubehelixLong("#6f0", hcl(NaN, NaN, 0))(0.5), "rgb(3, 173, 0)");
});

it("interpolateCubehelixLong(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(interpolateCubehelixLong(hcl(NaN, NaN, 0), "#f60")(0.5), "rgb(162, 41, 0)");
  assert.strictEqual(interpolateCubehelixLong(hcl(NaN, NaN, 0), "#6f0")(0.5), "rgb(3, 173, 0)");
});

it("interpolateCubehelixLong(a, b) uses a’s chroma when b’s chroma is undefined", () => {
  assert.strictEqual(interpolateCubehelixLong("#ccc", hcl(NaN, NaN, 0))(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(interpolateCubehelixLong("#f00", hcl(NaN, NaN, 0))(0.5), "rgb(147, 0, 0)");
});

it("interpolateCubehelixLong(a, b) uses b’s chroma when a’s chroma is undefined", () => {
  assert.strictEqual(interpolateCubehelixLong(hcl(NaN, NaN, 0), "#ccc")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(interpolateCubehelixLong(hcl(NaN, NaN, 0), "#f00")(0.5), "rgb(147, 0, 0)");
});

it("interpolateCubehelixLong(a, b) uses b’s luminance when a’s luminance is undefined", () => {
  assert.strictEqual(interpolateCubehelixLong(null, cubehelix(20, 1.5, 0.5))(0.5), "rgb(248, 93, 0)");
});

it("interpolateCubehelixLong(a, b) uses a’s luminance when b’s luminance is undefined", () => {
  assert.strictEqual(interpolateCubehelixLong(cubehelix(20, 1.5, 0.5), null)(0.5), "rgb(248, 93, 0)");
});
