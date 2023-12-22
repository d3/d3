import assert from "assert";
import {polygonCentroid} from "../src/index.js";

it("polygonCentroid(points) returns the expected value for closed counterclockwise polygons", () => {
  assert.deepStrictEqual(polygonCentroid([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]), [0.5, 0.5]);
});

it("polygonCentroid(points) returns the expected value for closed clockwise polygons", () => {
  assert.deepStrictEqual(polygonCentroid([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), [0.5, 0.5]);
  assert.deepStrictEqual(polygonCentroid([[1, 1], [3, 2], [2, 3], [1, 1]]), [2, 2]);
});

it("polygonCentroid(points) returns the expected value for open counterclockwise polygons", () => {
  assert.deepStrictEqual(polygonCentroid([[0, 0], [0, 1], [1, 1], [1, 0]]), [0.5, 0.5]);
});

it("polygonCentroid(points) returns the expected value for open counterclockwise polygons", () => {
  assert.deepStrictEqual(polygonCentroid([[0, 0], [1, 0], [1, 1], [0, 1]]), [0.5, 0.5]);
  assert.deepStrictEqual(polygonCentroid([[1, 1], [3, 2], [2, 3]]), [2, 2]);
});

it("polygonCentroid(polygon) returns the expected value for a very large polygon", () => {
  const stop = 1e8;
  const step = 1e4;
  const points = [];
  for (let value = 0; value < stop; value += step) points.push([0, value]);
  for (let value = 0; value < stop; value += step) points.push([value, stop]);
  for (let value = stop - step; value >= 0; value -= step) points.push([stop, value]);
  for (let value = stop - step; value >= 0; value -= step) points.push([value, 0]);
  assert.deepStrictEqual(polygonCentroid(points), [49999999.75000187, 49999999.75001216]);
});
