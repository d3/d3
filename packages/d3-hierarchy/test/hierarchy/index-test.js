import assert from "assert";
import {hierarchy} from "../../src/index.js";

it("d3.hierarchy(data, children) supports iterable children", () => {
  const root = hierarchy({id: "root", children: new Set([{id: "a"}, {id: "b", children: new Set([{id: "ba"}])}])});
  const a = root.children[0];
  const b = root.children[1];
  const ba = root.children[1].children[0];
  assert.deepStrictEqual(root.links(), [
    {source: root, target: a},
    {source: root, target: b},
    {source: b, target: ba}
  ]);
});

it("d3.hierarchy(data, children) ignores non-iterable children", () => {
  const root = hierarchy({id: "root", children: [{id: "a", children: null}, {id: "b", children: 42}]});
  const a = root.children[0];
  const b = root.children[1];
  assert.deepStrictEqual(root.links(), [
    {source: root, target: a},
    {source: root, target: b}
  ]);
});
