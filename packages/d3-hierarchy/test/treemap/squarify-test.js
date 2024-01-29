import assert from "assert";
import {treemapSquarify} from "../../src/index.js";
import {round} from "./round.js";

it("treemapSquarify(parent, x0, y0, x1, y1) generates a squarified layout", () => {
  const tile = treemapSquarify;
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
    {x0: 3.00, x1: 5.40, y0: 2.33, y1: 3.17},
    {x0: 3.00, x1: 5.40, y0: 3.17, y1: 4.00},
    {x0: 5.40, x1: 6.00, y0: 2.33, y1: 4.00}
  ]);
});

it("treemapSquarify(parent, x0, y0, x1, y1) does not produce a stable update", () => {
  const tile = treemapSquarify;
  const root = {value: 20, children: [{value: 10}, {value: 10}]};
  tile(root, 0, 0, 20, 10);
  assert.deepStrictEqual(root.children.map(round), [
    {x0:  0, x1: 10, y0:  0, y1: 10},
    {x0: 10, x1: 20, y0:  0, y1: 10}
  ]);
  tile(root, 0, 0, 10, 20);
  assert.deepStrictEqual(root.children.map(round), [
    {x0:  0, x1: 10, y0:  0, y1: 10},
    {x0:  0, x1: 10, y0: 10, y1: 20}
  ]);
});

it("treemapSquarify.ratio(ratio) observes the specified ratio", () => {
  const tile = treemapSquarify.ratio(1);
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

it("treemapSquarify(parent, x0, y0, x1, y1) handles a degenerate tall empty parent", () => {
  const tile = treemapSquarify;
  const root = {
    value: 0,
    children: [
      {value: 0},
      {value: 0}
    ]
  };
  tile(root, 0, 0, 0, 4);
  assert.deepStrictEqual(root.children.map(round), [
    {x0: 0.00, x1: 0.00, y0: 0.00, y1: 4.00},
    {x0: 0.00, x1: 0.00, y0: 0.00, y1: 4.00}
  ]);
});

it("treemapSquarify(parent, x0, y0, x1, y1) handles a degenerate wide empty parent", () => {
  const tile = treemapSquarify;
  const root = {
    value: 0,
    children: [
      {value: 0},
      {value: 0}
    ]
  };
  tile(root, 0, 0, 4, 0);
  assert.deepStrictEqual(root.children.map(round), [
    {x0: 0.00, x1: 4.00, y0: 0.00, y1: 0.00},
    {x0: 0.00, x1: 4.00, y0: 0.00, y1: 0.00}
  ]);
});

it("treemapSquarify(parent, x0, y0, x1, y1) handles a leading zero value", () => {
  const tile = treemapSquarify;
  const root = {
    value: 24,
    children: [
      {value: 0},
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
    {x0: 0.00, x1: 3.00, y0: 0.00, y1: 0.00},
    {x0: 0.00, x1: 3.00, y0: 0.00, y1: 2.00},
    {x0: 0.00, x1: 3.00, y0: 2.00, y1: 4.00},
    {x0: 3.00, x1: 4.71, y0: 0.00, y1: 2.33},
    {x0: 4.71, x1: 6.00, y0: 0.00, y1: 2.33},
    {x0: 3.00, x1: 5.40, y0: 2.33, y1: 3.17},
    {x0: 3.00, x1: 5.40, y0: 3.17, y1: 4.00},
    {x0: 5.40, x1: 6.00, y0: 2.33, y1: 4.00}
  ]);
});
