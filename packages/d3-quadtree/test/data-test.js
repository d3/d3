import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.data() returns an array of data in the quadtree", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.data(), []);
  q.add([0, 0]).add([1, 2]);
  assert.deepStrictEqual(q.data(), [[0, 0], [1, 2]]);
});

it("quadtree.data() correctly handles coincident nodes", () => {
  const q = quadtree();
  q.add([0, 0]).add([0, 0]);
  assert.deepStrictEqual(q.data(), [[0, 0], [0, 0]]);
});
