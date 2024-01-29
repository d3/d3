import assert from "assert";
import {polygonLength} from "../src/index.js";

it("polygonLength(polygon) returns the expected value for closed counterclockwise polygons", () => {
  assert.strictEqual(polygonLength([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]), 4);
});

it("polygonLength(polygon) returns the expected value for closed clockwise polygons", () => {
  assert.strictEqual(polygonLength([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 4);
  assert.strictEqual(polygonLength([[1, 1], [3, 2], [2, 3], [1, 1]]), Math.sqrt(20) + Math.sqrt(2));
});

it("polygonLength(polygon) returns the expected value for open counterclockwise polygons", () => {
  assert.strictEqual(polygonLength([[0, 0], [0, 1], [1, 1], [1, 0]]), 4);
});

it("polygonLength(polygon) returns the expected value for open clockwise polygons", () => {
  assert.strictEqual(polygonLength([[0, 0], [1, 0], [1, 1], [0, 1]]), 4);
  assert.strictEqual(polygonLength([[1, 1], [3, 2], [2, 3]]), Math.sqrt(20) + Math.sqrt(2));
});
