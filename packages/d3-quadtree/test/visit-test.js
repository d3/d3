import assert from "assert";
import {quadtree} from "../src/index.js";

it("quadtree.visit(callback) visits each node in a quadtree", () => {
  const results = [];
  const q = quadtree().addAll([[0, 0], [1, 0], [0, 1], [1, 1]]);
  assert.strictEqual(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  assert.deepStrictEqual(results, [
    [0, 0, 2, 2],
    [0, 0, 1, 1],
    [1, 0, 2, 1],
    [0, 1, 1, 2],
    [1, 1, 2, 2]
  ]);
});

it("quadtree.visit(callback) applies pre-order traversal", () => {
  const results = [];
  const q = quadtree().extent([[0, 0], [960, 960]]).addAll([[100, 100], [200, 200], [300, 300]]);
  assert.strictEqual(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  assert.deepStrictEqual(results, [
    [  0,   0, 1024, 1024],
    [  0,   0, 512, 512],
    [  0,   0, 256, 256],
    [  0,   0, 128, 128],
    [128, 128, 256, 256],
    [256, 256, 512, 512]
  ]);
});

it("quadtree.visit(callback) does not recurse if the callback returns truthy", () => {
  const results = [];
  const q = quadtree().extent([[0, 0], [960, 960]]).addAll([[100, 100], [700, 700], [800, 800]]);
  assert.strictEqual(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); return x0 > 0; }), q);
  assert.deepStrictEqual(results, [
    [  0,   0, 1024, 1024],
    [  0,   0, 512, 512],
    [512, 512, 1024, 1024]
  ]);
});

it("quadtree.visit(callback) on an empty quadtree with no bounds does nothing", () => {
  const results = [];
  const q = quadtree();
  assert.strictEqual(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  assert.strictEqual(results.length, 0);
});

it("quadtree.visit(callback) on an empty quadtree with bounds does nothing", () => {
  const results = [];
  const q = quadtree().extent([[0, 0], [960, 960]]);
  assert.strictEqual(q.visit(function(node, x0, y0, x1, y1) { results.push([x0, y0, x1, y1]); }), q);
  assert.deepStrictEqual(results.length, 0);
});
