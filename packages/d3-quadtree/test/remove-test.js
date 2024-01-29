import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.remove(datum) removes a point and returns the quadtree", () => {
  const p0 = [1, 1];
  const q = quadtree().add(p0);
  assert.deepStrictEqual(q.root(), {data: p0});
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.root(), undefined);
});

it("quadtree.remove(datum) removes the only point in the quadtree", () => {
  const p0 = [1, 1];
  const q = quadtree().add(p0);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[1, 1], [2, 2]]);
  assert.deepStrictEqual(q.root(), undefined);
  assert.deepStrictEqual(p0, [1, 1]);
});

it("quadtree.remove(datum) removes a first coincident point at the root in the quadtree", () => {
  const p0 = [1, 1];
  const p1 = [1, 1];
  const q = quadtree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[1, 1], [2, 2]]);
  assert.strictEqual(q.root().data, p1);
  assert.deepStrictEqual(p0, [1, 1]);
  assert.deepStrictEqual(p1, [1, 1]);
});

it("quadtree.remove(datum) removes another coincident point at the root in the quadtree", () => {
  const p0 = [1, 1];
  const p1 = [1, 1];
  const q = quadtree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p1), q);
  assert.deepStrictEqual(q.extent(), [[1, 1], [2, 2]]);
  assert.strictEqual(q.root().data, p0);
  assert.deepStrictEqual(p0, [1, 1]);
  assert.deepStrictEqual(p1, [1, 1]);
});

it("quadtree.remove(datum) removes a non-root point in the quadtree", () => {
  const p0 = [0, 0];
  const p1 = [1, 1];
  const q = quadtree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p0), q);
  assert.deepStrictEqual(q.extent(), [[0, 0], [2, 2]]);
  assert.strictEqual(q.root().data, p1);
  assert.deepStrictEqual(p0, [0, 0]);
  assert.deepStrictEqual(p1, [1, 1]);
});

it("quadtree.remove(datum) removes another non-root point in the quadtree", () => {
  const p0 = [0, 0];
  const p1 = [1, 1];
  const q = quadtree().addAll([p0, p1]);
  assert.strictEqual(q.remove(p1), q);
  assert.deepStrictEqual(q.extent(), [[0, 0], [2, 2]]);
  assert.strictEqual(q.root().data, p0);
  assert.deepStrictEqual(p0, [0, 0]);
  assert.deepStrictEqual(p1, [1, 1]);
});

it("quadtree.remove(datum) ignores a point not in the quadtree", () => {
  const p0 = [0, 0];
  const p1 = [1, 1];
  const q0 = quadtree().add(p0);
  const q1 = quadtree().add(p1);
  assert.strictEqual(q0.remove(p1), q0);
  assert.deepStrictEqual(q0.extent(), [[0, 0], [1, 1]]);
  assert.strictEqual(q0.root().data, p0);
  assert.strictEqual(q1.root().data, p1);
});

it("quadtree.remove(datum) ignores a coincident point not in the quadtree", () => {
  const p0 = [0, 0];
  const p1 = [0, 0];
  const q0 = quadtree().add(p0);
  const q1 = quadtree().add(p1);
  assert.strictEqual(q0.remove(p1), q0);
  assert.deepStrictEqual(q0.extent(), [[0, 0], [1, 1]]);
  assert.strictEqual(q0.root().data, p0);
  assert.strictEqual(q1.root().data, p1);
});

it("quadtree.remove(datum) removes another point in the quadtree", () => {
  const q = quadtree().extent([[0, 0], [959, 959]]);
  q.addAll([[630, 438], [715, 464], [523, 519], [646, 318], [434, 620], [570, 489], [520, 345], [459, 443], [346, 405], [529, 444]]);
  assert.strictEqual(q.remove(q.find(546, 440)), q);
  assert.deepStrictEqual(q.extent(), [[0, 0], [1024, 1024]]);
  assert.deepStrictEqual(q.root(), [
    [
      ,
      ,
      ,
      [
        ,
        ,
        {data: [346, 405]},
        {data: [459, 443]}
      ]
    ],
    [
      ,
      ,
      [
        {data: [520, 345]},
        {data: [646, 318]},
        [
          ,
          {data: [630, 438]},
          {data: [570, 489]},,
        ],
        {data: [715, 464]}
      ],,
    ],
    {data: [434, 620]},
    {data: [523, 519]}
  ]);
});
