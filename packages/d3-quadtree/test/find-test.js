import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.find(x, y) returns the closest point to the given [x, y]", () => {
  const dx = 17;
  const dy = 17;
  const q = quadtree();
  for (let i = 0, n = dx * dy; i < n; ++i) { q.add([i % dx, i / dx | 0]); }
  assert.deepStrictEqual(q.find( 0.1,  0.1), [ 0,  0]);
  assert.deepStrictEqual(q.find( 7.1,  7.1), [ 7,  7]);
  assert.deepStrictEqual(q.find( 0.1, 15.9), [ 0, 16]);
  assert.deepStrictEqual(q.find(15.9, 15.9), [16, 16]);
});

it("quadtree.find(x, y, radius) returns the closest point within the search radius to the given [x, y]", () => {
  const q = quadtree([[0, 0], [100, 0], [0, 100], [100, 100]]);
  assert.deepStrictEqual(q.find(20, 20, Infinity), [0, 0]);
  assert.deepStrictEqual(q.find(20, 20, 20 * Math.SQRT2 + 1e-6), [0, 0]);
  assert.strictEqual(q.find(20, 20, 20 * Math.SQRT2 - 1e-6), undefined);
  assert.deepStrictEqual(q.find(0, 20, 20 + 1e-6), [0, 0]);
  assert.strictEqual(q.find(0, 20, 20 - 1e-6), undefined);
  assert.deepStrictEqual(q.find(20, 0, 20 + 1e-6), [0, 0]);
  assert.strictEqual(q.find(20, 0, 20 - 1e-6), undefined);
});

it("quadtree.find(x, y, null) treats the given radius as Infinity", () => {
  const q = quadtree([[0, 0], [100, 0], [0, 100], [100, 100]]);
  assert.deepStrictEqual(q.find(20, 20, null), [0, 0]);
  assert.deepStrictEqual(q.find(20, 20, undefined), [0, 0]);
});
