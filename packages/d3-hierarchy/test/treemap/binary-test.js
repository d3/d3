import assert from "assert";
import {hierarchy, treemap, treemapBinary} from "../../src/index.js";
import {round} from "./round.js";

it("treemapBinary(parent, x0, y0, x1, y1) generates a binary treemap layout", () => {
  const tile = treemapBinary;
  const root = {
    value: 24,
    children: [
      {value: 6},
      {value: 6},
      {value: 4},
      {value: 3},
      {value: 2},
      {value: 2},
      {value: 1}
    ]
  };
  tile(root, 0, 0, 6, 4);
  assert.deepStrictEqual(root.children.map(round), [
    {x0: 0.00, x1: 3.00, y0: 0.00, y1: 2.00},
    {x0: 0.00, x1: 3.00, y0: 2.00, y1: 4.00},
    {x0: 3.00, x1: 4.71, y0: 0.00, y1: 2.33},
    {x0: 4.71, x1: 6.00, y0: 0.00, y1: 2.33},
    {x0: 3.00, x1: 4.20, y0: 2.33, y1: 4.00},
    {x0: 4.20, x1: 5.40, y0: 2.33, y1: 4.00},
    {x0: 5.40, x1: 6.00, y0: 2.33, y1: 4.00}
  ]);
});

it("treemapBinary does not break on 0-sized inputs", () => {
  const data = {children: [{value: 0}, {value: 0}, {value: 1}]};
  const root = hierarchy(data).sum(d => d.value);
  const treemapper = treemap().tile(treemapBinary);
  treemapper(root);
  const a = root.leaves().map(d => [d.x0, d.x1, d.y0, d.y1]);
  assert.deepStrictEqual(a, [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 1]]);
});
