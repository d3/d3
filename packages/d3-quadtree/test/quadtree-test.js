import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree() creates an empty quadtree", () => {
  const q = quadtree();
  assert(q instanceof quadtree);
  assert.strictEqual(q.visit(function() { throw new Error; }), q);
  assert.strictEqual(q.size(), 0);
  assert.strictEqual(q.extent(), undefined);
  assert.strictEqual(q.root(), undefined);
  assert.deepStrictEqual(q.data(), []);
});

it("quadtree(nodes) is equivalent to quadtree().addAll(nodes)", () => {
  const q = quadtree([[0, 0], [1, 1]]);
  assert(q instanceof quadtree);
  assert.deepStrictEqual(q.root(), [{data: [0, 0]},,, {data: [1, 1]}]);
});

it("quadtree(nodes, x, y) is equivalent to quadtree().x(x).y(y).addAll(nodes)", () => {
  const q = quadtree([{x: 0, y: 0}, {x: 1, y: 1}], function(d) { return d.x; }, function(d) { return d.y; });
  assert(q instanceof quadtree);
  assert.deepStrictEqual(q.root(), [{data: {x: 0, y: 0}},,, {data: {x: 1, y: 1}}]);
});
