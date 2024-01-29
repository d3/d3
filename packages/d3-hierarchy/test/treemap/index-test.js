import assert from "assert";
import {readFileSync} from "fs";
import {hierarchy, treemap, treemapSlice, treemapSquarify} from "../../src/index.js";
import {round} from "./round.js";

const simple = JSON.parse(readFileSync("./test/data/simple2.json"));

it("treemap() has the expected defaults", () => {
  const t = treemap();
  assert.strictEqual(t.tile(), treemapSquarify);
  assert.deepStrictEqual(t.size(), [1, 1]);
  assert.deepStrictEqual(t.round(), false);
});

it("treemap.round(round) observes the specified rounding", () => {
  const t = treemap().size([600, 400]).round(true);
  const root = t(hierarchy(simple).sum(defaultValue).sort(descendingValue));
  const nodes = root.descendants().map(round);
  assert.deepStrictEqual(t.round(), true);
  assert.deepStrictEqual(nodes, [
    {x0:   0, x1: 600, y0:   0, y1: 400},
    {x0:   0, x1: 300, y0:   0, y1: 200},
    {x0:   0, x1: 300, y0: 200, y1: 400},
    {x0: 300, x1: 471, y0:   0, y1: 233},
    {x0: 471, x1: 600, y0:   0, y1: 233},
    {x0: 300, x1: 540, y0: 233, y1: 317},
    {x0: 300, x1: 540, y0: 317, y1: 400},
    {x0: 540, x1: 600, y0: 233, y1: 400}
  ]);
});

it("treemap.round(round) coerces the specified round to boolean", () => {
  const t = treemap().round("yes");
  assert.strictEqual(t.round(), true);
});

it("treemap.padding(padding) sets the inner and outer padding to the specified value", () => {
  const t = treemap().padding("42");
  assert.strictEqual(t.padding()(), 42);
  assert.strictEqual(t.paddingInner()(), 42);
  assert.strictEqual(t.paddingOuter()(), 42);
  assert.strictEqual(t.paddingTop()(), 42);
  assert.strictEqual(t.paddingRight()(), 42);
  assert.strictEqual(t.paddingBottom()(), 42);
  assert.strictEqual(t.paddingLeft()(), 42);
});

it("treemap.paddingInner(padding) observes the specified padding", () => {
  const t = treemap().size([6, 4]).paddingInner(0.5);
  const root = t(hierarchy(simple).sum(defaultValue).sort(descendingValue));
  const nodes = root.descendants().map(round);
  assert.strictEqual(t.paddingInner()(), 0.5);
  assert.deepStrictEqual(t.size(), [6, 4]);
  assert.deepStrictEqual(nodes, [
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 4.00},
    {x0: 0.00, x1: 2.75, y0: 0.00, y1: 1.75},
    {x0: 0.00, x1: 2.75, y0: 2.25, y1: 4.00},
    {x0: 3.25, x1: 4.61, y0: 0.00, y1: 2.13},
    {x0: 5.11, x1: 6.00, y0: 0.00, y1: 2.13},
    {x0: 3.25, x1: 5.35, y0: 2.63, y1: 3.06},
    {x0: 3.25, x1: 5.35, y0: 3.56, y1: 4.00},
    {x0: 5.85, x1: 6.00, y0: 2.63, y1: 4.00}
  ]);
});

it("treemap.paddingOuter(padding) observes the specified padding", () => {
  const t = treemap().size([6, 4]).paddingOuter(0.5);
  const root = t(hierarchy(simple).sum(defaultValue).sort(descendingValue));
  const nodes = root.descendants().map(round);
  assert.strictEqual(t.paddingOuter()(), 0.5);
  assert.strictEqual(t.paddingTop()(), 0.5);
  assert.strictEqual(t.paddingRight()(), 0.5);
  assert.strictEqual(t.paddingBottom()(), 0.5);
  assert.strictEqual(t.paddingLeft()(), 0.5);
  assert.deepStrictEqual(t.size(), [6, 4]);
  assert.deepStrictEqual(nodes, [
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 4.00},
    {x0: 0.50, x1: 3.00, y0: 0.50, y1: 2.00},
    {x0: 0.50, x1: 3.00, y0: 2.00, y1: 3.50},
    {x0: 3.00, x1: 4.43, y0: 0.50, y1: 2.25},
    {x0: 4.43, x1: 5.50, y0: 0.50, y1: 2.25},
    {x0: 3.00, x1: 5.00, y0: 2.25, y1: 2.88},
    {x0: 3.00, x1: 5.00, y0: 2.88, y1: 3.50},
    {x0: 5.00, x1: 5.50, y0: 2.25, y1: 3.50}
  ]);
});

it("treemap.size(size) observes the specified size", () => {
  const t = treemap().size([6, 4]);
  const root = t(hierarchy(simple).sum(defaultValue).sort(descendingValue));
  const nodes = root.descendants().map(round);
  assert.deepStrictEqual(t.size(), [6, 4]);
  assert.deepStrictEqual(nodes, [
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 4.00},
    {x0: 0.00, x1: 3.00, y0: 0.00, y1: 2.00},
    {x0: 0.00, x1: 3.00, y0: 2.00, y1: 4.00},
    {x0: 3.00, x1: 4.71, y0: 0.00, y1: 2.33},
    {x0: 4.71, x1: 6.00, y0: 0.00, y1: 2.33},
    {x0: 3.00, x1: 5.40, y0: 2.33, y1: 3.17},
    {x0: 3.00, x1: 5.40, y0: 3.17, y1: 4.00},
    {x0: 5.40, x1: 6.00, y0: 2.33, y1: 4.00}
  ]);
});

it("treemap.size(size) coerces the specified size to numbers", () => {
  const t = treemap().size(["6", {valueOf: function() { return 4; }}]);
  assert.strictEqual(t.size()[0], 6);
  assert.strictEqual(t.size()[1], 4);
});

it("treemap.size(size) makes defensive copies", () => {
  const size = [6, 4];
  const t = treemap().size(size);
  const root = (size[1] = 100, t(hierarchy(simple).sum(defaultValue).sort(descendingValue)));
  const nodes = root.descendants().map(round);
  assert.deepStrictEqual(t.size(), [6, 4]);
  t.size()[1] = 100;
  assert.deepStrictEqual(t.size(), [6, 4]);
  assert.deepStrictEqual(nodes, [
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 4.00},
    {x0: 0.00, x1: 3.00, y0: 0.00, y1: 2.00},
    {x0: 0.00, x1: 3.00, y0: 2.00, y1: 4.00},
    {x0: 3.00, x1: 4.71, y0: 0.00, y1: 2.33},
    {x0: 4.71, x1: 6.00, y0: 0.00, y1: 2.33},
    {x0: 3.00, x1: 5.40, y0: 2.33, y1: 3.17},
    {x0: 3.00, x1: 5.40, y0: 3.17, y1: 4.00},
    {x0: 5.40, x1: 6.00, y0: 2.33, y1: 4.00}
  ]);
});

it("treemap.tile(tile) observes the specified tile function", () => {
  const t = treemap().size([6, 4]).tile(treemapSlice);
  const root = t(hierarchy(simple).sum(defaultValue).sort(descendingValue));
  const nodes = root.descendants().map(round);
  assert.strictEqual(t.tile(), treemapSlice);
  assert.deepStrictEqual(nodes, [
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 4.00},
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 1.00},
    {x0: 0.00, x1: 6.00, y0: 1.00, y1: 2.00},
    {x0: 0.00, x1: 6.00, y0: 2.00, y1: 2.67},
    {x0: 0.00, x1: 6.00, y0: 2.67, y1: 3.17},
    {x0: 0.00, x1: 6.00, y0: 3.17, y1: 3.50},
    {x0: 0.00, x1: 6.00, y0: 3.50, y1: 3.83},
    {x0: 0.00, x1: 6.00, y0: 3.83, y1: 4.00}
  ]);
});

it("treemap(data) observes the specified values", () => {
  const foo = d => d.foo;
  const t = treemap().size([6, 4]);
  const root = t(hierarchy(JSON.parse(readFileSync("./test/data/simple3.json"))).sum(foo).sort(descendingValue));
  const nodes = root.descendants().map(round);
  assert.deepStrictEqual(t.size(), [6, 4]);
  assert.deepStrictEqual(nodes, [
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 4.00},
    {x0: 0.00, x1: 3.00, y0: 0.00, y1: 2.00},
    {x0: 0.00, x1: 3.00, y0: 2.00, y1: 4.00},
    {x0: 3.00, x1: 4.71, y0: 0.00, y1: 2.33},
    {x0: 4.71, x1: 6.00, y0: 0.00, y1: 2.33},
    {x0: 3.00, x1: 5.40, y0: 2.33, y1: 3.17},
    {x0: 3.00, x1: 5.40, y0: 3.17, y1: 4.00},
    {x0: 5.40, x1: 6.00, y0: 2.33, y1: 4.00}
  ]);
});

it("treemap(data) observes the specified sibling order", () => {
  const t = treemap();
  const root = t(hierarchy(simple).sum(defaultValue).sort(ascendingValue));
  assert.deepStrictEqual(root.descendants().map(d => d.value), [24, 1, 2, 2, 3, 4, 6, 6]);
});

function defaultValue(d) {
  return d.value;
}

function ascendingValue(a, b) {
  return a.value - b.value;
}

function descendingValue(a, b) {
  return b.value - a.value;
}
