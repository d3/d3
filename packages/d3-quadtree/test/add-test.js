import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.add(datum) creates a new point and adds it to the quadtree", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.add([0.0, 0.0]).root(), {data: [0, 0]});
  assert.deepStrictEqual(q.add([0.9, 0.9]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.9, 0.0]).root(), [{data: [0, 0]}, {data: [0.9, 0]},, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.9]).root(), [{data: [0, 0]}, {data: [0.9, 0]}, {data: [0, 0.9]}, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.4, 0.4]).root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}], {data: [0.9, 0]}, {data: [0, 0.9]}, {data: [0.9, 0.9]}]);
});

it("quadtree.add(datum) handles points being on the perimeter of the quadtree bounds", () => {
  const q = quadtree().extent([[0, 0], [1, 1]]);
  assert.deepStrictEqual(q.add([0, 0]).root(), {data: [0, 0]});
  assert.deepStrictEqual(q.add([1, 1]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  assert.deepStrictEqual(q.add([1, 0]).root(), [{data: [0, 0]}, {data: [1, 0]},, {data: [1, 1]}]);
  assert.deepStrictEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1]}, {data: [1, 1]}]);
});

it("quadtree.add(datum) handles points being to the top of the quadtree bounds", () => {
  const q = quadtree().extent([[0, 0], [2, 2]]);
  assert.deepStrictEqual(q.add([1, -1]).extent(), [[0, -4], [8, 4]]);
});

it("quadtree.add(datum) handles points being to the right of the quadtree bounds", () => {
  const q = quadtree().extent([[0, 0], [2, 2]]);
  assert.deepStrictEqual(q.add([3, 1]).extent(), [[0, 0], [4, 4]]);
});

it("quadtree.add(datum) handles points being to the bottom of the quadtree bounds", () => {
  const q = quadtree().extent([[0, 0], [2, 2]]);
  assert.deepStrictEqual(q.add([1, 3]).extent(), [[0, 0], [4, 4]]);
});

it("quadtree.add(datum) handles points being to the left of the quadtree bounds", () => {
  const q = quadtree().extent([[0, 0], [2, 2]]);
  assert.deepStrictEqual(q.add([-1, 1]).extent(), [[-4, 0], [4, 8]]);
});

it("quadtree.add(datum) handles coincident points by creating a linked list", () => {
  const q = quadtree().extent([[0, 0], [1, 1]]);
  assert.deepStrictEqual(q.add([0, 0]).root(), {data: [0, 0]});
  assert.deepStrictEqual(q.add([1, 0]).root(), [{data: [0, 0]}, {data: [1, 0]},,, ]);
  assert.deepStrictEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1]},, ]);
  assert.deepStrictEqual(q.add([0, 1]).root(), [{data: [0, 0]}, {data: [1, 0]}, {data: [0, 1], next: {data: [0, 1]}},, ]);
});

it("quadtree.add(datum) implicitly defines trivial bounds for the first point", () => {
  const q = quadtree().add([1, 2]);
  assert.deepStrictEqual(q.extent(), [[1, 2], [2, 3]]);
  assert.deepStrictEqual(q.root(), {data: [1, 2]});
});
