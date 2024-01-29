import assert from "assert";
import {hierarchy} from "../../src/index.js";

const tree = {id: "root", children: [{id: "a", children: [{id: "ab"}]}, {id: "b", children: [{id: "ba"}]}]};

it("node.each() traverses a hierarchy in breadth-first order", () => {
  const root = hierarchy(tree);
  const a = [];
  root.each(d => void a.push(d.data.id));
  assert.deepStrictEqual(a, ["root", "a", "b", "ab", "ba"]);
});

it("node.eachBefore() traverses a hierarchy in pre-order traversal", () => {
  const root = hierarchy(tree);
  const a = [];
  root.eachBefore(d => void a.push(d.data.id));
  assert.deepStrictEqual(a, ["root", "a", "ab", "b", "ba"]);
});

it("node.eachAfter() traverses a hierarchy in post-order traversal", () => {
  const root = hierarchy(tree);
  const a = [];
  root.eachAfter(d => void a.push(d.data.id));
  assert.deepStrictEqual(a, ["ab", "a", "ba", "b", "root"]);
});

it("a hierarchy is an iterable equivalent to *node*.each()", () => {
  const root = hierarchy(tree);
  const a = Array.from(root, d => d.data.id);
  assert.deepStrictEqual(a, ["root", "a", "b", "ab", "ba"]);
});
