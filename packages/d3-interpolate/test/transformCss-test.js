/*

import assert from "assert";
import * as d3 from "../src/index.js";

// see https://github.com/d3/d3-interpolate/pull/83
// and https://github.com/Automattic/node-canvas/issues/1313
global.DOMMatrix = require("Canvas").DOMMatrix;

it("interpolateTransformCss(a, b) transforms as expected", () => {
  assert.strictEqual(interpolate.interpolateTransformCss(
    "translateY(12px) scale(2)",
    "translateX(3em) rotate(5deg)"
  )(0.5), "translate(24px, 6px) rotate(2.5deg) scale(1.5,1.5)");
  assert.deepStrictEqual(interpolate.interpolateTransformCss(
    "matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)",
    "translate(3px,90px)"
  )(0.5), "translate(4px, 48px) rotate(-58.282525588538995deg) skewX(-39.847576765616985deg) scale(-0.6180339887498949,0.9472135954999579)");
  assert.deepStrictEqual(interpolate.interpolateTransformCss(
    "skewX(-60)",
    "skewX(60) translate(280,0)"
  )(0.5), "translate(140, 0) skewX(0)");
});

*/
