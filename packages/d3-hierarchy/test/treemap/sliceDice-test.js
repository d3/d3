import assert from "assert";
import {treemapSliceDice} from "../../src/index.js";
import {round} from "./round.js";

it("treemapSliceDice(parent, x0, y0, x1, y1) uses slice for odd depth", () => {
  const tile = treemapSliceDice;
  const root = {
    depth: 1,
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
    {x0: 0.00, x1: 6.00, y0: 0.00, y1: 1.00},
    {x0: 0.00, x1: 6.00, y0: 1.00, y1: 2.00},
    {x0: 0.00, x1: 6.00, y0: 2.00, y1: 2.67},
    {x0: 0.00, x1: 6.00, y0: 2.67, y1: 3.17},
    {x0: 0.00, x1: 6.00, y0: 3.17, y1: 3.50},
    {x0: 0.00, x1: 6.00, y0: 3.50, y1: 3.83},
    {x0: 0.00, x1: 6.00, y0: 3.83, y1: 4.00}
  ]);
});

it("treemapSliceDice(parent, x0, y0, x1, y1) uses dice for even depth", () => {
  const tile = treemapSliceDice;
  const root = {
    depth: 2,
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
  tile(root, 0, 0, 4, 6);
  assert.deepStrictEqual(root.children.map(round), [
    {x0: 0.00, x1: 1.00, y0: 0.00, y1: 6.00},
    {x0: 1.00, x1: 2.00, y0: 0.00, y1: 6.00},
    {x0: 2.00, x1: 2.67, y0: 0.00, y1: 6.00},
    {x0: 2.67, x1: 3.17, y0: 0.00, y1: 6.00},
    {x0: 3.17, x1: 3.50, y0: 0.00, y1: 6.00},
    {x0: 3.50, x1: 3.83, y0: 0.00, y1: 6.00},
    {x0: 3.83, x1: 4.00, y0: 0.00, y1: 6.00}
  ]);
});
