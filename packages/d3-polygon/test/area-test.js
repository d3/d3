import assert from "assert";
import {polygonArea} from "../src/index.js";

it("polygonArea(polygon) returns the expected value for closed counterclockwise polygons", () => {
  assert.strictEqual(polygonArea([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]), 1);
});

it("polygonArea(polygon) returns the expected value for closed clockwise polygons", () => {
  assert.strictEqual(polygonArea([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), -1);
  assert.strictEqual(polygonArea([[1, 1], [3, 2], [2, 3], [1, 1]]), -1.5);
});

it("polygonArea(polygon) returns the expected value for open counterclockwise polygons", () => {
  assert.strictEqual(polygonArea([[0, 0], [0, 1], [1, 1], [1, 0]]), 1);
});

it("polygonArea(polygon) returns the expected value for open clockwise polygons", () => {
  assert.strictEqual(polygonArea([[0, 0], [1, 0], [1, 1], [0, 1]]), -1);
  assert.strictEqual(polygonArea([[1, 1], [3, 2], [2, 3]]), -1.5);
});

it("polygonArea(polygon) returns the expected value for a very large polygon", () => {
  const stop = 1e8;
  const step = 1e4;
  const points = [];
  for (let value = 0; value < stop; value += step) points.push([0, value]);
  for (let value = 0; value < stop; value += step) points.push([value, stop]);
  for (let value = stop - step; value >= 0; value -= step) points.push([stop, value]);
  for (let value = stop - step; value >= 0; value -= step) points.push([value, 0]);
  assert.strictEqual(polygonArea(points), 1e16 - 5e7);
});
