import assert from "assert";
import {hierarchy} from "../../src/index.js";

it("node.links() returns an array of {source, target}", () => {
  const root = hierarchy({id: "root", children: [{id: "a"}, {id: "b", children: [{id: "ba"}]}]});
  const a = root.children[0];
  const b = root.children[1];
  const ba = root.children[1].children[0];
  assert.deepStrictEqual(root.links(), [
    {source: root, target: a},
    {source: root, target: b},
    {source: b, target: ba}
  ]);
});
