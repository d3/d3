import assert from "assert";
import {zoomIdentity, ZoomTransform} from "../src/index.js";

it("zoomIdentity transform contains k = 1, x = y = 0", () => {
  assert.deepStrictEqual(zoomIdentity, new ZoomTransform(1, 0, 0));
});

it("transform.scale(k) returns a new transform scaled with k", () => {
  const transform = zoomIdentity.scale(2.5);
  assert.deepStrictEqual(transform.scale(2), new ZoomTransform(5, 0, 0));
});

it("transform.translate(x, y) returns a new transform translated with x and y", () => {
  const transform = zoomIdentity.translate(2, 3);
  assert.deepStrictEqual(transform.translate(-4, 4), new ZoomTransform(1, -2, 7));
  assert.deepStrictEqual(transform.scale(2).translate(-4, 4), new ZoomTransform(2, -6, 11));
});

it("transform.apply([x, y]) returns the transformation of the specified point", () => {
  assert.deepStrictEqual(zoomIdentity.translate(2, 3).scale(2).apply([4, 5]), [10, 13]);
});

it("transform.applyX(x) returns the transformation of the specified x-coordinate", () => {
  assert.deepStrictEqual(zoomIdentity.translate(2, 0).scale(2).applyX(4), 10);
});

it("transform.applyY(y) returns the transformation of the specified y-coordinate", () => {
  assert.deepStrictEqual(zoomIdentity.translate(0, 3).scale(2).applyY(5), 13);
});

it("transform.invert([x, y]) returns the inverse transformation of the specified point", () => {
  assert.deepStrictEqual(zoomIdentity.translate(2, 3).scale(2).invert([4, 5]), [1, 1]);
});

it("transform.invertX(x) returns the inverse transformation of the specified x-coordinate", () => {
  assert.deepStrictEqual(zoomIdentity.translate(2, 0).scale(2).invertX(4), 1);
});

it("transform.invertY(y) returns the inverse transformation of the specified y-coordinate", () => {
  assert.deepStrictEqual(zoomIdentity.translate(0, 3).scale(2).invertY(5), 1);
});

// transform.rescaleX(x)

// transform.rescaleY(y)

it("transform.toString() returns a string representing the SVG transform", () => {
  assert.strictEqual(zoomIdentity.toString(), "translate(0,0) scale(1)");
});
