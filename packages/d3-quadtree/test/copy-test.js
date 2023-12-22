import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.copy() returns a copy of this quadtree", () => {
  const q0 = quadtree().addAll([[0, 0], [1, 0], [0, 1], [1, 1]]);
  assert.deepStrictEqual(q0.copy(), q0);
});

it("quadtree.copy() isolates changes to the extent", () => {
  const q0 = quadtree().extent([[0, 0], [1, 1]]);
  const q1 = q0.copy();
  q0.add([2, 2]);
  assert.deepStrictEqual(q1.extent(), [[0, 0], [2, 2]]);
  q1.add([-1, -1]);
  assert.deepStrictEqual(q0.extent(), [[0, 0], [4, 4]]);
});

it("quadtree.copy() isolates changes to the root when a leaf", () => {
  const q0 = quadtree().extent([[0, 0], [1, 1]]);
  const q1 = q0.copy();
  const p0 = [2, 2];
  q0.add(p0);
  assert.strictEqual(q1.root(), undefined);
  const q2 = q0.copy();
  assert.deepStrictEqual(q0.root(), {data: [2, 2]});
  assert.deepStrictEqual(q2.root(), {data: [2, 2]});
  assert.strictEqual(q0.remove(p0), q0);
  assert.strictEqual(q0.root(), undefined);
  assert.deepStrictEqual(q2.root(), {data: [2, 2]});
});

it("quadtree.copy() isolates changes to the root when not a leaf", () => {
  const p0 = [1, 1];
  const p1 = [2, 2];
  const p2 = [3, 3];
  const q0 = quadtree().extent([[0, 0], [4, 4]]).addAll([p0, p1]);
  const q1 = q0.copy();
  q0.add(p2);
  assert.deepStrictEqual(q0.extent(), [[0, 0], [8, 8]]);
  assert.deepStrictEqual(q0.root(), [[{data: [1, 1]},,, [{data: [2, 2]},,, {data: [3, 3]}]],,,, ]);
  assert.deepStrictEqual(q1.extent(), [[0, 0], [8, 8]]);
  assert.deepStrictEqual(q1.root(), [[{data: [1, 1]},,, {data: [2, 2]}],,,, ]);
  const q3 = q0.copy();
  q0.remove(p2);
  assert.deepStrictEqual(q3.extent(), [[0, 0], [8, 8]]);
  assert.deepStrictEqual(q3.root(), [[{data: [1, 1]},,, [{data: [2, 2]},,, {data: [3, 3]}]],,,, ]);
});
