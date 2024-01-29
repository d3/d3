import assert from "assert";
import {selection} from "d3-selection";
import {transition} from "../../src/index.js";

it("transition.empty is the same as selection.empty", () => {
  assert.strictEqual(transition.prototype.empty, selection.prototype.empty);
});
