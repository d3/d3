import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.extent(extent) extends the extent", () => {
  assert.deepStrictEqual(quadtree().extent([[0, 1], [2, 6]]).extent(), [[0, 1], [8, 9]]);
});

it("quadtree.extent() can be inferred by quadtree.cover", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.cover(0, 0).extent(), [[0, 0], [1, 1]]);
  assert.deepStrictEqual(q.cover(2, 4).extent(), [[0, 0], [8, 8]]);
});

it("quadtree.extent() can be inferred by quadtree.add", () => {
  const q = quadtree();
  q.add([0, 0]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [1, 1]]);
  q.add([2, 4]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [8, 8]]);
});

it("quadtree.extent(extent) squarifies and centers the specified extent", () => {
  assert.deepStrictEqual(quadtree().extent([[0, 1], [2, 6]]).extent(), [[0, 1], [8, 9]]);
});

it("quadtree.extent(extent) ignores invalid extents", () => {
  assert.strictEqual(quadtree().extent([[1, NaN], [NaN, 0]]).extent(), undefined);
  assert.strictEqual(quadtree().extent([[NaN, 1], [0, NaN]]).extent(), undefined);
  assert.strictEqual(quadtree().extent([[NaN, NaN], [NaN, NaN]]).extent(), undefined);
});

it("quadtree.extent(extent) flips inverted extents", () => {
  assert.deepStrictEqual(quadtree().extent([[1, 1], [0, 0]]).extent(), [[0, 0], [2, 2]]);
});

it("quadtree.extent(extent) tolerates partially-valid extents", () => {
  assert.deepStrictEqual(quadtree().extent([[NaN, 0], [1, 1]]).extent(), [[1, 1], [2, 2]]);
  assert.deepStrictEqual(quadtree().extent([[0, NaN], [1, 1]]).extent(), [[1, 1], [2, 2]]);
  assert.deepStrictEqual(quadtree().extent([[0, 0], [NaN, 1]]).extent(), [[0, 0], [1, 1]]);
  assert.deepStrictEqual(quadtree().extent([[0, 0], [1, NaN]]).extent(), [[0, 0], [1, 1]]);
});

it("quadtree.extent(extent) allows trivial extents", () => {
  assert.deepStrictEqual(quadtree().extent([[0, 0], [0, 0]]).extent(), [[0, 0], [1, 1]]);
  assert.deepStrictEqual(quadtree().extent([[1, 1], [1, 1]]).extent(), [[1, 1], [2, 2]]);
});
