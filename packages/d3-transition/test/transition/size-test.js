import assert from "assert";
import {select, selectAll, selection} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.size is the same as selection.size", () => {
  assert.strictEqual(transition.prototype.size, selection.prototype.size);
});

it("transition.size() returns the expected value", () => {
  const root = document.documentElement;
  assert.strictEqual(select(root).transition().size(), 1);
  assert.strictEqual(selectAll([null, root]).transition().size(), 1);
});
