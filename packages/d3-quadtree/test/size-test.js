import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.size() returns the number of points in the quadtree", () => {
  const q = quadtree();
  assert.strictEqual(q.size(), 0);
  q.add([0, 0]).add([1, 2]);
  assert.strictEqual(q.size(), 2);
});

it("quadtree.size() correctly counts coincident nodes", () => {
  const q = quadtree();
  q.add([0, 0]).add([0, 0]);
  assert.strictEqual(q.size(), 2);
});
