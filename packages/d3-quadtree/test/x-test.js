import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.x(x) sets the x-accessor used by quadtree.add", () => {
  const q = quadtree().x(x).add({x: 1, 1: 2});
  assert.deepStrictEqual(q.extent(), [[1, 2], [2, 3]]);
  assert.deepStrictEqual(q.root(), {data: {x: 1, 1: 2}});
});

it("quadtree.x(x) sets the x-accessor used by quadtree.addAll", () => {
  const q = quadtree().x(x).addAll([{x: 1, 1: 2}]);
  assert.deepStrictEqual(q.extent(), [[1, 2], [2, 3]]);
  assert.deepStrictEqual(q.root(), {data: {x: 1, 1: 2}});
});

it("quadtree.x(x) sets the x-accessor used by quadtree.remove", () => {
  const p0 = {x: 0, 1: 1};
  const p1 = {x: 1, 1: 2};
  const q = quadtree().x(x);
  assert.deepStrictEqual(q.add(p0).root(), {data: {x: 0, 1: 1}});
  assert.deepStrictEqual(q.add(p1).root(), [{data: {x: 0, 1: 1}},,, {data: {x: 1, 1: 2}}]);
  assert.deepStrictEqual(q.remove(p1).root(), {data: {x: 0, 1: 1}});
  assert.strictEqual(q.remove(p0).root(), undefined);
});

function x(d) {
  return d.x;
}
