import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.cover(x, y) sets a trivial extent if the extent was undefined", () => {
  assert.deepStrictEqual(quadtree().cover(1, 2).extent(), [[1, 2], [2, 3]]);
});

it("quadtree.cover(x, y) sets a non-trivial squarified and centered extent if the extent was trivial", () => {
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(1, 2).extent(), [[0, 0], [4, 4]]);
});

it("quadtree.cover(x, y) ignores invalid points", () => {
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(NaN, 2).extent(), [[0, 0], [1, 1]]);
});

it("quadtree.cover(x, y) repeatedly doubles the existing extent if the extent was non-trivial", () => {
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(-1, -1).extent(), [[-4, -4], [4, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(1, -1).extent(), [[0, -4], [8, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(3, -1).extent(), [[0, -4], [8, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(3, 1).extent(), [[0, 0], [4, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(3, 3).extent(), [[0, 0], [4, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(1, 3).extent(), [[0, 0], [4, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(-1, 3).extent(), [[-4, 0], [4, 8]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(-1, 1).extent(), [[-4, 0], [4, 8]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(-3, -3).extent(), [[-4, -4], [4, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(3, -3).extent(), [[0, -4], [8, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(5, -3).extent(), [[0, -4], [8, 4]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(5, 3).extent(), [[0, 0], [8, 8]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(5, 5).extent(), [[0, 0], [8, 8]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(3, 5).extent(), [[0, 0], [8, 8]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(-3, 5).extent(), [[-4, 0], [4, 8]]);
  assert.deepStrictEqual(quadtree().cover(0, 0).cover(2, 2).cover(-3, 3).extent(), [[-4, 0], [4, 8]]);
});

it("quadtree.cover(x, y) repeatedly wraps the root node if it has children", () => {
  const q = quadtree().add([0, 0]).add([2, 2]);
  assert.deepStrictEqual(q.root(), [{data: [0, 0]},,, {data: [2, 2]}]);
  assert.deepStrictEqual(q.copy().cover(3, 3).root(), [{data: [0, 0]},,, {data: [2, 2]}]);
  assert.deepStrictEqual(q.copy().cover(-1, 3).root(), [,[{data: [0, 0]},,, {data: [2, 2]}],,, ]);
  assert.deepStrictEqual(q.copy().cover(3, -1).root(), [,, [{data: [0, 0]},,, {data: [2, 2]}],, ]);
  assert.deepStrictEqual(q.copy().cover(-1, -1).root(), [,,, [{data: [0, 0]},,, {data: [2, 2]}]]);
  assert.deepStrictEqual(q.copy().cover(5, 5).root(), [[{data: [0, 0]},,, {data: [2, 2]}],,,, ]);
  assert.deepStrictEqual(q.copy().cover(-3, 5).root(), [,[{data: [0, 0]},,, {data: [2, 2]}],,, ]);
  assert.deepStrictEqual(q.copy().cover(5, -3).root(), [,, [{data: [0, 0]},,, {data: [2, 2]}],, ]);
  assert.deepStrictEqual(q.copy().cover(-3, -3).root(), [,,, [{data: [0, 0]},,, {data: [2, 2]}]]);
});

it("quadtree.cover(x, y) does not wrap the root node if it is a leaf", () => {
  const q = quadtree().cover(0, 0).add([2, 2]);
  assert.deepStrictEqual(q.root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(3, 3).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(-1, 3).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(3, -1).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(-1, -1).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(5, 5).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(-3, 5).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(5, -3).root(), {data: [2, 2]});
  assert.deepStrictEqual(q.copy().cover(-3, -3).root(), {data: [2, 2]});
});

it("quadtree.cover(x, y) does not wrap the root node if it is undefined", () => {
  const q = quadtree().cover(0, 0).cover(2, 2);
  assert.strictEqual(q.root(), undefined);
  assert.strictEqual(q.copy().cover(3, 3).root(), undefined);
  assert.strictEqual(q.copy().cover(-1, 3).root(), undefined);
  assert.strictEqual(q.copy().cover(3, -1).root(), undefined);
  assert.strictEqual(q.copy().cover(-1, -1).root(), undefined);
  assert.strictEqual(q.copy().cover(5, 5).root(), undefined);
  assert.strictEqual(q.copy().cover(-3, 5).root(), undefined);
  assert.strictEqual(q.copy().cover(5, -3).root(), undefined);
  assert.strictEqual(q.copy().cover(-3, -3).root(), undefined);
});

it("quadtree.cover() does not crash on huge values", () => {
  quadtree([[1e23, 0]]);
});
