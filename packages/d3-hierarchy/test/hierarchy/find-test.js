import assert from "assert";
import {hierarchy} from "../../src/index.js";

it("node.find() finds nodes", () => {
  const root = hierarchy({id: "root", children: [{id: "a"}, {id: "b", children: [{id: "ba"}]}]}).count();
  assert.strictEqual(root.find((d) => d.data.id == "b").data.id, "b");
  assert.strictEqual(root.find((d, i) => i == 0).data.id, "root");
  assert.strictEqual(root.find((d, i, e) => d !== e).data.id, "a");
});
