import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.addAll(data) creates new points and adds them to the quadtree", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.add([0.0, 0.0]).root(), {data: [0, 0]});
  assert.deepStrictEqual(q.add([0.9, 0.9]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.9, 0.0]).root(), [{data: [0, 0]}, {data: [0.9, 0]},, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.0, 0.9]).root(), [{data: [0, 0]}, {data: [0.9, 0]}, {data: [0, 0.9]}, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.add([0.4, 0.4]).root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}], {data: [0.9, 0]}, {data: [0, 0.9]}, {data: [0.9, 0.9]}]);
});

it("quadtree.addAll(data) ignores points with NaN coordinates", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.addAll([[NaN, 0], [0, NaN]]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0, 0], [0.9, 0.9]]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.addAll([[NaN, 0], [0, NaN]]).root(), [{data: [0, 0]},,, {data: [0.9, 0.9]}]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [1, 1]]);
});

it("quadtree.addAll(data) correctly handles the empty array", () => {
  const q = quadtree();
  assert.deepStrictEqual(q.addAll([]).root(), undefined);
  assert.strictEqual(q.extent(), undefined);
  assert.deepStrictEqual(q.addAll([[0, 0], [1, 1]]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  assert.deepStrictEqual(q.addAll([]).root(), [{data: [0, 0]},,, {data: [1, 1]}]);
  assert.deepStrictEqual(q.extent(), [[0, 0], [2, 2]]);
});

it("quadtree.addAll(data) computes the extent of the data before adding", () => {
  const q = quadtree().addAll([[0.4, 0.4], [0, 0], [0.9, 0.9]]);
  assert.deepStrictEqual(q.root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}],,, {data: [0.9, 0.9]}]);
});

it("quadtree.addAll(iterable) adds points from an iterable", () => {
  const q = quadtree().addAll(new Set([[0.4, 0.4], [0, 0], [0.9, 0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}],,, {data: [0.9, 0.9]}]);
});

it("quadtree(iterable) adds points from an iterable", () => {
  const q = quadtree(new Set([[0.4, 0.4], [0, 0], [0.9, 0.9]]));
  assert.deepStrictEqual(q.root(), [[{data: [0, 0]},,, {data: [0.4, 0.4]}],,, {data: [0.9, 0.9]}]);
});
